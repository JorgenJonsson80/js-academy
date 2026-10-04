// Stilkontroller som ger tips men inte underkänner koden.
import { parse } from '@babel/parser';

// Satser som brukar avslutas med ;. Funktioner, if och loopar med
// { } gör det inte.
const STATEMENTS = new Set([
  'ExpressionStatement',
  'VariableDeclaration',
  'ReturnStatement',
  'ThrowStatement',
  'BreakStatement',
  'ContinueStatement',
  'ImportDeclaration',
  'ExportAllDeclaration',
  'DoWhileStatement',
]);

function needsSemicolon(node, key) {
  // let i = 0 i for (let i = 0; …) och const x i for (const x of …)
  // avslutas av for-loopen.
  if (key === 'init' || key === 'left') return false;
  if (STATEMENTS.has(node.type)) return true;
  if (node.type === 'ExportNamedDeclaration') return !node.declaration;
  if (node.type === 'ExportDefaultDeclaration') {
    return !/Declaration$/.test(node.declaration.type);
  }
  return false;
}

// Returnerar raderna där en sats slutar utan ;, t.ex. [2, 4].
export function findMissingSemicolons(code) {
  const ast = parse(code, { sourceType: 'module', plugins: ['jsx'] });
  const lines = new Set();

  function visit(node, key) {
    if (!node || typeof node.type !== 'string') return;
    if (needsSemicolon(node, key) && code[node.end - 1] !== ';') {
      lines.add(node.loc.end.line);
    }
    for (const [childKey, value] of Object.entries(node)) {
      if (childKey === 'loc' || childKey.endsWith('Comments')) continue;
      if (Array.isArray(value)) value.forEach(child => visit(child, childKey));
      else if (value && typeof value === 'object') visit(value, childKey);
    }
  }

  visit(ast.program, null);
  return [...lines].sort((a, b) => a - b);
}

function listLines(lines) {
  if (lines.length === 1) return `Rad ${lines[0]}`;
  if (lines.length <= 4) {
    return `Rad ${lines.slice(0, -1).join(', ')} och ${lines.at(-1)}`;
  }
  return `${lines.length} rader`;
}

// Tips som visas efter rättningen, oavsett om svaret var rätt.
export function styleNotes(code) {
  const lines = findMissingSemicolons(code);
  if (lines.length === 0) return [];
  return [
    `${listLines(lines)} saknar ; i slutet. JavaScript lägger ofta till det själv, men det är god vana att avsluta varje sats med ;.`,
  ];
}
