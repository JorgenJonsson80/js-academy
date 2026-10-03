// Rättar elevens kod. Ren logik utan koppling till workern,
// så att den kan testas direkt med Vitest.
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { checkSyntax, transformJsx } from './jsx';
import { createModuleSystem } from './modules';

// Det som all kod i övningarna når. Testerna kan rendera en
// komponent till HTML med __render(<Greeting />).
const runtime = {
  packages: { react: { ...React, default: React } },
  globals: { __React: React, __render: renderToStaticMarkup },
};

function format(value) {
  if (typeof value === 'function') return 'en funktion';
  if (value === undefined) return 'undefined';
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function isEqual(actual, expected) {
  // === räknar 0 och -0 som lika, men NaN måste hanteras separat.
  if (actual === expected) return true;
  if (Number.isNaN(actual) && Number.isNaN(expected)) return true;
  if (
    typeof actual !== 'object' ||
    typeof expected !== 'object' ||
    actual === null ||
    expected === null
  ) {
    return false;
  }
  return JSON.stringify(actual) === JSON.stringify(expected);
}

function runTest(code, test, { fileName = 'main.js', files = {} }) {
  try {
    // Elevens kod och testuttrycket körs i samma scope,
    // så testet kan läsa variabler och anropa funktioner eleven skapat.
    // Testet når de andra filerna med __require('./app.js').
    const modules = createModuleSystem({ ...files, [fileName]: code }, runtime);
    const actual = modules.runFile(
      fileName,
      code,
      `return ${transformJsx(`(${test.code})`)};`,
    );

    return {
      description: test.description,
      passed: isEqual(actual, test.expected),
      actual: format(actual),
      expected: format(test.expected),
    };
  } catch (error) {
    return {
      description: test.description,
      passed: false,
      actual: `${error.name}: ${error.message}`,
      expected: format(test.expected),
    };
  }
}

// Kontrollerar hur koden är skriven, t.ex. att den använder en for-loop.
// Används bara där det inte går att se på resultatet när koden körs.
function runSourceCheck(code, check) {
  const found = check.pattern.test(code);
  return {
    description: check.description,
    passed: check.forbidden ? !found : found,
  };
}

// modules: { fileName, files } för övningar med import och export.
export function evaluate(code, tests, sourceChecks = [], modules = {}) {
  try {
    checkSyntax(code);
  } catch (error) {
    return {
      error: `Koden går inte att tolka. Kontrollera stavningen och att alla ( ) och { } är parade.\n${error.name}: ${error.message}`,
      results: [],
    };
  }

  return {
    error: null,
    results: [
      ...tests.map(test => runTest(code, test, modules)),
      ...sourceChecks.map(check => runSourceCheck(code, check)),
    ],
  };
}
