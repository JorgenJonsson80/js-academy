// Att tilldela en const igen kastar ett fel, det gör inte let.
function isConst(name) {
  return {
    description: `${name} är skapad med const`,
    code: `(() => { try { ${name} = ${name}; return false; } catch { return true; } })()`,
    expected: true,
  };
}

function isLet(name) {
  return {
    description: `${name} är skapad med let`,
    code: `(() => { try { ${name} = ${name}; return true; } catch { return false; } })()`,
    expected: true,
  };
}

export const lessons = [
  {
    id: 'js-const-01',
    title: 'Din första variabel',
    xp: 10,
    isBoss: false,
    track: 'js-basics',
    description:
      ' Med const skapar du en variabel som inte kan tilldelas ett nytt värde.',
    task: 'Uppgift: Skapa en variabel som heter language med värdet "JavaScript".',
    starterCode: '// Skriv din kod här',
    solution: 'const language = "JavaScript";',
    hints: [
      'Börja med nyckelordet const följt av variabelns namn.',
      'Använd likhetstecknet = för att tilldela variabeln ett värde.',
      'Textvärdet JavaScript behöver omges av enkla eller dubbla citattecken.',
    ],
    tests: [
      {
        description: 'language har värdet "JavaScript"',
        code: 'language',
        expected: 'JavaScript',
      },
      isConst('language'),
    ],
  },
  {
    id: 'js-const-02',
    title: 'Spara ett tal',
    xp: 10,
    track: 'js-basics',
    isBoss: false,
    description: 'Tal skrivs utan citattecken.',
    task: 'Uppgift: Skapa en konstant som heter age med värdet 25.',
    starterCode: '// Skriv din kod här',
    solution: 'const age = 25;',
    hints: [
      'Börja med nyckelordet const följt av variabelns namn.',
      'Använd likhetstecknet = för att tilldela variabeln ett värde.',
      'Ett tal i JavaScript skrivs utan citattecken',
    ],
    tests: [
      { description: 'age har värdet 25', code: 'age', expected: 25 },
      isConst('age'),
    ],
  },
  {
    id: 'js-let-01',
    title: 'Ändra ett värde',
    xp: 10,
    track: 'js-basics',
    isBoss: false,
    description:
      'Med let kan en variabel tilldelas ett nytt värde efter att den skapats.',
    task: 'Uppgift: Skapa score med let och startvärdet 0. Tilldela sedan score värdet 10.',
    starterCode: '// Skriv din kod här',
    solution: `let score = 0;
    score = 10;`,
    hints: [
      'Börja med nyckelordet let följt av variabelns namn.',
      'Ge score startvärdet 0 när du deklarerar variabeln.',
      'På nästa rad använder du score = ... utan att skriva let igen.',
    ],
    tests: [
      { description: 'score har värdet 10', code: 'score', expected: 10 },
      isLet('score'),
    ],
    sourceChecks: [
      {
        description: 'score skapas med startvärdet 0',
        pattern: /let\s+score\s*=\s*0\b/,
      },
    ],
  },
  {
    id: 'js-let-02',
    title: 'Öka ett värde',
    xp: 10,
    track: 'js-basics',
    isBoss: false,
    description:
      'Du kan använda variabelns nuvarande värde för att beräkna dess nästa värde.',
    task: 'Skapa score med let och värdet 10. Öka sedan värdet med 5 genom att skriva score = score + 5.',
    starterCode: '// Skriv din kod här',
    solution: `let score = 10;
    score = score + 5;`,
    hints: [
      'Börja med nyckelordet let följt av variabelns namn.',
      'Ge score startvärdet 10 när du deklarerar variabeln.',
      'På nästa rad använder du score = score + 5 utan att använda let igen',
    ],
    tests: [
      { description: 'score har värdet 15', code: 'score', expected: 15 },
      isLet('score'),
    ],
    sourceChecks: [
      {
        description: 'score skapas med startvärdet 10',
        pattern: /let\s+score\s*=\s*10\b/,
      },
      {
        description: 'score ökas med 5 utifrån sitt nuvarande värde',
        pattern: /score\s*=\s*score\s*\+\s*5|score\s*\+=\s*5/,
      },
    ],
  },
  {
    id: 'js-if-01',
    title: 'Öka bara om villkoret stämmer',
    xp: 10,
    track: 'js-basics',
    isBoss: false,
    description: 'En if-sats kör sitt kodblock bara när villkoret är sant.',
    task: 'Skapa score med let och värdet 10. Om score >= 10 ska du öka värdet med score = score + 5.',
    starterCode: '// Skriv din kod här',
    solution: `let score = 10;

if (score >= 10) {
  score = score + 5;
}`,
    hints: [
      'Börja med nyckelordet let följt av variabelns namn.',
      'Jämför score med värdet för att se om den uppfyller kravet',
      'Placera score = score + 5; inuti if-blockets klamrar.',
    ],
    tests: [
      { description: 'score har värdet 15', code: 'score', expected: 15 },
    ],
    sourceChecks: [
      {
        description: 'score skapas med startvärdet 10',
        pattern: /let\s+score\s*=\s*10\b/,
      },
      { description: 'Koden använder en if-sats', pattern: /\bif\s*\(/ },
    ],
  },
  {
    id: 'js-if-02',
    title: 'Välj mellan två vägar',
    xp: 10,
    track: 'js-basics',
    isBoss: false,
    description:
      'Ett if/else-statement väljer ett av två kodblock beroende på om villkoret är sant eller falskt.',
    task: 'Skapa points med let och värdet 4. Om points >= 5 ska du tilldela points värdet points + 10, annars points + 2. Använd if och else.',
    starterCode: '// Skriv din kod här',
    solution: `let points = 4;

if (points >= 5) {
  points = points + 10;
} else {
  points = points + 2;

}`,
    hints: [
      'Börja med nyckelordet let följt av variabelns namn.',
      'Skriv villkoret points >= 5 inom parenteser efter if.',
      'Placera points = points + 10; inuti if-blockets klamrar. points = points + 2 ska vara i else blocket',
    ],
    tests: [
      { description: 'points har värdet 6', code: 'points', expected: 6 },
    ],
    sourceChecks: [
      {
        description: 'points skapas med startvärdet 4',
        pattern: /let\s+points\s*=\s*4\b/,
      },
      { description: 'Koden använder en if-sats', pattern: /\bif\s*\(/ },
      { description: 'Koden använder else', pattern: /\belse\b/ },
    ],
  },
  {
    id: 'js-loop-01',
    title: 'Upprepa med en loop',
    xp: 10,
    track: 'js-basics',
    isBoss: false,
    description:
      'En for-loop upprepar ett kodblock så länge dess villkor är sant.',
    task: 'Skapa total med let och värdet 0. Använd en for-loop med let i = 0, villkoret i < 3 och ökningen i++. Lägg till 2 i total varje varv med total = total + 2.',
    starterCode: '// Skriv din kod här',
    solution: `let total = 0;

for (let i = 0; i < 3; i++) {
  total = total + 2;
}`,
    hints: [
      'Börja med nyckelordet let följt av variabelns namn.',
      'Skriv loopens tre delar(let i = 0;i < 3; i++)',
      'Glöm inte att uppdatera total vid varje varv total = total +2',
    ],
    tests: [{ description: 'total har värdet 6', code: 'total', expected: 6 }],
    sourceChecks: [
      { description: 'Koden använder en for-loop', pattern: /\bfor\s*\(/ },
    ],
  },
  {
    id: 'js-loop-02',
    title: 'Summera med en loop',
    xp: 10,
    track: 'js-basics',
    isBoss: false,
    description:
      'En variabel utanför loopen behåller sitt värde mellan varven. Därför kan den samla en summa.',
    task: 'Skapa total med let och värdet 0. Använd en for-loop med let i = 1, villkoret i <= 4 och ökningen i++. Lägg till i i total varje varv med total = total + i.',
    starterCode: '// Skriv din kod här',
    solution: `let total = 0;

for (let i = 1; i <= 4; i++) {
  total = total + i;
}`,
    hints: [
      'Börja med nyckelordet let följt av variabelns namn.',
      'Skriv loopens tre delar(let i = 1;i <= 4; i++)',
      'Glöm inte att uppdatera total vid varje varv total = total + i',
    ],
    tests: [
      { description: 'total har värdet 10', code: 'total', expected: 10 },
    ],
    sourceChecks: [
      { description: 'Koden använder en for-loop', pattern: /\bfor\s*\(/ },
    ],
  },
  {
    id: 'js-boolean-01',
    title: 'Sant eller falskt',
    xp: 10,
    track: 'js-basics',
    isBoss: false,
    description:
      'En boolean har värdet true eller false och kan beskriva om något är på eller av.',
    task: 'Uppgift: Skapa konstanten isReady med det booleska värdet true.',
    starterCode: '// Skriv din kod här',
    solution: 'const isReady = true;',
    hints: [
      'Börja med nyckelordet const följt av variabelns namn.',
      'Använd likhetstecknet = för att tilldela variabeln ett värde.',
      'En boolean i JavaScript skrivs utan citattecken och antingen true eller false',
    ],
    tests: [
      {
        description: 'isReady har värdet true',
        code: 'isReady',
        expected: true,
      },
      isConst('isReady'),
    ],
  },
  {
    id: 'js-boolean-02',
    title: 'Jämför två tal',
    xp: 10,
    track: 'js-basics',
    isBoss: false,
    description:
      'Operatorn >= kontrollerar om vänstra värdet är större än eller lika med det högra. Resultatet är en boolean.',
    task: 'Uppgift: Skapa konstanten isAdult och tilldela den resultatet av jämförelsen 20 >= 18.',
    starterCode: '// Skriv din kod här',
    solution: 'const isAdult = 20 >= 18;',
    hints: [
      'Börja med nyckelordet const följt av variabelns namn.',
      'Använd likhetstecknet = för att tilldela variabeln ett värde.',
      'Jämför talen med >=',
    ],
    tests: [
      {
        description: 'isAdult har värdet true',
        code: 'isAdult',
        expected: true,
      },
      isConst('isAdult'),
    ],
    sourceChecks: [
      { description: 'Värdet räknas ut med 20 >= 18', pattern: /20\s*>=\s*18/ },
    ],
  },
  {
    id: 'arrays-01',
    xp: 10,
    title: 'Skapa en array',
    track: 'arrays',
    isBoss: false,
    description: 'En array samlar flera värden i en ordnad lista.',
    task: 'Uppgift: Skapa en konstant som heter numbers med arrayen [1, 2, 3].',
    starterCode: '// Skriv din kod här',
    solution: 'const numbers = [1, 2, 3];',
    hints: [
      'Börja med nyckelordet const följt av arrayens namn.',
      'Använd likhetstecknet = för att tilldela variabeln ett värde.',
      'En array i JS skrivs inuti []',
    ],
    tests: [
      {
        description: 'numbers är [1, 2, 3]',
        code: 'numbers',
        expected: [1, 2, 3],
      },
      isConst('numbers'),
    ],
  },
  {
    id: 'arrays-02',
    xp: 10,
    title: 'Räkna värden',
    track: 'arrays',
    isBoss: false,
    description: 'Egenskapen length anger hur många värden en array innehåller',
    task: 'Uppgift: Skapa konstanten count och tilldela den längden av [10, 20, 30] med .length.',
    starterCode: '// Skriv din kod här',
    solution: 'const count = [10, 20, 30].length;',
    hints: [
      'Börja med const och variabelnamnet count.',
      'Använd likhetstecknet = för att tilldela variabeln ett värde.',
      'Skriv .length direkt efter arrayens avslutande hakparentes.',
    ],
    tests: [{ description: 'count har värdet 3', code: 'count', expected: 3 }],
    sourceChecks: [
      { description: 'Längden hämtas med .length', pattern: /\.\s*length\b/ },
    ],
  },
  {
    id: 'arrays-03',
    xp: 10,
    title: 'Hämta första värdet',
    track: 'arrays',
    isBoss: false,
    description: 'Arrayens positioner kallas index. Första värdet har index 0.',
    task: 'Uppgift: Skapa konstanten first och hämta första värdet ur [10, 20, 30] med indexering.',
    starterCode: '// Skriv din kod här',
    solution: 'const first = [10, 20, 30][0];',
    hints: [
      'Börja med const och variabelnamnet first.',
      'Använd likhetstecknet = för att tilldela variabeln ett värde.',
      'Använd [] med valt index efter arrayen för att få fram rätt svar',
    ],
    tests: [
      { description: 'first har värdet 10', code: 'first', expected: 10 },
    ],
    sourceChecks: [
      { description: 'Värdet hämtas med index [0]', pattern: /\[\s*0\s*\]/ },
    ],
  },
  {
    id: 'arrays-04',
    xp: 10,
    title: 'Lägg till ett värde',
    track: 'arrays',
    isBoss: false,
    description:
      'Metoden push lägger till ett värde sist i en array. Det fungerar även med const, eftersom push ändrar innehållet och inte vilken array variabeln pekar på.',
    task: 'Uppgift: Lägg till "päron" sist i arrayen fruits med push.',
    starterCode: `const fruits = ['äpple', 'banan'];

`,
    solution: `const fruits = ['äpple', 'banan'];
fruits.push('päron');`,
    hints: [
      'Skriv arrayens namn följt av en punkt.',
      'Metoden heter push och anropas med parenteser.',
      'Skicka in texten "päron" som argument till push.',
    ],
    tests: [
      {
        description: 'fruits är ["äpple", "banan", "päron"]',
        code: 'fruits',
        expected: ['äpple', 'banan', 'päron'],
      },
      isConst('fruits'),
    ],
    sourceChecks: [
      {
        description: 'Värdet läggs till med fruits.push',
        pattern: /fruits\s*\.\s*push\s*\(/,
      },
    ],
  },
  {
    id: 'arrays-boss-01',
    xp: 30,
    title: 'Boss: Undersök en array',
    track: 'arrays',
    isBoss: true,
    description: 'Kombinera det du lärt dig om arrayer, längd och index.',
    task: `Uppgift: Skapa konstanten numbers med [10, 20, 30].
  Skapa count med numbers.length.
  Skapa first med numbers[0]
  Använd const i alla tre deklarationer.`,
    starterCode: '// Skriv din kod här',
    solution: `const numbers = [10, 20, 30];
  const count = numbers.length;
  const first = numbers[0];`,
    hints: [],
    tests: [
      {
        description: 'numbers är [10, 20, 30]',
        code: 'numbers',
        expected: [10, 20, 30],
      },
      { description: 'count har värdet 3', code: 'count', expected: 3 },
      { description: 'first har värdet 10', code: 'first', expected: 10 },
      isConst('numbers'),
      isConst('count'),
      isConst('first'),
    ],
    sourceChecks: [
      {
        description: 'count hämtas med numbers.length',
        pattern: /numbers\s*\.\s*length\b/,
      },
      {
        description: 'first hämtas med numbers[0]',
        pattern: /numbers\s*\[\s*0\s*\]/,
      },
    ],
  },
  {
    id: 'objects-01',
    xp: 10,
    title: 'Skapa ett objekt',
    track: 'arrays',
    isBoss: false,
    description:
      'Ett objekt samlar värden under namn, så kallade egenskaper. Det skrivs inuti { } med namn: värde, separerade med kommatecken.',
    task: 'Uppgift: Skapa konstanten user som ett objekt med egenskapen name som har värdet "Ada" och egenskapen age som har värdet 36.',
    starterCode: '// Skriv din kod här',
    solution: `const user = { name: 'Ada', age: 36 };`,
    hints: [
      'Börja med const user = följt av { }.',
      'Skriv varje egenskap som namn: värde.',
      'Separera name och age med ett kommatecken.',
    ],
    tests: [
      {
        description: 'user är ett objekt',
        code: 'typeof user === "object" && user !== null && !Array.isArray(user)',
        expected: true,
      },
      { description: 'user.name är "Ada"', code: 'user.name', expected: 'Ada' },
      { description: 'user.age är 36', code: 'user.age', expected: 36 },
      isConst('user'),
    ],
  },
  {
    id: 'objects-02',
    xp: 10,
    title: 'Läs en egenskap',
    track: 'arrays',
    isBoss: false,
    description:
      'Med punktnotation, objekt.egenskap, läser du värdet av en egenskap.',
    task: 'Uppgift: Skapa konstanten userName och hämta värdet av name ur user med punktnotation.',
    starterCode: `const user = { name: 'Ada', age: 36 };

`,
    solution: `const user = { name: 'Ada', age: 36 };
const userName = user.name;`,
    hints: [
      'Börja med const userName =.',
      'Skriv objektets namn user följt av en punkt.',
      'Avsluta med egenskapens namn, name.',
    ],
    tests: [
      {
        description: 'userName har värdet "Ada"',
        code: 'userName',
        expected: 'Ada',
      },
    ],
    sourceChecks: [
      {
        description: 'Värdet hämtas med user.name',
        pattern: /user\s*\.\s*name\b/,
      },
    ],
  },
  {
    id: 'objects-03',
    xp: 10,
    title: 'En array av objekt',
    track: 'arrays',
    isBoss: false,
    description:
      'I React får du ofta data som en array av objekt, till exempel en lista med användare. Kombinera index och punktnotation för att nå ett värde.',
    task: 'Uppgift: Skapa konstanten secondName och hämta name från andra användaren i users.',
    starterCode: `const users = [
  { name: 'Ada', age: 36 },
  { name: 'Linus', age: 28 },
];

`,
    solution: `const users = [
  { name: 'Ada', age: 36 },
  { name: 'Linus', age: 28 },
];
const secondName = users[1].name;`,
    hints: [
      'Börja med const secondName =.',
      'Andra värdet i en array har index 1.',
      'Skriv .name direkt efter users[1].',
    ],
    tests: [
      {
        description: 'secondName har värdet "Linus"',
        code: 'secondName',
        expected: 'Linus',
      },
    ],
    sourceChecks: [
      {
        description: 'Värdet hämtas med users[1].name',
        pattern: /users\s*\[\s*1\s*\]\s*\.\s*name\b/,
      },
    ],
  },
  {
    id: 'objects-boss-01',
    xp: 30,
    title: 'Boss: En lista med användare',
    track: 'arrays',
    isBoss: true,
    description: 'Kombinera arrayer, objekt, index och egenskaper.',
    task: `Uppgift: Skapa konstanten users med två objekt:
  { name: "Ada", age: 36 } och { name: "Linus", age: 28 }.
  Skapa count med users.length.
  Skapa firstName med name från första användaren.
  Skapa secondAge med age från andra användaren.
  Använd const i alla fyra deklarationer.`,
    starterCode: '// Skriv din kod här',
    solution: `const users = [
  { name: 'Ada', age: 36 },
  { name: 'Linus', age: 28 },
];
const count = users.length;
const firstName = users[0].name;
const secondAge = users[1].age;`,
    hints: [],
    tests: [
      {
        description: 'users har två objekt',
        code: 'users.length',
        expected: 2,
      },
      {
        description: 'Första användaren heter "Ada" och är 36',
        code: '[users[0].name, users[0].age]',
        expected: ['Ada', 36],
      },
      {
        description: 'Andra användaren heter "Linus" och är 28',
        code: '[users[1].name, users[1].age]',
        expected: ['Linus', 28],
      },
      { description: 'count har värdet 2', code: 'count', expected: 2 },
      {
        description: 'firstName har värdet "Ada"',
        code: 'firstName',
        expected: 'Ada',
      },
      {
        description: 'secondAge har värdet 28',
        code: 'secondAge',
        expected: 28,
      },
      isConst('users'),
      isConst('count'),
      isConst('firstName'),
      isConst('secondAge'),
    ],
    sourceChecks: [
      {
        description: 'count hämtas med users.length',
        pattern: /users\s*\.\s*length\b/,
      },
      {
        description: 'firstName hämtas med users[0].name',
        pattern: /users\s*\[\s*0\s*\]\s*\.\s*name\b/,
      },
      {
        description: 'secondAge hämtas med users[1].age',
        pattern: /users\s*\[\s*1\s*\]\s*\.\s*age\b/,
      },
    ],
  },
  {
    id: 'functions-01',
    title: 'Returnera en bonus',
    xp: 10,
    track: 'functions',
    isBoss: false,
    description:
      'En parameter tar emot ett värde. Med return skickar funktionen tillbaka ett resultat.',
    task: 'Skriv funktionen addBonus med parametern points. Använd function och returnera points + 5. Du ska bara definiera funktionen, inte anropa den.',
    starterCode: '// Skriv din kod här',
    solution: `function addBonus(points) {
    return points + 5;
    }`,
    hints: [
      'Börja med function följt av funktiones namn',
      'Glöm inte (points) efter namnet',
      'Använd return följt av points + 5',
    ],
    tests: [
      {
        description: 'addBonus(10) returnerar 15',
        code: 'addBonus(10)',
        expected: 15,
      },
      {
        description: 'addBonus(0) returnerar 5',
        code: 'addBonus(0)',
        expected: 5,
      },
      {
        description: 'addBonus(-5) returnerar 0',
        code: 'addBonus(-5)',
        expected: 0,
      },
    ],
    sourceChecks: [
      {
        description: 'addBonus skapas med function',
        pattern: /\bfunction\s+addBonus\b/,
      },
    ],
  },
  {
    id: 'functions-02',
    title: 'Anropa en funktion',
    xp: 10,
    track: 'functions',
    isBoss: false,
    description:
      'När du anropar en funktion skickar du in ett argument. Returvärdet kan sparas i en variabel.',
    task: 'Behåll funktionen addBonus. Anropa den med argumentet 10 och spara returvärdet i konstanten result.',
    starterCode: `function addBonus(points) {
  return points + 5;
}

`,
    solution: `function addBonus(points) {
    return points + 5;
    }
    const result = addBonus(10);`,
    hints: [
      'Börja const result = ',
      'Anropa funktionen med dess namn och parenteser.',
      'Skriv argumentet 10 mellan parenteserna och avsluta med semikolon.',
    ],
    tests: [
      { description: 'result har värdet 15', code: 'result', expected: 15 },
      {
        description: 'addBonus(1) returnerar fortfarande 6',
        code: 'addBonus(1)',
        expected: 6,
      },
    ],
    sourceChecks: [
      {
        description: 'result räknas ut med addBonus(10)',
        pattern: /addBonus\s*\(\s*10\s*\)/,
      },
    ],
  },
  {
    id: 'functions-03',
    title: 'Två parametrar',
    xp: 10,
    track: 'functions',
    isBoss: false,
    description:
      'En funktion kan ta emot flera parametrar. Argumenten kopplas till dem i samma ordning som de skickas in.',
    task: 'Skriv funktionen multiply som tar emot två tal och returnerar produkten av dem. Anropa sedan funktionen med 3 och 4 och spara returvärdet i konstanten result.',
    starterCode: '// Skriv din kod här',
    solution: `function multiply(a, b) {
  return a * b;
}

const result = multiply(3, 4);`,
    hints: [
      'Börja function förljt av funktionens namn',
      'Ange två parametrar',
      'Returnera parameter 1 * parameter 2',
    ],
    tests: [
      {
        description: 'multiply(3, 4) returnerar 12',
        code: 'multiply(3, 4)',
        expected: 12,
      },
      {
        description: 'multiply(2, 5) returnerar 10',
        code: 'multiply(2, 5)',
        expected: 10,
      },
      {
        description: 'multiply(-3, 0) returnerar 0',
        code: 'multiply(-3, 0)',
        expected: 0,
      },
      { description: 'result är 12', code: 'result', expected: 12 },
    ],
  },
  {
    id: 'functions-04',
    title: 'Returnera utifrån ett villkor',
    xp: 10,
    track: 'functions',
    isBoss: false,
    description:
      'Return avslutar funktionsanropet. Därför kan du returnera ett värde inuti if och ett annat efter blocket.',
    task: 'Skriv funktionen getDiscount med parametern price. Om price >= 100 ska den returnera 20. Efter if-blocket ska den returnera 0. Använd inte else.',
    starterCode: '// Skriv din kod här',
    solution: `function getDiscount(price){
    if(price >= 100){
    return 20;}
    return 0;}`,
    hints: [
      'Deklarera getDiscount med parametern price.',
      'Kontrollera price >= 100 i ett if-block och returnera 20 där.',
      'Placera return 0; efter if-blocket men inuti funktionen.',
    ],
    tests: [
      {
        description: 'getDiscount(150) returnerar 20',
        code: 'getDiscount(150)',
        expected: 20,
      },
      {
        description: 'getDiscount(100) returnerar 20',
        code: 'getDiscount(100)',
        expected: 20,
      },
      {
        description: 'getDiscount(99) returnerar 0',
        code: 'getDiscount(99)',
        expected: 0,
      },
      {
        description: 'getDiscount(0) returnerar 0',
        code: 'getDiscount(0)',
        expected: 0,
      },
    ],
    sourceChecks: [
      {
        description: 'Koden använder inte else',
        pattern: /\belse\b/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'functions-05',
    title: 'Skriv en arrow function',
    xp: 10,
    track: 'functions',
    isBoss: false,
    description:
      'En arrow function med ett uttryck utan klamrar returnerar uttryckets värde automatiskt.',
    task: 'Skapa konstanten multiply som en arrow function med parametrarna a och b inom parenteser. Returnera a * b utan klamrar eller return. Du ska inte anropa funktionen.',
    starterCode: '// Skriv din kod här',
    solution: 'const multiply = (a, b) => a * b;',
    hints: [
      'Deklarera multiply som en arraow function',
      'Glöm inte parentes och själva =>',
      'Avsluta med a*b',
    ],
    tests: [
      {
        description: 'multiply(3, 4) returnerar 12',
        code: 'multiply(3, 4)',
        expected: 12,
      },
      {
        description: 'multiply(2, 5) returnerar 10',
        code: 'multiply(2, 5)',
        expected: 10,
      },
      isConst('multiply'),
    ],
    sourceChecks: [
      { description: 'multiply är en arrow function', pattern: /=>/ },
      {
        description: 'Koden använder inte return',
        pattern: /\breturn\b/,
        forbidden: true,
      },
    ],
  },
];
