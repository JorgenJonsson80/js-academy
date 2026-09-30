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
  {
    id: 'map-01',
    title: 'Dubbla med map',
    xp: 10,
    track: 'array-methods',
    isBoss: false,
    description:
      'map anropar en funktion för varje värde och returnerar en ny array med resultaten. Den ursprungliga arrayen ändras inte.',
    task: 'Uppgift: Skapa konstanten doubled med numbers.map och en arrow function som returnerar varje tal gånger 2.',
    starterCode: `const numbers = [1, 2, 3];

`,
    solution: `const numbers = [1, 2, 3];
const doubled = numbers.map(number => number * 2);`,
    hints: [
      'Börja med const doubled = numbers.map(...).',
      'Skicka in en arrow function till map, till exempel number => ...',
      'Arrow functionen ska returnera number * 2.',
    ],
    tests: [
      {
        description: 'doubled är [2, 4, 6]',
        code: 'doubled',
        expected: [2, 4, 6],
      },
      {
        description: 'numbers är fortfarande [1, 2, 3]',
        code: 'numbers',
        expected: [1, 2, 3],
      },
    ],
    sourceChecks: [
      {
        description: 'doubled skapas med numbers.map',
        pattern: /numbers\s*\.\s*map\s*\(/,
      },
      {
        description: 'Koden använder ingen loop',
        pattern: /\b(for|while)\b/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'map-02',
    title: 'Plocka ut namn med map',
    xp: 10,
    track: 'array-methods',
    isBoss: false,
    description:
      'Med map kan du göra om en array av objekt till en array av enskilda värden. I React är det så du gör om data till en lista.',
    task: 'Uppgift: Skapa konstanten names med users.map som returnerar name för varje användare.',
    starterCode: `const users = [
  { name: 'Ada', age: 36 },
  { name: 'Linus', age: 28 },
  { name: 'Grace', age: 45 },
];

`,
    solution: `const users = [
  { name: 'Ada', age: 36 },
  { name: 'Linus', age: 28 },
  { name: 'Grace', age: 45 },
];
const names = users.map(user => user.name);`,
    hints: [
      'Börja med const names = users.map(...).',
      'Arrow functionen tar emot en användare åt gången, till exempel user => ...',
      'Returnera user.name.',
    ],
    tests: [
      {
        description: 'names är ["Ada", "Linus", "Grace"]',
        code: 'names',
        expected: ['Ada', 'Linus', 'Grace'],
      },
      {
        description: 'users har fortfarande tre användare',
        code: 'users.length',
        expected: 3,
      },
    ],
    sourceChecks: [
      {
        description: 'names skapas med users.map',
        pattern: /users\s*\.\s*map\s*\(/,
      },
    ],
  },
  {
    id: 'filter-01',
    title: 'Filtrera tal',
    xp: 10,
    track: 'array-methods',
    isBoss: false,
    description:
      'filter returnerar en ny array med de värden där funktionen returnerar true.',
    task: 'Uppgift: Skapa konstanten bigNumbers med numbers.filter och behåll bara talen som är större än 10.',
    starterCode: `const numbers = [5, 12, 8, 20, 3];

`,
    solution: `const numbers = [5, 12, 8, 20, 3];
const bigNumbers = numbers.filter(number => number > 10);`,
    hints: [
      'Börja med const bigNumbers = numbers.filter(...).',
      'Arrow functionen ska returnera true för de tal som ska vara kvar.',
      'Jämför med number > 10.',
    ],
    tests: [
      {
        description: 'bigNumbers är [12, 20]',
        code: 'bigNumbers',
        expected: [12, 20],
      },
      {
        description: 'numbers är oförändrad',
        code: 'numbers',
        expected: [5, 12, 8, 20, 3],
      },
    ],
    sourceChecks: [
      {
        description: 'bigNumbers skapas med numbers.filter',
        pattern: /numbers\s*\.\s*filter\s*\(/,
      },
    ],
  },
  {
    id: 'filter-02',
    title: 'Filtrera objekt',
    xp: 10,
    track: 'array-methods',
    isBoss: false,
    description:
      'filter fungerar lika bra på objekt. Funktionen kan läsa en egenskap och avgöra om objektet ska vara med.',
    task: 'Uppgift: Skapa konstanten doneTodos med todos.filter och behåll bara uppgifterna där done är true.',
    starterCode: `const todos = [
  { id: 1, text: 'Handla', done: true },
  { id: 2, text: 'Träna', done: false },
  { id: 3, text: 'Plugga React', done: true },
];

`,
    solution: `const todos = [
  { id: 1, text: 'Handla', done: true },
  { id: 2, text: 'Träna', done: false },
  { id: 3, text: 'Plugga React', done: true },
];
const doneTodos = todos.filter(todo => todo.done);`,
    hints: [
      'Börja med const doneTodos = todos.filter(...).',
      'Arrow functionen tar emot en todo åt gången.',
      'todo.done är redan true eller false, så du kan returnera det direkt.',
    ],
    tests: [
      {
        description: 'doneTodos innehåller "Handla" och "Plugga React"',
        code: 'doneTodos.map(todo => todo.text)',
        expected: ['Handla', 'Plugga React'],
      },
      {
        description: 'doneTodos innehåller samma objekt som todos',
        code: 'doneTodos[0] === todos[0]',
        expected: true,
      },
      {
        description: 'todos har fortfarande tre uppgifter',
        code: 'todos.length',
        expected: 3,
      },
    ],
    sourceChecks: [
      {
        description: 'doneTodos skapas med todos.filter',
        pattern: /todos\s*\.\s*filter\s*\(/,
      },
    ],
  },
  {
    id: 'find-01',
    title: 'Hitta ett objekt',
    xp: 10,
    track: 'array-methods',
    isBoss: false,
    description:
      'find returnerar det första värdet där funktionen returnerar true. Hittas inget blir resultatet undefined.',
    task: 'Uppgift: Skapa konstanten todo med todos.find och hämta uppgiften som har id 2.',
    starterCode: `const todos = [
  { id: 1, text: 'Handla', done: true },
  { id: 2, text: 'Träna', done: false },
  { id: 3, text: 'Plugga React', done: true },
];

`,
    solution: `const todos = [
  { id: 1, text: 'Handla', done: true },
  { id: 2, text: 'Träna', done: false },
  { id: 3, text: 'Plugga React', done: true },
];
const todo = todos.find(item => item.id === 2);`,
    hints: [
      'Börja med const todo = todos.find(...).',
      'Arrow functionen tar emot ett objekt åt gången, till exempel item => ...',
      'Jämför item.id === 2.',
    ],
    tests: [
      {
        description: 'todo är samma objekt som todos[1]',
        code: 'todo === todos[1]',
        expected: true,
      },
      {
        description: 'todos har fortfarande tre uppgifter',
        code: 'todos.length',
        expected: 3,
      },
    ],
    sourceChecks: [
      {
        description: 'todo hämtas med todos.find',
        pattern: /todos\s*\.\s*find\s*\(/,
      },
    ],
  },
  {
    id: 'reduce-01',
    title: 'Summera med reduce',
    xp: 10,
    track: 'array-methods',
    isBoss: false,
    description:
      'reduce slår ihop en array till ett enda värde. Funktionen får det hittills samlade värdet och nästa värde i arrayen, och returnerar det nya samlade värdet. Det andra argumentet till reduce är startvärdet.',
    task: 'Uppgift: Skapa konstanten total med numbers.reduce som summerar alla tal. Använd 0 som startvärde.',
    starterCode: `const numbers = [5, 10, 15];

`,
    solution: `const numbers = [5, 10, 15];
const total = numbers.reduce((sum, number) => sum + number, 0);`,
    hints: [
      'Börja med const total = numbers.reduce(...).',
      'Funktionen tar två parametrar: (sum, number) => ...',
      'Returnera sum + number och skicka in 0 som andra argument till reduce.',
    ],
    tests: [
      { description: 'total har värdet 30', code: 'total', expected: 30 },
      {
        description: 'numbers är oförändrad',
        code: 'numbers',
        expected: [5, 10, 15],
      },
    ],
    sourceChecks: [
      {
        description: 'total räknas ut med numbers.reduce',
        pattern: /numbers\s*\.\s*reduce\s*\(/,
      },
      {
        description: 'Koden använder ingen loop',
        pattern: /\b(for|while)\b/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'array-methods-boss-01',
    title: 'Boss: Butikens lager',
    xp: 30,
    track: 'array-methods',
    isBoss: true,
    description: 'Kombinera map, filter, find och reduce.',
    task: `Uppgift: Utgå från products.
  Skapa inStock med filter: bara produkter där inStock är true.
  Skapa inStockNames med map på inStock: bara namnen.
  Skapa cap med find: produkten som heter "Keps".
  Skapa totalPrice med reduce på inStock: summan av alla priser.
  Använd inga loopar.`,
    starterCode: `const products = [
  { name: 'Keps', price: 199, inStock: true },
  { name: 'Mössa', price: 149, inStock: false },
  { name: 'Halsduk', price: 299, inStock: true },
];

`,
    solution: `const products = [
  { name: 'Keps', price: 199, inStock: true },
  { name: 'Mössa', price: 149, inStock: false },
  { name: 'Halsduk', price: 299, inStock: true },
];
const inStock = products.filter(product => product.inStock);
const inStockNames = inStock.map(product => product.name);
const cap = products.find(product => product.name === 'Keps');
const totalPrice = inStock.reduce((sum, product) => sum + product.price, 0);`,
    hints: [],
    tests: [
      {
        description: 'inStock innehåller Keps och Halsduk',
        code: 'inStock.map(product => product.name)',
        expected: ['Keps', 'Halsduk'],
      },
      {
        description: 'inStockNames är ["Keps", "Halsduk"]',
        code: 'inStockNames',
        expected: ['Keps', 'Halsduk'],
      },
      {
        description: 'cap är samma objekt som products[0]',
        code: 'cap === products[0]',
        expected: true,
      },
      {
        description: 'totalPrice har värdet 498',
        code: 'totalPrice',
        expected: 498,
      },
      {
        description: 'products har fortfarande tre produkter',
        code: 'products.length',
        expected: 3,
      },
    ],
    sourceChecks: [
      {
        description: 'inStock skapas med products.filter',
        pattern: /products\s*\.\s*filter\s*\(/,
      },
      {
        description: 'inStockNames skapas med inStock.map',
        pattern: /inStock\s*\.\s*map\s*\(/,
      },
      {
        description: 'cap hämtas med products.find',
        pattern: /products\s*\.\s*find\s*\(/,
      },
      {
        description: 'totalPrice räknas ut med inStock.reduce',
        pattern: /inStock\s*\.\s*reduce\s*\(/,
      },
      {
        description: 'Koden använder ingen loop',
        pattern: /\b(for|while)\b/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'template-01',
    title: 'Template literals',
    xp: 10,
    track: 'modern-js',
    isBoss: false,
    description:
      'En template literal skrivs med backticks ` ` i stället för citattecken. Inuti kan du stoppa in värden med ${ }. I React bygger du ofta text och klassnamn så.',
    task: 'Uppgift: Skapa konstanten greeting med en template literal som ger texten "Hej Ada!". Använd variabeln name, inte texten Ada direkt.',
    starterCode: `const name = 'Ada';

`,
    solution: "const name = 'Ada';\nconst greeting = `Hej ${name}!`;",
    hints: [
      'Börja med const greeting = och en backtick `.',
      'Skriv Hej följt av ett mellanslag och ${name}.',
      'Avsluta med ! och en backtick.',
    ],
    tests: [
      {
        description: 'greeting är "Hej Ada!"',
        code: 'greeting',
        expected: 'Hej Ada!',
      },
    ],
    sourceChecks: [
      {
        description: 'name stoppas in med ${name} i en template literal',
        pattern: /`[^`]*\$\{\s*name\s*\}[^`]*`/,
      },
      {
        description: 'Texten slås inte ihop med +',
        pattern: /\+/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'destructuring-01',
    title: 'Plocka ut ur ett objekt',
    xp: 10,
    track: 'modern-js',
    isBoss: false,
    description:
      'Med destructuring plockar du ut egenskaper ur ett objekt till egna variabler på en rad: const { name } = user; skapar variabeln name med värdet user.name.',
    task: 'Uppgift: Plocka ut name och age ur user med destructuring på en rad.',
    starterCode: `const user = { name: 'Ada', age: 36 };

`,
    solution: `const user = { name: 'Ada', age: 36 };
const { name, age } = user;`,
    hints: [
      'Börja med const { } = user;',
      'Skriv namnen på egenskaperna inuti klamrarna.',
      'Separera name och age med kommatecken.',
    ],
    tests: [
      { description: 'name har värdet "Ada"', code: 'name', expected: 'Ada' },
      { description: 'age har värdet 36', code: 'age', expected: 36 },
    ],
    sourceChecks: [
      {
        description: 'name och age plockas ut med const { ... } = user',
        pattern:
          /const\s*\{(?=[^}]*\bname\b)(?=[^}]*\bage\b)[^}]*\}\s*=\s*user\b/,
      },
    ],
  },
  {
    id: 'destructuring-02',
    title: 'Plocka ut ur en array',
    xp: 10,
    track: 'modern-js',
    isBoss: false,
    description:
      'Destructuring fungerar också på arrayer, men med [ ] och efter position i stället för namn. Det är så du tar emot värdena från useState i React: const [count, setCount] = useState(0);',
    task: 'Uppgift: Plocka ut de två första värdena i scores till first och second med array-destructuring på en rad.',
    starterCode: `const scores = [90, 75, 60];

`,
    solution: `const scores = [90, 75, 60];
const [first, second] = scores;`,
    hints: [
      'Börja med const [ ] = scores;',
      'Variablerna får värdena i samma ordning som i arrayen.',
      'Skriv first, second inuti hakparenteserna.',
    ],
    tests: [
      { description: 'first har värdet 90', code: 'first', expected: 90 },
      { description: 'second har värdet 75', code: 'second', expected: 75 },
    ],
    sourceChecks: [
      {
        description: 'Värdena plockas ut med const [first, second] = scores',
        pattern: /const\s*\[\s*first\s*,\s*second\s*\]\s*=\s*scores\b/,
      },
    ],
  },
  {
    id: 'destructuring-03',
    title: 'Destructuring i parametrar',
    xp: 10,
    track: 'modern-js',
    isBoss: false,
    description:
      'Du kan plocka isär ett objekt direkt i parameterlistan. Så tar en React-komponent emot sina props: function Greeting({ name }) { ... }',
    task: 'Uppgift: Skriv funktionen greet som tar emot ett objekt och plockar ut name direkt i parameterlistan. Den ska returnera "Hej " följt av namnet och "!".',
    starterCode: '// Skriv din kod här',
    solution: 'function greet({ name }) {\n  return `Hej ${name}!`;\n}',
    hints: [
      'Börja med function greet( ).',
      'Skriv { name } inuti parenteserna i stället för ett vanligt parameternamn.',
      'Returnera en template literal med ${name}.',
    ],
    tests: [
      {
        description: 'greet({ name: "Ada" }) returnerar "Hej Ada!"',
        code: 'greet({ name: "Ada" })',
        expected: 'Hej Ada!',
      },
      {
        description:
          'greet({ name: "Linus", age: 28 }) returnerar "Hej Linus!"',
        code: 'greet({ name: "Linus", age: 28 })',
        expected: 'Hej Linus!',
      },
    ],
    sourceChecks: [
      {
        description: 'name plockas ut i parameterlistan',
        pattern: /\(\s*\{\s*name\s*\}\s*\)/,
      },
    ],
  },
  {
    id: 'spread-01',
    title: 'Spread: kopiera en array',
    xp: 10,
    track: 'modern-js',
    isBoss: false,
    description:
      'Spread, ..., packar upp en array till sina värden. [...todos, "Ny"] skapar en ny array med allt från todos plus ett nytt värde. I React ändrar du aldrig state direkt, du skapar en ny array så här.',
    task: 'Uppgift: Skapa konstanten newTodos med spread: alla värden från todos följt av "Plugga React". Använd inte push, todos ska vara oförändrad.',
    starterCode: `const todos = ['Handla', 'Träna'];

`,
    solution: `const todos = ['Handla', 'Träna'];
const newTodos = [...todos, 'Plugga React'];`,
    hints: [
      'Börja med const newTodos = [ ];',
      'Skriv ...todos först inuti hakparenteserna.',
      'Lägg till "Plugga React" efter ett kommatecken.',
    ],
    tests: [
      {
        description: 'newTodos är ["Handla", "Träna", "Plugga React"]',
        code: 'newTodos',
        expected: ['Handla', 'Träna', 'Plugga React'],
      },
      {
        description: 'todos är fortfarande ["Handla", "Träna"]',
        code: 'todos',
        expected: ['Handla', 'Träna'],
      },
    ],
    sourceChecks: [
      {
        description: 'newTodos skapas med [...todos, ...]',
        pattern: /\[\s*\.\.\.\s*todos\b/,
      },
      {
        description: 'Koden använder inte push',
        pattern: /\bpush\b/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'spread-02',
    title: 'Spread: kopiera ett objekt',
    xp: 10,
    track: 'modern-js',
    isBoss: false,
    description:
      'Spread fungerar också på objekt. { ...user, age: 37 } kopierar alla egenskaper från user och skriver sedan över age. Det som står sist vinner.',
    task: 'Uppgift: Skapa konstanten olderUser med spread: en kopia av user där age är 37. user ska vara oförändrad.',
    starterCode: `const user = { name: 'Ada', age: 36 };

`,
    solution: `const user = { name: 'Ada', age: 36 };
const olderUser = { ...user, age: 37 };`,
    hints: [
      'Börja med const olderUser = { };',
      'Skriv ...user först inuti klamrarna.',
      'Lägg till age: 37 efter ...user, så att det nya värdet vinner.',
    ],
    tests: [
      {
        description: 'olderUser.name är "Ada"',
        code: 'olderUser.name',
        expected: 'Ada',
      },
      {
        description: 'olderUser.age är 37',
        code: 'olderUser.age',
        expected: 37,
      },
      {
        description: 'user.age är fortfarande 36',
        code: 'user.age',
        expected: 36,
      },
      {
        description: 'olderUser är ett nytt objekt',
        code: 'olderUser !== user',
        expected: true,
      },
    ],
    sourceChecks: [
      {
        description: 'olderUser skapas med { ...user, ... }',
        pattern: /\{\s*\.\.\.\s*user\b/,
      },
    ],
  },
  {
    id: 'rest-01',
    title: 'Rest: resten av en array',
    xp: 10,
    track: 'modern-js',
    isBoss: false,
    description:
      'Rest ser ut som spread men gör tvärtom: den packar ihop. Står ... till vänster om = är det rest. const [first, ...others] = numbers; ger first det första värdet och others en array med resten.',
    task: 'Uppgift: Plocka ut första värdet i numbers till first och samla resten i arrayen others. Använd rest på en rad.',
    starterCode: `const numbers = [1, 2, 3, 4];

`,
    solution: `const numbers = [1, 2, 3, 4];
const [first, ...others] = numbers;`,
    hints: [
      'Börja med const [ ] = numbers; som i array-destructuring.',
      'Skriv first som första variabel.',
      'Skriv ...others sist, den samlar ihop resten.',
    ],
    tests: [
      { description: 'first har värdet 1', code: 'first', expected: 1 },
      {
        description: 'others är [2, 3, 4]',
        code: 'others',
        expected: [2, 3, 4],
      },
    ],
    sourceChecks: [
      {
        description:
          'Värdena plockas ut med const [first, ...others] = numbers',
        pattern:
          /const\s*\[\s*first\s*,\s*\.\.\.\s*others\s*\]\s*=\s*numbers\b/,
      },
    ],
  },
  {
    id: 'rest-02',
    title: 'Rest: resten av ett objekt',
    xp: 10,
    track: 'modern-js',
    isBoss: false,
    description:
      'Rest fungerar också på objekt: const { id, ...details } = user; plockar ut id och samlar alla andra egenskaper i ett nytt objekt.',
    task: 'Uppgift: Plocka ut id ur user och samla resten av egenskaperna i objektet details. Använd rest på en rad.',
    starterCode: `const user = { id: 1, name: 'Ada', age: 36 };

`,
    solution: `const user = { id: 1, name: 'Ada', age: 36 };
const { id, ...details } = user;`,
    hints: [
      'Börja med const { } = user; som i objekt-destructuring.',
      'Skriv id som första namn.',
      'Skriv ...details sist, den samlar ihop resten.',
    ],
    tests: [
      { description: 'id har värdet 1', code: 'id', expected: 1 },
      {
        description: 'details är { name: "Ada", age: 36 }',
        code: 'details',
        expected: { name: 'Ada', age: 36 },
      },
      {
        description: 'user har fortfarande id',
        code: 'user.id',
        expected: 1,
      },
    ],
    sourceChecks: [
      {
        description: 'Värdena plockas ut med const { id, ...details } = user',
        pattern: /const\s*\{\s*id\s*,\s*\.\.\.\s*details\s*\}\s*=\s*user\b/,
      },
    ],
  },
  {
    id: 'rest-03',
    title: 'Rest i parametrar',
    xp: 10,
    track: 'modern-js',
    isBoss: false,
    description:
      'Med rest i parameterlistan tar en funktion emot hur många argument som helst. function sum(...numbers) samlar alla argument i arrayen numbers.',
    task: 'Uppgift: Skriv funktionen sum med rest-parametern ...numbers. Den ska returnera summan av alla argument. Använd reduce.',
    starterCode: '// Skriv din kod här',
    solution: `function sum(...numbers) {
  return numbers.reduce((total, number) => total + number, 0);
}`,
    hints: [
      'Börja med function sum(...numbers).',
      'numbers är en vanlig array inuti funktionen.',
      'Returnera numbers.reduce((total, number) => total + number, 0).',
    ],
    tests: [
      {
        description: 'sum(1, 2, 3) returnerar 6',
        code: 'sum(1, 2, 3)',
        expected: 6,
      },
      { description: 'sum(5) returnerar 5', code: 'sum(5)', expected: 5 },
      {
        description: 'sum(10, 20, 30, 40) returnerar 100',
        code: 'sum(10, 20, 30, 40)',
        expected: 100,
      },
      { description: 'sum() returnerar 0', code: 'sum()', expected: 0 },
    ],
    sourceChecks: [
      {
        description: 'sum har rest-parametern ...numbers',
        pattern: /\(\s*\.\.\.\s*numbers\s*\)/,
      },
      {
        description: 'Summan räknas ut med reduce',
        pattern: /\.\s*reduce\s*\(/,
      },
    ],
  },
  {
    id: 'ternary-01',
    title: 'Välj med ? :',
    xp: 10,
    track: 'modern-js',
    isBoss: false,
    description:
      'Villkorsoperatorn villkor ? a : b ger a om villkoret är sant och annars b. Den är ett uttryck, så den fungerar mitt i JSX där if inte gör det.',
    task: 'Uppgift: Skapa arrow functionen getLabel med parametern isLoggedIn. Den ska returnera "Logga ut" om isLoggedIn är true och annars "Logga in". Använd ? : och inte if.',
    starterCode: '// Skriv din kod här',
    solution:
      "const getLabel = isLoggedIn => (isLoggedIn ? 'Logga ut' : 'Logga in');",
    hints: [
      'Börja med const getLabel = isLoggedIn =>',
      'Skriv villkoret isLoggedIn följt av ?',
      'Efter ? kommer "Logga ut", sedan : och "Logga in".',
    ],
    tests: [
      {
        description: 'getLabel(true) returnerar "Logga ut"',
        code: 'getLabel(true)',
        expected: 'Logga ut',
      },
      {
        description: 'getLabel(false) returnerar "Logga in"',
        code: 'getLabel(false)',
        expected: 'Logga in',
      },
    ],
    sourceChecks: [
      { description: 'Koden använder ? :', pattern: /\?[^:]+:/ },
      {
        description: 'Koden använder inte if',
        pattern: /\bif\b/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'and-01',
    title: 'Visa bara om med &&',
    xp: 10,
    track: 'modern-js',
    isBoss: false,
    description:
      'a && b ger a om a är falskt och annars b. I React används det för att visa något bara när ett villkor är sant: {count > 0 && <Badge />}.',
    task: 'Uppgift: Skapa arrow functionen getBadge med parametern count. Returnera count > 0 && en template literal med texten "3 nya" (med count i stället för 3). Använd varken if eller ? :.',
    starterCode: '// Skriv din kod här',
    solution: 'const getBadge = count => count > 0 && `${count} nya`;',
    hints: [
      'Börja med const getBadge = count =>',
      'Skriv villkoret count > 0 följt av &&.',
      'Efter && kommer en template literal med ${count} nya.',
    ],
    tests: [
      {
        description: 'getBadge(3) returnerar "3 nya"',
        code: 'getBadge(3)',
        expected: '3 nya',
      },
      {
        description: 'getBadge(12) returnerar "12 nya"',
        code: 'getBadge(12)',
        expected: '12 nya',
      },
      {
        description: 'getBadge(0) returnerar false',
        code: 'getBadge(0)',
        expected: false,
      },
    ],
    sourceChecks: [
      { description: 'Koden använder &&', pattern: /&&/ },
      {
        description: 'Koden använder inte if',
        pattern: /\bif\b/,
        forbidden: true,
      },
      {
        description: 'Koden använder inte ? :',
        pattern: /\?/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'modern-js-boss-01',
    title: 'Boss: Rest eller spread?',
    xp: 30,
    track: 'modern-js',
    isBoss: true,
    description:
      'Blanda destructuring, rest, spread och template literals. Avgör för varje ... om det packar ihop (rest) eller packar upp (spread).',
    task: `Uppgift: Utgå från user och todos.
  Plocka ut id ur user och samla resten i profile.
  Skapa updatedProfile: en kopia av profile där age är 37.
  Skapa allTodos: alla todos följt av "Plugga React".
  Plocka ut firstTodo och samla resten av allTodos i otherTodos.
  Skapa message med en template literal: "Ada har 3 uppgifter".
  Använd updatedProfile.name och allTodos.length i message.
  user och todos ska vara oförändrade.`,
    starterCode: `const user = { id: 1, name: 'Ada', age: 36 };
const todos = ['Handla', 'Träna'];

`,
    solution:
      "const user = { id: 1, name: 'Ada', age: 36 };\nconst todos = ['Handla', 'Träna'];\n\nconst { id, ...profile } = user;\nconst updatedProfile = { ...profile, age: 37 };\nconst allTodos = [...todos, 'Plugga React'];\nconst [firstTodo, ...otherTodos] = allTodos;\nconst message = `${updatedProfile.name} har ${allTodos.length} uppgifter`;",
    hints: [],
    tests: [
      { description: 'id har värdet 1', code: 'id', expected: 1 },
      {
        description: 'profile är { name: "Ada", age: 36 }',
        code: 'profile',
        expected: { name: 'Ada', age: 36 },
      },
      {
        description: 'updatedProfile är { name: "Ada", age: 37 }',
        code: '[updatedProfile.name, updatedProfile.age, "id" in updatedProfile]',
        expected: ['Ada', 37, false],
      },
      {
        description: 'allTodos är ["Handla", "Träna", "Plugga React"]',
        code: 'allTodos',
        expected: ['Handla', 'Träna', 'Plugga React'],
      },
      {
        description: 'firstTodo är "Handla"',
        code: 'firstTodo',
        expected: 'Handla',
      },
      {
        description: 'otherTodos är ["Träna", "Plugga React"]',
        code: 'otherTodos',
        expected: ['Träna', 'Plugga React'],
      },
      {
        description: 'message är "Ada har 3 uppgifter"',
        code: 'message',
        expected: 'Ada har 3 uppgifter',
      },
      {
        description: 'user och todos är oförändrade',
        code: '[user.age, todos.length]',
        expected: [36, 2],
      },
    ],
    sourceChecks: [
      {
        description: 'profile samlas ihop med rest: { id, ...profile } = user',
        pattern: /\{\s*id\s*,\s*\.\.\.\s*profile\s*\}\s*=\s*user\b/,
      },
      {
        description: 'updatedProfile skapas med spread: { ...profile, ... }',
        pattern: /\{\s*\.\.\.\s*profile\b/,
      },
      {
        description: 'allTodos skapas med spread: [...todos, ...]',
        pattern: /\[\s*\.\.\.\s*todos\b/,
      },
      {
        description:
          'otherTodos samlas ihop med rest: [firstTodo, ...otherTodos] = allTodos',
        pattern:
          /\[\s*firstTodo\s*,\s*\.\.\.\s*otherTodos\s*\]\s*=\s*allTodos\b/,
      },
      {
        description:
          'message använder ${updatedProfile.name} och ${allTodos.length}',
        pattern:
          /`(?=[^`]*\$\{\s*updatedProfile\s*\.\s*name\s*\})(?=[^`]*\$\{\s*allTodos\s*\.\s*length\s*\})[^`]*`/,
      },
    ],
  },
];
