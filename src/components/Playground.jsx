import { useEffect, useState } from 'react';
import { ideaStarterCode } from '../data/ideas';
import {
  loadPlaygroundCodes,
  PLAYGROUND_COPY as COPY,
  PLAYGROUND_FREE as FREE,
  PLAYGROUND_REACT as REACT,
  REACT_STARTER,
  savePlaygroundCodes,
} from '../lib/playgroundStorage';
import { previewTarget } from '../lib/previewTarget';
import { runTests } from '../runner/runTests';
import CodeEditor from './CodeEditor';
import ErrorHint from './ErrorHint';
import Preview from './Preview';
import StepPanel from './StepPanel';
import { useStepper } from '../lib/useStepper';

// Text inom `backticks` visas som kod, precis som i uppgifterna.
function WithCode({ text }) {
  return text.split(/`([^`]+)`/).map((part, index) =>
    index % 2 === 1 ? (
      <code key={index} className="task-code">
        {part}
      </code>
    ) : (
      part
    ),
  );
}

// En fri editor utan tester. Man kör koden och ser konsolen, och
// bestämmer själv när den är klar. Koden sparas per idé.
// ideas: alla idéer, med unlocked och trackTitle. ideaId kan också vara
// COPY för kod som kopierats från en övning, eller REACT för en egen
// komponent. Innehåller koden en komponent visas den i en förhandsvisning.
export default function Playground({ ideas, ideaId, onSelectIdea, onBack }) {
  const [codes, setCodes] = useState(loadPlaygroundCodes);
  const idea = ideas.find(item => item.id === ideaId && item.unlocked) ?? null;
  const hasCopy = codes[COPY] !== undefined;
  const key =
    idea?.id ??
    (ideaId === COPY && hasCopy ? COPY : ideaId === REACT ? REACT : FREE);
  const [run, setRun] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const code =
    codes[key] ?? (key === REACT ? REACT_STARTER : ideaStarterCode(idea));
  const preview = previewTarget(code);
  const stepper = useStepper(code);

  useEffect(() => {
    savePlaygroundCodes(codes);
  }, [codes]);

  function handleCodeChange(newCode) {
    setCodes(previous => ({ ...previous, [key]: newCode }));
  }

  function handleSelect(event) {
    setRun(null);
    onSelectIdea(event.target.value === FREE ? null : event.target.value);
  }

  async function handleRun() {
    setIsRunning(true);
    const result = await runTests(code, [], [], preview ? { preview } : {});
    setIsRunning(false);
    // Förhandsvisningen kör koden på riktigt, så bara om den klarade sig
    // i workern först. Annars kan en oändlig loop frysa sidan.
    const canPreview = preview && !result.error && !result.previewError;
    setRun({
      ...result,
      previewSource: canPreview ? { code, preview } : null,
    });
  }

  function handleReset() {
    setCodes(previous => {
      const rest = { ...previous };
      delete rest[key];
      return rest;
    });
    setRun(null);
  }

  const tracksWithIdeas = [...new Set(ideas.map(item => item.trackTitle))];

  return (
    <section
      className="lesson-panel playground"
      aria-labelledby="playground-title"
    >
      <button type="button" className="playground-back" onClick={onBack}>
        ← Tillbaka till övningarna
      </button>
      <h2 id="playground-title">🧪 Lekplatsen</h2>
      <p>
        Här finns inga tester och inget facit. Skriv vad du vill, tryck på{' '}
        <strong>Kör koden</strong> och se vad som händer i konsolen. Du
        bestämmer själv när det är klart.
      </p>

      <label className="playground-pick">
        Bygg
        <select value={key} onChange={handleSelect}>
          <option value={FREE}>Fritt – ingen idé</option>
          <option value={REACT}>⚛️ React-komponent</option>
          {hasCopy && <option value={COPY}>📋 Kopia från övningen</option>}
          {tracksWithIdeas.map(trackTitle => (
            <optgroup key={trackTitle} label={trackTitle}>
              {ideas
                .filter(item => item.trackTitle === trackTitle)
                .map(item => (
                  <option
                    key={item.id}
                    value={item.id}
                    disabled={!item.unlocked}
                  >
                    {item.emoji} {item.title}
                    {item.unlocked ? '' : ' 🔒'}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </label>
      <p className="muted playground-locked-note">
        🔒 Idéerna låses upp när du byggt alla tre projekt på banan.
      </p>

      {idea && (
        <aside className="idea-card">
          <h3>
            {idea.emoji} {idea.title}
          </h3>
          <p>{idea.summary}</p>
          <ol>
            {idea.goals.map(goal => (
              <li key={goal}>
                <WithCode text={goal} />
              </li>
            ))}
          </ol>
          <p>
            <strong>Extra:</strong> <WithCode text={idea.extra} />
          </p>
        </aside>
      )}

      <CodeEditor
        code={code}
        onCodeChange={handleCodeChange}
        activeLine={stepper.activeLine}
      />
      <div className="editor-actions">
        <button
          className="primary-button"
          type="button"
          onClick={handleRun}
          disabled={isRunning}
        >
          {isRunning ? 'Kör koden…' : '▶ Kör koden'}
        </button>
        {!preview && stepper.frames === null && (
          <button
            type="button"
            onClick={stepper.start}
            disabled={stepper.isRunning}
            title="Se koden köras en rad i taget, med variablernas värden"
          >
            {stepper.isRunning ? 'Kör…' : '👣 Kör rad för rad'}
          </button>
        )}
        <button type="button" onClick={handleReset}>
          Börja om
        </button>
      </div>
      {stepper.frames && <StepPanel stepper={stepper} />}

      <div aria-live="polite">
        {run?.error && <pre className="feedback-error">{run.error}</pre>}
        <ErrorHint message={run?.error ?? run?.output?.at(-1)} code={code} />
        {run &&
          !run.error &&
          (run.output?.length > 0 || !run.previewSource) && (
            <figure className="console-output">
              <figcaption>Konsol</figcaption>
              <pre>
                {run.output?.length > 0
                  ? run.output.join('\n')
                  : 'Inget skrevs ut. Använd console.log för att se vad koden gör.'}
              </pre>
            </figure>
          )}
        {run?.previewError && (
          <>
            <pre className="feedback-error">{run.previewError}</pre>
            <ErrorHint message={run.previewError} code={code} />
          </>
        )}
        {run?.previewSource && <Preview source={run.previewSource} />}
        {run?.notes?.map(note => (
          <p key={note} className="style-note">
            <span aria-hidden="true">💡</span> Tips: {note}
          </p>
        ))}
      </div>
    </section>
  );
}
