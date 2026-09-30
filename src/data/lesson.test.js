import { describe, expect, it } from 'vitest';
import { evaluate } from '../runner/evaluate';
import { lessons } from './lesson';
import { tracks } from './tracks';

function check(lesson, code) {
  const { error, results } = evaluate(code, lesson.tests, lesson.sourceChecks);
  const failed = results.filter(result => !result.passed);
  return {
    passed: !error && failed.length === 0,
    reason: error ?? failed.map(result => result.description).join(', '),
  };
}

function findLesson(id) {
  const lesson = lessons.find(item => item.id === id);
  if (!lesson) throw new Error(`Hittar ingen lektion med id ${id}`);
  return lesson;
}

describe('lektionsdata', () => {
  it('har unika id:n', () => {
    const ids = lessons.map(lesson => lesson.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(lessons)('$id tillhör en bana som finns', lesson => {
    expect(tracks.map(track => track.id)).toContain(lesson.track);
  });

  it.each(lessons)('$id har tester', lesson => {
    expect(lesson.tests.length).toBeGreaterThan(0);
  });

  it.each(lessons.filter(lesson => !lesson.isBoss))(
    '$id har tre ledtrådar',
    lesson => {
      expect(lesson.hints).toHaveLength(3);
    },
  );
});

describe('rättning av lektionerna', () => {
  it.each(lessons)('$id godkänner sin egen lösning', lesson => {
    expect(check(lesson, lesson.solution)).toEqual({
      passed: true,
      reason: '',
    });
  });

  it.each(lessons)('$id underkänner startkoden', lesson => {
    expect(check(lesson, lesson.starterCode).passed).toBe(false);
  });
});

// Andra sätt att lösa uppgifterna som ska godkännas.
const correctAnswers = [
  ['js-const-01', "const language = 'JavaScript' // kommentar"],
  ['js-let-01', 'let score = 0\nscore = 10'],
  ['js-let-02', 'let score = 10;\nscore += 5;'],
  [
    'js-if-02',
    'let points = 4;\nif (points >= 5) points = points + 10;\nelse points = points + 2;',
  ],
  [
    'js-loop-02',
    'let total = 0;\nfor (let i = 1; i <= 4; i += 1) { total += i }',
  ],
  ['arrays-01', 'const numbers = [1,2,3]'],
  ['arrays-04', "const fruits = ['äpple', 'banan']\nfruits.push(\"päron\")"],
  ['objects-01', 'const user = {\n  age: 36,\n  name: "Ada",\n};'],
  [
    'objects-03',
    "const users = [{ name: 'Ada' }, { name: 'Linus' }];\nconst secondName = users[1].name",
  ],
  [
    'functions-03',
    'const multiply = (x, y) => x * y\nconst result = multiply(3, 4)',
  ],
  [
    'functions-04',
    'function getDiscount(price) {\n  if (price >= 100) return 20;\n  return 0;\n}',
  ],
  ['functions-05', 'const multiply = (x, y) => x * y'],
];

// Vanliga fel och genvägar som ska underkännas.
const wrongAnswers = [
  ['js-const-01', 'let language = "JavaScript";'],
  ['js-let-01', 'let score = 10;'],
  ['js-let-02', 'let score = 15;'],
  ['js-loop-02', 'let total = 10;'],
  ['js-boolean-02', 'const isAdult = true;'],
  ['arrays-01', 'const numbers = [3, 2, 1];'],
  [
    'arrays-boss-01',
    'const numbers = [10, 20, 30];\nconst count = 3;\nconst first = numbers[0];',
  ],
  [
    'arrays-04',
    "const fruits = ['äpple', 'banan', 'päron'];\nfruits.push('päron');",
  ],
  ['arrays-04', "const fruits = ['äpple', 'banan', 'päron'];"],
  ['objects-01', 'const user = ["Ada", 36];'],
  ['objects-01', 'const user = { name: "Ada", age: "36" };'],
  [
    'objects-02',
    "const user = { name: 'Ada', age: 36 };\nconst userName = 'Ada';",
  ],
  [
    'objects-03',
    "const users = [{ name: 'Ada' }, { name: 'Linus' }];\nconst secondName = users[0].name;",
  ],
  [
    'objects-boss-01',
    "const users = [{ name: 'Ada', age: 36 }, { name: 'Linus', age: 28 }];\nconst count = users.length;\nconst firstName = 'Ada';\nconst secondAge = users[1].age;",
  ],
  ['functions-01', 'const addBonus = p => p + 5;'],
  [
    'functions-02',
    'function addBonus(points) { return points + 5; }\nconst result = 15;',
  ],
  [
    'functions-03',
    'function multiply(a, b) { return 12; }\nconst result = multiply(3, 4);',
  ],
  [
    'functions-04',
    'function getDiscount(price) { if (price > 100) { return 20; } return 0; }',
  ],
  [
    'functions-04',
    'function getDiscount(price) { if (price >= 100) { return 20; } else { return 0; } }',
  ],
  ['functions-05', 'const multiply = (a, b) => { return a * b; };'],
];

describe('alternativa svar', () => {
  it.each(correctAnswers)('%s godkänner %j', (id, code) => {
    expect(check(findLesson(id), code)).toEqual({ passed: true, reason: '' });
  });

  it.each(wrongAnswers)('%s underkänner %j', (id, code) => {
    expect(check(findLesson(id), code).passed).toBe(false);
  });
});
