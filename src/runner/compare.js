// Jämför elevens godkända kod med facit. Kommentarer, blanksteg,
// semikolon och citattecken räknas inte, så att samma lösning med
// annan formatering inte ser ut som en annan lösning.
function normalize(code) {
  return code
    .replace(/\/\*[^]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
    .replace(/["`]/g, "'")
    .replace(/[\s;]/g, '');
}

// 'same' – samma lösning som facit
// 'longer' – fungerar, men är klart längre än facit
// 'different' – fungerar, men är skriven på ett annat sätt
export function compareWithSolution(code, solution) {
  const mine = normalize(code);
  const theirs = normalize(solution);
  if (mine === theirs) return 'same';
  if (mine.length > theirs.length * 1.3) return 'longer';
  return 'different';
}
