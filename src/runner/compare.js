// Jämför elevens godkända kod med facit. Sådant som bara är stil räknas
// inte: kommentarer, blanksteg, semikolon, citattecken, parenteser runt
// en ensam parameter och kommatecken sist i en lista.
function normalize(code) {
  return code
    .replace(/\/\*[^]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
    .replace(/["`]/g, "'")
    .replace(/\(\s*([A-Za-z_$][\w$]*)\s*\)\s*=>/g, '$1=>')
    .replace(/,(\s*[)\]}])/g, '$1')
    .replace(/[\s;]/g, '');
}

// true när lösningen fungerar men är märkbart längre än facit, både
// räknat i andel och i antal tecken. Då är facit värt att visa.
export function isNoticeablyLonger(code, solution) {
  const mine = normalize(code).length;
  const theirs = normalize(solution).length;
  return mine > theirs * 1.3 && mine - theirs >= 15;
}
