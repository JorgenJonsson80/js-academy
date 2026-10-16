import { describe, expect, it } from 'vitest';
import { isNoticeablyLonger } from './compare';

const solution = `function matches(name, query) {
  return name.toLowerCase().includes(query.toLowerCase());
}`;

describe('isNoticeablyLonger', () => {
  it('säger till när lösningen är klart längre än facit', () => {
    const code = `const matches = (name,query) => {
const nameLow = name.toLowerCase()
const queryLow = query.toLowerCase()
if(nameLow.includes(queryLow)){
return true}
return false}`;
    expect(isNoticeablyLonger(code, solution)).toBe(true);
  });

  it('bryr sig inte om formatering, kommentarer och citattecken', () => {
    const code = `// Skriv din kod här
function matches(name, query) { return name.toLowerCase().includes(query.toLowerCase()) }`;
    expect(isNoticeablyLonger(code, solution)).toBe(false);
  });

  it('räknar inte parenteser runt en ensam parameter', () => {
    expect(
      isNoticeablyLonger(
        'const names = users.map((user) => user.name);',
        'const names = users.map(user => user.name);',
      ),
    ).toBe(false);
  });

  it('räknar inte ett annat sätt att skriva samma sak', () => {
    const code = `const matches = (name, query) =>
  name.toLowerCase().includes(query.toLowerCase(),);`;
    expect(isNoticeablyLonger(code, solution)).toBe(false);
  });

  it('bryr sig inte om några få extra tecken i en kort lösning', () => {
    expect(
      isNoticeablyLonger('const total = 10 + 20;', 'const total = 30;'),
    ).toBe(false);
  });
});
