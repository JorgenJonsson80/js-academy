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
  [
    'map-01',
    'const numbers = [1, 2, 3];\nconst doubled = numbers.map((n) => {\n  return n * 2;\n});',
  ],
  [
    'filter-02',
    "const todos = [{ text: 'Handla', done: true }, { text: 'Träna', done: false }, { text: 'Plugga React', done: true }];\nconst doneTodos = todos.filter(todo => todo.done === true);",
  ],
  [
    'find-01',
    'const todos = [{ id: 1 }, { id: 2 }, { id: 3 }];\nconst todo = todos.find(({ id }) => id === 2);',
  ],
  [
    'reduce-01',
    'const numbers = [5, 10, 15];\nconst total = numbers.reduce((acc, n) => {\n  return acc + n;\n}, 0);',
  ],
  ['template-01', "const name = 'Ada';\nconst greeting = `Hej ${ name }!`;"],
  [
    'destructuring-01',
    "const user = { name: 'Ada', age: 36 };\nconst { age, name } = user;",
  ],
  ['destructuring-03', 'const greet = ({ name }) => `Hej ${name}!`;'],
  [
    'spread-02',
    "const user = { name: 'Ada', age: 36 };\nconst olderUser = {\n  ...user,\n  age: user.age + 1,\n};",
  ],
  [
    'rest-03',
    'const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);',
  ],
  [
    'ternary-01',
    "function getLabel(isLoggedIn) {\n  return isLoggedIn ? 'Logga ut' : 'Logga in';\n}",
  ],
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
  ['map-01', 'const numbers = [1, 2, 3];\nconst doubled = [2, 4, 6];'],
  [
    'map-01',
    'const numbers = [1, 2, 3];\nconst doubled = [];\nfor (const n of numbers) doubled.push(n * 2);\nnumbers.map(n => n);',
  ],
  [
    'map-01',
    'const numbers = [1, 2, 3];\nnumbers.forEach((n, i) => { numbers[i] = n * 2; });\nconst doubled = numbers.map(n => n);',
  ],
  [
    'map-02',
    "const users = [{ name: 'Ada' }];\nconst names = users.map(user => user);",
  ],
  [
    'filter-01',
    'const numbers = [5, 12, 8, 20, 3];\nconst bigNumbers = numbers.filter(number => number >= 8);',
  ],
  [
    'filter-02',
    "const todos = [{ text: 'Handla', done: true }, { text: 'Plugga React', done: true }];\nconst doneTodos = todos.filter(todo => todo.done);",
  ],
  [
    'find-01',
    "const todos = [{ id: 1 }, { id: 2, text: 'Träna', done: false }];\nconst todo = { id: 2, text: 'Träna', done: false };\ntodos.find(t => t);",
  ],
  ['reduce-01', 'const numbers = [5, 10, 15];\nconst total = 30;'],
  [
    'reduce-01',
    'const numbers = [5, 10, 15];\nconst total = numbers.reduce((sum, n) => sum + n);\nnumbers.push(0);',
  ],
  ['template-01', "const name = 'Ada';\nconst greeting = 'Hej ' + name + '!';"],
  ['template-01', "const name = 'Ada';\nconst greeting = `Hej Ada!`;"],
  [
    'destructuring-01',
    "const user = { name: 'Ada', age: 36 };\nconst name = user.name;\nconst age = user.age;",
  ],
  [
    'destructuring-02',
    'const scores = [90, 75, 60];\nconst first = scores[0];\nconst second = scores[1];',
  ],
  [
    'destructuring-03',
    'function greet(user) {\n  return `Hej ${user.name}!`;\n}',
  ],
  [
    'spread-01',
    "const todos = ['Handla', 'Träna'];\nconst newTodos = todos;\nnewTodos.push('Plugga React');",
  ],
  [
    'spread-01',
    "const todos = ['Handla', 'Träna'];\nconst newTodos = ['Handla', 'Träna', 'Plugga React'];",
  ],
  [
    'spread-02',
    "const user = { name: 'Ada', age: 36 };\nconst olderUser = user;\nolderUser.age = 37;",
  ],
  [
    'spread-02',
    "const user = { name: 'Ada', age: 36 };\nconst olderUser = { age: 37, ...user };",
  ],
  [
    'rest-01',
    'const numbers = [1, 2, 3, 4];\nconst first = numbers[0];\nconst others = numbers.slice(1);',
  ],
  [
    'rest-02',
    "const user = { id: 1, name: 'Ada', age: 36 };\nconst id = user.id;\ndelete user.id;\nconst details = user;",
  ],
  [
    'rest-03',
    'function sum(a, b, c) {\n  return [a, b, c].reduce((t, n) => t + (n ?? 0), 0);\n}',
  ],
  [
    'ternary-01',
    "const getLabel = isLoggedIn => {\n  if (isLoggedIn) return 'Logga ut';\n  return 'Logga in';\n};",
  ],
  ['and-01', 'const getBadge = count => (count > 0 ? `${count} nya` : false);'],
  ['and-01', 'const getBadge = count => count && `${count} nya`;'],
  [
    'modern-js-boss-01',
    "const user = { id: 1, name: 'Ada', age: 36 };\nconst todos = ['Handla', 'Träna'];\nconst { id, ...profile } = user;\nconst updatedProfile = { ...profile, age: 37 };\nconst allTodos = [...todos, 'Plugga React'];\nconst [firstTodo, ...otherTodos] = allTodos;\nconst message = 'Ada har 3 uppgifter';",
  ],
  [
    'modern-js-boss-01',
    "const user = { id: 1, name: 'Ada', age: 36 };\nconst todos = ['Handla', 'Träna'];\nconst { id, ...profile } = user;\nprofile.age = 37;\nconst updatedProfile = profile;\nconst allTodos = [...todos, 'Plugga React'];\nconst [firstTodo, ...otherTodos] = allTodos;\nconst message = `${updatedProfile.name} har ${allTodos.length} uppgifter`;",
  ],
];

describe('alternativa svar', () => {
  it.each(correctAnswers)('%s godkänner %j', (id, code) => {
    expect(check(findLesson(id), code)).toEqual({ passed: true, reason: '' });
  });

  it.each(wrongAnswers)('%s underkänner %j', (id, code) => {
    expect(check(findLesson(id), code).passed).toBe(false);
  });
});
