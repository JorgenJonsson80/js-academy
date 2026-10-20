import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from '@codemirror/autocomplete';
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from '@codemirror/commands';
import {
  javascript,
  javascriptLanguage,
  scopeCompletionSource,
} from '@codemirror/lang-javascript';
import {
  bracketMatching,
  HighlightStyle,
  indentOnInput,
  syntaxHighlighting,
  syntaxTree,
} from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import {
  drawSelection,
  EditorView,
  highlightActiveLine,
  hoverTooltip,
  keymap,
  lineNumbers,
} from '@codemirror/view';
import { tags } from '@lezer/highlight';
import { useEffect, useRef, useState } from 'react';
import { describeAt, memberOptionsFor } from '../editor/codeInfo';

const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
const FORMAT_KEYS = isMac ? 'Cmd+Shift+F' : 'Ctrl+Shift+F';
const SUGGEST_KEYS = 'Ctrl+Mellanslag';

// Inbyggda objekt som får förslag, t.ex. console. → log, error, table …
const BUILTINS = {
  console,
  Math,
  JSON,
  Object,
  Array,
  Number,
  String,
  Promise,
  Date,
};

// Formatterar med Prettier, med samma inställningar som projektet.
// Prettier laddas först när det behövs, så sidan startar snabbt.
async function formatCode(view) {
  const [{ formatWithCursor }, babel, estree] = await Promise.all([
    import('prettier/standalone'),
    import('prettier/plugins/babel'),
    import('prettier/plugins/estree'),
  ]);
  const source = view.state.doc.toString();
  const result = await formatWithCursor(source, {
    cursorOffset: view.state.selection.main.head,
    parser: 'babel',
    plugins: [babel, estree],
    singleQuote: true,
    arrowParens: 'avoid',
  });
  if (result.formatted === source) return;
  view.dispatch({
    changes: { from: 0, to: view.state.doc.length, insert: result.formatted },
    selection: { anchor: Math.max(0, result.cursorOffset) },
  });
}

// Förslag efter en punkt: `user.` visar egenskaperna i objektet user.
function memberCompletion(context) {
  const word = context.matchBefore(/[\w$]*/);
  if (context.state.sliceDoc(word.from - 1, word.from) !== '.') return null;
  const tree = syntaxTree(context.state);
  const dot = tree.resolveInner(word.from - 1, 1);
  const receiver =
    dot.parent?.name === 'MemberExpression' ? dot.parent.firstChild : null;
  if (!receiver) return null;
  const options = memberOptionsFor(
    tree,
    context.state.doc.toString(),
    receiver,
  );
  return options && { from: word.from, options, validFor: /^[\w$]*$/ };
}

