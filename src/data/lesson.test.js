import { describe, expect, it } from 'vitest';
import { evaluate } from '../runner/evaluate';
import { lessons } from './lesson';
import { tracks } from './tracks';

function check(lesson, code) {
  const { error, results } = evaluate(code, lesson.tests, lesson.sourceChecks, {
    fileName: lesson.fileName,
    files: lesson.files,
    preview: lesson.preview,
  });
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

  it.each(lessons.filter(lesson => lesson.preview))(
    '$id kan förhandsvisa sin lösning',
    lesson => {
      const { preview, previewError } = evaluate(
        lesson.solution,
        [],
        [],
        lesson,
      );
      expect(previewError).toBeUndefined();
      expect(preview).toBeTruthy();
    },
  );

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
  ['modules-01', 'const add = (a, b) => a + b;\nexport { add };'],
  [
    'modules-02',
    'const PI = 3.14;\nfunction double(n) { return n * 2; }\nexport { PI, double };',
  ],
  [
    'modules-03',
    'import {\n  multiply,\n  add,\n} from "./math";\nconst total = add(2, 3);\nconst product = multiply(4, 5);',
  ],
  [
    'modules-04',
    'const greet = name => `Hej ${name}!`;\nexport default greet;',
  ],
  [
    'modules-05',
    "import format from './formatPrice';\nconst price = format(99);",
  ],
  [
    'modules-boss-01',
    "import { MAX_TODOS } from './config.js';\n\nconst addTodo = (todos, text) =>\n  todos.length >= MAX_TODOS ? todos : [...todos, text];\n\nfunction countTodos(todos) {\n  return `${todos.length} av ${MAX_TODOS}`;\n}\n\nexport { countTodos };\nexport default addTodo;",
  ],
  ['jsx-01', 'const App = () => <h1>Hej React!</h1>;'],
  ['jsx-01', 'function App() {\n  return (\n    <h1>Hej React!</h1>\n  );\n}'],
  ['jsx-02', "const name = 'Ada';\nconst App = () => <p>{`Hej ${name}!`}</p>;"],
  [
    'jsx-04',
    "const logoUrl = '/favicon.svg';\nexport default function App() {\n  return <img className=\"logo\" alt='Logga' src={logoUrl}/>;\n}",
  ],
  [
    'jsx-05',
    "import { Fragment } from 'react';\nconst user = { name: 'Ada', age: 36 };\nfunction App() {\n  return <Fragment><h1>Profil</h1><p>{`${user.name}, ${user.age} år`}</p></Fragment>;\n}",
  ],
  [
    'jsx-boss-01',
    "const user = { name: 'Ada Lovelace', title: 'Programmerare', avatar: '/favicon.svg' };\nconst App = () => {\n  const { name, title, avatar } = user;\n  return (\n    <div className=\"card\">\n      <img alt={name} src={avatar} />\n      <h2>{name}</h2>\n      <p>{title.toUpperCase()}</p>\n    </div>\n  );\n};",
  ],
  [
    'props-01',
    'const Logo = () => <span>⚛️ Academy</span>;\nconst App = () => <header><Logo/></header>;',
  ],
  ['props-03', 'const Greeting = ({ name }) => <h1>Hej {name}!</h1>;'],
  [
    'props-04',
    'function Badge({ count, label }) {\n  return <span>{`${label}: ${count}`}</span>;\n}',
  ],
  [
    'props-05',
    "function Price({ amount, onSale }) {\n  if (typeof amount !== 'number') {\n    return <p>amount ska vara ett tal, inte text</p>;\n  }\n  return <p>{onSale ? 'REA ' : ''}{amount} kr</p>;\n}\nfunction App() {\n  return <Price onSale amount={99} />;\n}",
  ],
  [
    'props-06',
    'const Button = ({ variant = "primary", label }) => (\n  <button className={variant}>{label}</button>\n);',
  ],
  [
    'props-07',
    'function Card(props) {\n  return <section className="card"><h2>{props.title}</h2>{props.children}</section>;\n}',
  ],
  [
    'props-boss-01',
    "const Avatar = ({ name, src }) => <img alt={name} src={src} />;\nconst Card = ({ children }) => <div className=\"card\">{children}</div>;\nfunction ProfileCard({ user, isOnline = false }) {\n  const { name, avatar } = user;\n  return (\n    <Card>\n      <Avatar name={name} src={avatar} />\n      <h2>{name}</h2>\n      <p>{isOnline ? 'Online' : 'Offline'}</p>\n    </Card>\n  );\n}",
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
  [
    'modules-01',
    'function add(a, b) {\n  return a + b;\n}\nexport default add;',
  ],
  ['modules-02', 'const PI = 3.14;\nexport const double = n => n * 2;'],
  [
    'modules-03',
    'function add(a, b) { return a + b; }\nfunction multiply(a, b) { return a * b; }\nconst total = add(2, 3);\nconst product = multiply(4, 5);',
  ],
  [
    'modules-03',
    "import { add } from './math.js';\nimport { multiply } from './math.js';\nconst total = add(2, 3);\nconst product = multiply(4, 5);",
  ],
  ['modules-04', 'export function greet(name) {\n  return `Hej ${name}!`;\n}'],
  [
    'modules-05',
    "import { format } from './formatPrice.js';\nconst price = format(99);",
  ],
  [
    'modules-05',
    "import { formatPrice } from './formatPrice.js';\nconst format = formatPrice;\nconst price = format(99);",
  ],
  [
    'modules-06',
    "import { addTodo, MAX_TODOS } from './todos.js';\nconst todos = addTodo(['Handla'], 'Träna');\nconst isFull = todos.length >= MAX_TODOS;",
  ],
  [
    'modules-boss-01',
    "import { MAX_TODOS } from './config.js';\nexport default function addTodo(todos, text) {\n  if (todos.length >= MAX_TODOS) return todos;\n  todos.push(text);\n  return [...todos, text].slice(0, -1);\n}\nexport const countTodos = todos => `${todos.length} av ${MAX_TODOS}`;",
  ],
  [
    'modules-boss-01',
    "import { MAX_TODOS } from './config.js';\nexport function addTodo(todos, text) {\n  if (todos.length >= MAX_TODOS) return todos;\n  return [...todos, text];\n}\nexport const countTodos = todos => `${todos.length} av ${MAX_TODOS}`;",
  ],
  ['jsx-01', 'function app() {\n  return <h1>Hej React!</h1>;\n}'],
  ['jsx-01', "function App() {\n  return '<h1>Hej React!</h1>';\n}"],
  ['jsx-01', 'function App() {\n  <h1>Hej React!</h1>;\n}'],
  [
    'jsx-02',
    "const name = 'Ada';\nfunction App() {\n  return <p>Hej Ada!</p>;\n}",
  ],
  [
    'jsx-02',
    "const name = 'Ada';\nfunction App() {\n  return <p>Hej name!</p>;\n}",
  ],
  [
    'jsx-03',
    'const items = 3;\nconst price = 25;\nfunction App() {\n  return <p>Totalt: items * price kr</p>;\n}',
  ],
  [
    'jsx-04',
    'const logoUrl = \'/favicon.svg\';\nfunction App() {\n  return <img src="logoUrl" alt="Logga" className="logo" />;\n}',
  ],
  [
    'jsx-04',
    'const logoUrl = \'/favicon.svg\';\nfunction App() {\n  return <img src={logoUrl} alt="Logga" class="logo" />;\n}',
  ],
  [
    'jsx-05',
    "const user = { name: 'Ada', age: 36 };\nfunction App() {\n  return (\n    <div>\n      <h1>Profil</h1>\n      <p>{user.name}, {user.age} år</p>\n    </div>\n  );\n}",
  ],
  [
    'jsx-05',
    "const user = { name: 'Ada', age: 36 };\nfunction App() {\n  return (\n    <h1>Profil</h1>\n    <p>{user.name}, {user.age} år</p>\n  );\n}",
  ],
  [
    'jsx-boss-01',
    "const user = { name: 'Ada Lovelace', title: 'Programmerare', avatar: '/favicon.svg' };\nfunction App() {\n  return (\n    <div className=\"card\">\n      <img src={user.avatar} alt={user.name} />\n      <h2>Ada Lovelace</h2>\n      <p>{'PROGRAMMERARE'.toUpperCase()}</p>\n    </div>\n  );\n}",
  ],
  [
    'props-01',
    'function Logo() {\n  return <span>⚛️ Academy</span>;\n}\nfunction App() {\n  return <header><span>⚛️ Academy</span></header>;\n}',
  ],
  [
    'props-01',
    'function Logo() {\n  return <span>⚛️ Academy</span>;\n}\nfunction App() {\n  return <header><logo /></header>;\n}',
  ],
  [
    'props-02',
    'function Greeting(props) {\n  return <h1>Hej {props.name}!</h1>;\n}\nfunction App() {\n  return <Greeting props="Ada" />;\n}',
  ],
  [
    'props-02',
    'function Greeting(props) {\n  return <h1>Hej {props.name}!</h1>;\n}\nfunction App() {\n  return <Greeting name={name} />;\n}',
  ],
  ['props-03', 'function Greeting(props) {\n  return <h1>Hej Ada!</h1>;\n}'],
  ['props-03', 'function Greeting(name) {\n  return <h1>Hej {name}!</h1>;\n}'],
  [
    'props-04',
    'function Badge(props) {\n  return <span>{props.label}: {props.count}</span>;\n}',
  ],
  [
    'props-05',
    "function Price({ amount, onSale }) {\n  if (typeof amount !== 'number') {\n    return <p>amount ska vara ett tal, inte text</p>;\n  }\n  return <p>{onSale ? 'REA ' : ''}{amount} kr</p>;\n}\nfunction App() {\n  return <Price amount=\"99\" onSale=\"true\" />;\n}",
  ],
  [
    'props-06',
    'function Button({ label, variant }) {\n  return <button className={variant}>{label}</button>;\n}',
  ],
  [
    'props-07',
    'function Card({ title }) {\n  return <section className="card"><h2>{title}</h2></section>;\n}',
  ],
  [
    'props-boss-01',
    'function Avatar({ src, name }) {\n  return <img src={src} alt={name} />;\n}\nfunction Card({ children }) {\n  return <div className="card">{children}</div>;\n}\nfunction ProfileCard({ user, isOnline = false }) {\n  return (\n    <div className="card">\n      <img src={user.avatar} alt={user.name} />\n      <h2>{user.name}</h2>\n      <p>{isOnline ? \'Online\' : \'Offline\'}</p>\n    </div>\n  );\n}',
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
