import { describe, expect, it } from 'vitest';
import { evaluate } from './evaluate';

function passes(code, tests, sourceChecks) {
  const { error, results } = evaluate(code, tests, sourceChecks);
  return !error && results.every(result => result.passed);
}

describe('evaluate', () => {
  it('läser variabler som eleven skapat', () => {
    const tests = [{ description: 'x är 5', code: 'x', expected: 5 }];
    expect(passes('const x = 5;', tests)).toBe(true);
    expect(passes('const x = 6;', tests)).toBe(false);
  });

  it('räknar 0 och -0 som lika', () => {
    const tests = [{ description: 'noll', code: '-3 * 0', expected: 0 }];
    expect(passes('', tests)).toBe(true);
  });

  it('räknar NaN som lika med NaN', () => {
    const tests = [{ description: 'NaN', code: 'x', expected: NaN }];
    expect(passes('const x = 0 / 0;', tests)).toBe(true);
  });

  it('jämför arrayer utifrån innehåll', () => {
    const tests = [{ description: 'lista', code: 'x', expected: [1, 2] }];
    expect(passes('const x = [1, 2];', tests)).toBe(true);
    expect(passes('const x = [2, 1];', tests)).toBe(false);
  });

  it('visar vad koden gav när ett test misslyckas', () => {
    const tests = [{ description: 'x är 5', code: 'x', expected: 5 }];
    const { results } = evaluate('const x = "5";', tests);
    expect(results[0]).toMatchObject({ actual: '"5"', expected: '5' });
  });

  it('rapporterar syntaxfel en gång i stället för per test', () => {
    const tests = [{ description: 'x är 5', code: 'x', expected: 5 }];
    const { error, results } = evaluate('const x = ;', tests);
    expect(error).toContain('SyntaxError');
    expect(results).toEqual([]);
  });

  it('rapporterar fel som uppstår när koden körs', () => {
    const tests = [{ description: 'y är 5', code: 'y', expected: 5 }];
    const { results } = evaluate('const x = 5;', tests);
    expect(results[0].actual).toContain('ReferenceError');
  });

  it('kräver att pattern finns i koden', () => {
    const checks = [{ description: 'for-loop', pattern: /\bfor\s*\(/ }];
    expect(passes('for (;;) break;', [], checks)).toBe(true);
    expect(passes('const x = 1;', [], checks)).toBe(false);
  });

  it('kräver att ett förbjudet pattern saknas', () => {
    const checks = [
      { description: 'ingen else', pattern: /\belse\b/, forbidden: true },
    ];
    expect(passes('if (true) {}', [], checks)).toBe(true);
    expect(passes('if (true) {} else {}', [], checks)).toBe(false);
  });
});
