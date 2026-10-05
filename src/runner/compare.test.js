import { describe, expect, it } from 'vitest';
import { compareWithSolution } from './compare';

const solution = `function matches(name, query) {
  return name.toLowerCase().includes(query.toLowerCase());
}`;

describe('compareWithSolution', () => {
  it('räknar inte formatering, kommentarer och citattecken', () => {
    const code = `// Skriv din kod här
function matches(name, query) { return name.toLowerCase().includes(query.toLowerCase()) }`;
    expect(compareWithSolution(code, solution)).toBe('same');
    expect(compareWithSolution('const a = "x";', "const a = 'x'")).toBe('same');
  });

  it('säger till när lösningen är klart längre än facit', () => {
    const code = `const matches = (name,query) => {
const nameLow = name.toLowerCase()
const queryLow = query.toLowerCase()
if(nameLow.includes(queryLow)){
return true}
return false}`;
    expect(compareWithSolution(code, solution)).toBe('longer');
  });

  it('ser en lika kort lösning som ett annat sätt', () => {
    const code = `const matches = (name, query) =>
  name.toLowerCase().includes(query.toLowerCase());`;
    expect(compareWithSolution(code, solution)).toBe('different');
  });
});