// Gör `kod` i förklaringen till riktiga <code>-element.
function renderInfo({ title, body }) {
  const dom = document.createElement('div');
  dom.className = 'cm-code-info';
  const heading = document.createElement('strong');
  heading.textContent = title;
  const text = document.createElement('p');
  body.split(/`([^`]+)`/).forEach((part, index) => {
    if (index % 2 === 0) text.append(part);
    else
      text.append(
        Object.assign(document.createElement('code'), { textContent: part }),
      );
  });
  dom.append(heading, text);
  return dom;
}

const codeHover = hoverTooltip((view, pos, side) => {
  const info = describeAt(
    syntaxTree(view.state),
    view.state.doc.toString(),
    pos,
    side,
  );
  if (!info) return null;
  return {
    pos: info.from,
    end: info.to,
    above: true,
    create: () => ({ dom: renderInfo(info) }),
  };
});

const highlightStyle = HighlightStyle.define([
  { tag: [tags.keyword, tags.operatorKeyword], color: '#c4b5fd' },
  { tag: [tags.string, tags.special(tags.string)], color: '#86efac' },
  { tag: [tags.number, tags.bool, tags.null], color: '#fdba74' },
  { tag: tags.comment, color: '#64748b', fontStyle: 'italic' },
  {
    tag: [tags.function(tags.variableName), tags.function(tags.propertyName)],
    color: '#7dd3fc',
  },
  { tag: tags.definition(tags.variableName), color: '#fde68a' },
  { tag: tags.propertyName, color: '#f9a8d4' },
  { tag: [tags.typeName, tags.tagName], color: '#5eead4' },
  { tag: tags.attributeName, color: '#fdba74' },
]);

const editorTheme = EditorView.theme(
  {
    '&': {
      margin: '8px 0 12px',
      border: '1px solid var(--border-strong)',
      borderRadius: '10px',
      background: 'var(--surface-sunken)',
      color: 'var(--text)',
      fontSize: '15px',
    },
    '&.cm-focused': {
      outline: '2px solid var(--accent)',
      outlineOffset: '2px',
    },
    '.cm-scroller': {
      minHeight: '220px',
      maxHeight: '560px',
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontVariantLigatures: 'none',
      lineHeight: '1.6',
    },
    '.cm-content': { padding: '16px 0', caretColor: 'var(--accent)' },
    '.cm-gutters': {
      background: 'transparent',
      border: 'none',
      color: 'var(--border-strong)',
      borderRadius: '10px 0 0 10px',
    },
    '.cm-activeLine': { background: 'rgba(148, 163, 184, 0.06)' },
    '.cm-cursor': { borderLeftColor: 'var(--accent)' },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
      background: 'var(--accent-soft) !important',
    },
    '.cm-matchingBracket': { background: 'rgba(167, 139, 250, 0.25)' },
    '.cm-tooltip': {
      border: '1px solid var(--border-strong)',
      borderRadius: '8px',
      background: 'var(--surface)',
      color: 'var(--text)',
      fontFamily: "'Nunito', system-ui, sans-serif",
    },
    '.cm-code-info': {
      maxWidth: '340px',
      padding: '8px 12px',
      fontSize: '14px',
    },
    '.cm-code-info strong': {
      fontFamily: "'JetBrains Mono', monospace",
      color: 'var(--accent)',
    },
    '.cm-code-info p': { margin: '4px 0 0' },
    '.cm-code-info code': {
      padding: '1px 4px',
      borderRadius: '4px',
      background: 'var(--task-code-bg)',
      color: 'var(--task-code-text)',
    },
    '.cm-tooltip-autocomplete ul li[aria-selected]': {
      background: 'var(--accent-soft)',
      color: 'var(--text)',
    },
    '.cm-completionDetail': { color: 'var(--muted)', fontStyle: 'normal' },
  },
  { dark: true },
);

export default function CodeEditor({ code, onCodeChange, fileName }) {
  const hostRef = useRef(null);
  const viewRef = useRef(null);
  const onCodeChangeRef = useRef(onCodeChange);
  const [formatError, setFormatError] = useState(false);

  useEffect(() => {
    onCodeChangeRef.current = onCodeChange;
  });

  useEffect(() => {
    const runFormat = view => {
      formatCode(view).then(
        () => setFormatError(false),
        () => setFormatError(true),
      );
      return true;
    };

    const view = new EditorView({
      parent: hostRef.current,
      state: EditorState.create({
        doc: code,
        extensions: [
          lineNumbers(),
          EditorView.lineWrapping,
          history(),
          drawSelection(),
          highlightActiveLine(),
          indentOnInput(),
          bracketMatching(),
          closeBrackets(),
          EditorState.tabSize.of(2),
          javascript({ jsx: true }),
          javascriptLanguage.data.of({ autocomplete: memberCompletion }),
          javascriptLanguage.data.of({
            autocomplete: scopeCompletionSource(BUILTINS),
          }),
          autocompletion(),
          codeHover,
          syntaxHighlighting(highlightStyle),
          editorTheme,
          EditorView.contentAttributes.of({ 'aria-labelledby': 'code-label' }),
          // Cmd/Ctrl+Shift+F, eller Shift+Alt+F som i VS Code. ⌥⇧F ger ett
          // specialtecken på Mac, så vi tittar på den fysiska tangenten
          // (event.code) i stället för vilket tecken som skrivs.
          EditorView.domEventHandlers({
            keydown(event, view) {
              const modifier = event.metaKey || event.ctrlKey || event.altKey;
              if (event.code !== 'KeyF' || !event.shiftKey || !modifier) {
                return false;
              }
              event.preventDefault();
              return runFormat(view);
            },
          }),
          keymap.of([
            { key: 'Mod-s', run: runFormat, preventDefault: true },
            ...closeBracketsKeymap,
            ...completionKeymap,
            ...historyKeymap,
            ...defaultKeymap,
            indentWithTab,
          ]),
          EditorView.updateListener.of(update => {
            if (update.docChanged) {
              onCodeChangeRef.current(update.state.doc.toString());
              setFormatError(false);
            }
          }),
        ],
      }),
    });
    viewRef.current = view;
    return () => view.destroy();
    // Editorn skapas en gång; ny kod utifrån hanteras i effekten nedan.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // När koden ändras utifrån (ny lektion, återställ) byts innehållet ut.
  useEffect(() => {
    const view = viewRef.current;
    if (view && code !== view.state.doc.toString()) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: code },
      });
    }
  }, [code]);

  return (
    <>
      <label id="code-label" onClick={() => viewRef.current?.focus()}>
        Din kod{fileName && ` (${fileName})`}
      </label>
      <div ref={hostRef} />
      <p className="editor-tips muted">
        {formatError ? (
          <span className="editor-tips-error">
            Kunde inte formatera – det finns ett syntaxfel någonstans.
          </span>
        ) : (
          <>
            <kbd>{FORMAT_KEYS}</kbd> formaterar · förslag dyker upp när du
            skriver (eller <kbd>{SUGGEST_KEYS}</kbd>) · håll musen över ett namn
            för att se vad det tillhör
          </>
        )}
      </p>
    </>
  );
}
