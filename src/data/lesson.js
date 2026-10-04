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
  {
    id: 'modules-01',
    title: 'Exportera en funktion',
    xp: 10,
    track: 'modules',
    isBoss: false,
    description:
      "I React delas koden upp i många filer, så kallade moduler. Allt i en fil är privat tills du exporterar det. Skriver du export framför en funktion kan andra filer importera den med import { add } from './math.js'. Det kallas named export.",
    task: 'Uppgift: app.js försöker importera add från din fil math.js. Exportera add så att app.js fungerar.',
    fileName: 'math.js',
    files: {
      'app.js': `import { add } from './math.js';

export const result = add(2, 3);`,
    },
    starterCode: `function add(a, b) {
  return a + b;
}`,
    solution: `export function add(a, b) {
  return a + b;
}`,
    hints: [
      'Funktionen är redan klar, den behöver bara exporteras.',
      'Ordet export skrivs först på raden.',
      'Skriv export function add(a, b) {',
    ],
    tests: [
      {
        description: 'math.js exporterar add',
        code: "typeof __require('./math.js').add",
        expected: 'function',
      },
      {
        description: 'result i app.js är 5',
        code: "__require('./app.js').result",
        expected: 5,
      },
    ],
  },
  {
    id: 'modules-02',
    title: 'Exportera flera saker',
    xp: 10,
    track: 'modules',
    isBoss: false,
    description:
      'En fil kan ha hur många named exports som helst. export fungerar framför const också, så både vanliga värden och arrow functions kan exporteras.',
    task: 'Uppgift: Exportera konstanten PI med värdet 3.14 och arrow functionen double, som returnerar talet gånger 2. app.js importerar båda.',
    fileName: 'math.js',
    files: {
      'app.js': `import { PI, double } from './math.js';

export const result = double(PI);`,
    },
    starterCode: '// Skriv din kod här',
    solution: `export const PI = 3.14;
export const double = number => number * 2;`,
    hints: [
      'Du behöver två rader, en för PI och en för double.',
      'Börja varje rad med export const.',
      'Skriv export const double = number => number * 2;',
    ],
    tests: [
      {
        description: 'math.js exporterar PI med värdet 3.14',
        code: "__require('./math.js').PI",
        expected: 3.14,
      },
      {
        description: 'double(5) returnerar 10',
        code: "__require('./math.js').double(5)",
        expected: 10,
      },
      {
        description: 'result i app.js är 6.28',
        code: "__require('./app.js').result",
        expected: 6.28,
      },
    ],
  },
  {
    id: 'modules-03',
    title: 'Importera named exports',
    xp: 10,
    track: 'modules',
    isBoss: false,
    description:
      "För att använda något från en annan fil importerar du det: import { add, multiply } from './math.js'. Namnen inom { } måste vara exakt samma som i exporten. ./ betyder att filen ligger i samma mapp.",
    task: 'Uppgift: Importera add och multiply från ./math.js med en import. Skapa sedan total = add(2, 3) och product = multiply(4, 5).',
    fileName: 'app.js',
    files: {
      'math.js': `export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}`,
    },
    starterCode: '// Skriv din kod här',
    solution: `import { add, multiply } from './math.js';

const total = add(2, 3);
const product = multiply(4, 5);`,
    hints: [
      'Importer skrivs överst i filen.',
      "Börja med import { } from './math.js';",
      'Skriv add, multiply inom { } och skapa sedan total och product.',
    ],
    tests: [
      { description: 'total är 5', code: 'total', expected: 5 },
      { description: 'product är 20', code: 'product', expected: 20 },
      {
        description: 'add och multiply är importerade från math.js',
        code: "add === __require('./math.js').add && multiply === __require('./math.js').multiply",
        expected: true,
      },
    ],
    sourceChecks: [
      {
        description: 'Båda importeras i samma import',
        pattern:
          /import\s*\{\s*(add\s*,\s*multiply|multiply\s*,\s*add)\s*,?\s*\}/,
      },
    ],
  },
  {
    id: 'modules-04',
    title: 'Default export',
    xp: 10,
    track: 'modules',
    isBoss: false,
    description:
      "En fil kan också ha en default export, filens huvudsak. Den importeras utan { }: import greet from './greet.js'. React-komponenter brukar exporteras så: export default function App() { … }.",
    task: 'Uppgift: Skriv funktionen greet med parametern name. Den ska returnera "Hej Ada!" (med name i stället för Ada). Gör greet till filens default export.',
    fileName: 'greet.js',
    files: {
      'app.js': `import greet from './greet.js';

export const message = greet('Ada');`,
    },
    starterCode: '// Skriv din kod här',
    solution: `export default function greet(name) {
  return \`Hej \${name}!\`;
}`,
    hints: [
      'Börja med function greet(name) och returnera en template literal.',
      'Skriv export default framför function.',
      'Det blir export default function greet(name) {',
    ],
    tests: [
      {
        description: 'greet.js har en default export',
        code: "typeof __require('./greet.js').default",
        expected: 'function',
      },
      {
        description: 'message i app.js är "Hej Ada!"',
        code: "__require('./app.js').message",
        expected: 'Hej Ada!',
      },
      {
        description: 'greet("Linus") returnerar "Hej Linus!"',
        code: "__require('./greet.js').default('Linus')",
        expected: 'Hej Linus!',
      },
    ],
  },
  {
    id: 'modules-05',
    title: 'Importera default',
    xp: 10,
    track: 'modules',
    isBoss: false,
    description:
      "En default export har inget fast namn när den importeras. Du väljer namnet själv: import format from './formatPrice.js' fungerar lika bra som import formatPrice from ….",
    task: 'Uppgift: Importera default exporten från ./formatPrice.js och döp den till format. Skapa sedan price = format(99).',
    fileName: 'app.js',
    files: {
      'formatPrice.js': `export default function formatPrice(amount) {
  return \`\${amount} kr\`;
}`,
    },
    starterCode: '// Skriv din kod här',
    solution: `import format from './formatPrice.js';

const price = format(99);`,
    hints: [
      'En default export importeras utan { }.',
      'Namnet efter import bestämmer du själv.',
      "Skriv import format from './formatPrice.js';",
    ],
    tests: [
      { description: 'price är "99 kr"', code: 'price', expected: '99 kr' },
      {
        description: 'format är default exporten från formatPrice.js',
        code: "format === __require('./formatPrice.js').default",
        expected: true,
      },
    ],
  },
  {
    id: 'modules-06',
    title: 'Default och named i samma import',
    xp: 10,
    track: 'modules',
    isBoss: false,
    description:
      "En fil kan ha både en default export och named exports. Då importerar du dem tillsammans, default först: import addTodo, { MAX_TODOS } from './todos.js'. Du kommer att se samma mönster i React: import React, { useState } from 'react'. Paket skrivs utan ./.",
    task: "Uppgift: Importera addTodo och MAX_TODOS från ./todos.js på en rad. Skapa todos = addTodo(['Handla'], 'Träna') och isFull, som är true om todos.length är minst MAX_TODOS.",
    fileName: 'app.js',
    files: {
      'todos.js': `export const MAX_TODOS = 3;

export default function addTodo(todos, text) {
  return [...todos, text];
}`,
    },
    starterCode: '// Skriv din kod här',
    solution: `import addTodo, { MAX_TODOS } from './todos.js';

const todos = addTodo(['Handla'], 'Träna');
const isFull = todos.length >= MAX_TODOS;`,
    hints: [
      'addTodo är default exporten och MAX_TODOS en named export.',
      'Default kommer först, sedan ett komma och { } för named exports.',
      "Skriv import addTodo, { MAX_TODOS } from './todos.js';",
    ],
    tests: [
      {
        description: 'todos är ["Handla", "Träna"]',
        code: 'todos',
        expected: ['Handla', 'Träna'],
      },
      { description: 'isFull är false', code: 'isFull', expected: false },
      {
        description: 'addTodo och MAX_TODOS är importerade från todos.js',
        code: "addTodo === __require('./todos.js').default && MAX_TODOS === 3",
        expected: true,
      },
    ],
    sourceChecks: [
      {
        description: 'Båda importeras på en rad: import addTodo, { MAX_TODOS }',
        pattern: /import\s+addTodo\s*,\s*\{\s*MAX_TODOS\s*,?\s*\}\s*from/,
      },
      {
        description: 'isFull använder MAX_TODOS i stället för siffran 3',
        pattern: /\b3\b/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'modules-boss-01',
    title: 'Boss: Bygg en modul',
    xp: 30,
    track: 'modules',
    isBoss: true,
    description:
      'Nu skriver du en fil som både importerar och exporterar. Läs app.js och config.js noga. De visar vad din fil måste exportera och vad den kan importera.',
    task: `Uppgift: Skriv todoUtils.js.
  Importera MAX_TODOS från ./config.js.
  Default export: funktionen addTodo(todos, text).
  Är todos.length minst MAX_TODOS returneras todos oförändrad.
  Annars returneras en ny array med spread: todos följt av text.
  Named export: arrow functionen countTodos(todos).
  Den returnerar en template literal som "2 av 3", med MAX_TODOS som sista tal.`,
    fileName: 'todoUtils.js',
    files: {
      'config.js': 'export const MAX_TODOS = 3;',
      'app.js': `import addTodo, { countTodos } from './todoUtils.js';

const one = addTodo([], 'Handla');
const two = addTodo(one, 'Träna');
const three = addTodo(two, 'Plugga React');
const four = addTodo(three, 'Städa');

export const todos = four;
export const status = countTodos(four);
export const firstList = one;`,
    },
    starterCode: '// Skriv din kod här',
    solution: `import { MAX_TODOS } from './config.js';

export default function addTodo(todos, text) {
  if (todos.length >= MAX_TODOS) return todos;
  return [...todos, text];
}

export const countTodos = todos => \`\${todos.length} av \${MAX_TODOS}\`;`,
    hints: [],
    tests: [
      {
        description: 'todos i app.js är ["Handla", "Träna", "Plugga React"]',
        code: "__require('./app.js').todos",
        expected: ['Handla', 'Träna', 'Plugga React'],
      },
      {
        description: 'status i app.js är "3 av 3"',
        code: "__require('./app.js').status",
        expected: '3 av 3',
      },
      {
        description: 'addTodo ändrar inte arrayen den får',
        code: "__require('./app.js').firstList",
        expected: ['Handla'],
      },
      {
        description: 'countTodos(["Handla"]) returnerar "1 av 3"',
        code: "__require('./todoUtils.js').countTodos(['Handla'])",
        expected: '1 av 3',
      },
    ],
    sourceChecks: [
      {
        description:
          "MAX_TODOS importeras: import { MAX_TODOS } from './config.js'",
        pattern:
          /import\s*\{\s*MAX_TODOS\s*,?\s*\}\s*from\s*['"]\.\/config(\.js)?['"]/,
      },
      {
        description: 'Koden använder MAX_TODOS i stället för siffran 3',
        pattern: /\b3\b/,
        forbidden: true,
      },
      {
        description: 'Den nya arrayen skapas med spread: [...todos, text]',
        pattern: /\[\s*\.\.\.\s*todos\s*,/,
      },
    ],
  },
  {
    id: 'jsx-01',
    title: 'Din första komponent',
    xp: 10,
    track: 'jsx',
    isBoss: false,
    description:
      'En React-komponent är en funktion som returnerar JSX. JSX ser ut som HTML men är JavaScript. Komponentens namn måste börja med stor bokstav, annars tror React att det är en HTML-tagg.',
    task: 'Uppgift: Skriv komponenten App som returnerar en h1 med texten "Hej React!".',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: '// Skriv din kod här',
    solution: `function App() {
  return <h1>Hej React!</h1>;
}`,
    hints: [
      'Börja med function App() { }.',
      'Inuti funktionen skriver du return följt av JSX.',
      'Skriv return <h1>Hej React!</h1>;',
    ],
    tests: [
      {
        description: 'App renderar <h1>Hej React!</h1>',
        code: '__render(<App />)',
        expected: '<h1>Hej React!</h1>',
      },
    ],
  },
  {
    id: 'jsx-02',
    title: 'Värden i JSX med { }',
    xp: 10,
    track: 'jsx',
    isBoss: false,
    description:
      'Inom { } i JSX kan du skriva JavaScript. <p>Hej {name}!</p> visar värdet av variabeln name mitt i texten.',
    task: 'Uppgift: Låt App returnera en p med texten "Hej Ada!". Hämta namnet från variabeln name med { }.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `const name = 'Ada';

function App() {
  return <p>Hej !</p>;
}`,
    solution: `const name = 'Ada';

function App() {
  return <p>Hej {name}!</p>;
}`,
    hints: [
      'Namnet ska stå mellan "Hej " och "!".',
      'Variabler skrivs inom klamrar i JSX.',
      'Skriv <p>Hej {name}!</p>',
    ],
    tests: [
      {
        description: 'App renderar <p>Hej Ada!</p>',
        code: '__render(<App />)',
        expected: '<p>Hej Ada!</p>',
      },
    ],
    sourceChecks: [
      {
        description: 'Namnet skrivs inte in som text i JSX:en',
        pattern: /Ada[^]*Ada/,
        forbidden: true,
      },
      { description: 'JSX:en använder {name}', pattern: /\{\s*name\s*\}/ },
    ],
  },
  {
    id: 'jsx-03',
    title: 'Uttryck i { }',
    xp: 10,
    track: 'jsx',
    isBoss: false,
    description:
      'Allt som ger ett värde fungerar inom { }: uträkningar, funktionsanrop och template literals. {items * price} räknar ut summan direkt i JSX:en.',
    task: 'Uppgift: Låt App returnera en p med texten "Totalt: 75 kr". Räkna ut summan med items * price inom { }.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `const items = 3;
const price = 25;

function App() {
  return <p></p>;
}`,
    solution: `const items = 3;
const price = 25;

function App() {
  return <p>Totalt: {items * price} kr</p>;
}`,
    hints: [
      'Texten "Totalt: " och " kr" skrivs som vanlig text.',
      'Uträkningen items * price ska stå inom { }.',
      'Skriv <p>Totalt: {items * price} kr</p>',
    ],
    tests: [
      {
        description: 'App renderar <p>Totalt: 75 kr</p>',
        code: '__render(<App />)',
        expected: '<p>Totalt: 75 kr</p>',
      },
    ],
    sourceChecks: [
      {
        description: 'Summan räknas ut med items * price',
        pattern: /\{\s*items\s*\*\s*price\s*\}|\{\s*price\s*\*\s*items\s*\}/,
      },
      {
        description: 'Summan skrivs inte in som 75',
        pattern: /\b75\b/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'jsx-04',
    title: 'Attribut och className',
    xp: 10,
    track: 'jsx',
    isBoss: false,
    description:
      'Attribut skrivs nästan som i HTML. Några heter annorlunda: class heter className, eftersom class redan betyder något i JavaScript. Värden från variabler skrivs inom { } utan citattecken: src={logoUrl}. Taggar utan innehåll, som img, måste stängas med />.',
    task: 'Uppgift: Låt App returnera en img med src från variabeln logoUrl, alt "Logga" och klassen "logo".',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `const logoUrl = '/favicon.svg';

function App() {
  return null;
}`,
    solution: `const logoUrl = '/favicon.svg';

function App() {
  return <img src={logoUrl} alt="Logga" className="logo" />;
}`,
    hints: [
      'Byt null mot en img-tagg som stängs med />.',
      'src ska få värdet från logoUrl, alltså src={logoUrl}.',
      'Klassen skrivs className="logo".',
    ],
    tests: [
      {
        description: 'App renderar en img',
        code: '/^<img[^>]*>$/.test(__render(<App />))',
        expected: true,
      },
      {
        description: 'img har src="/favicon.svg"',
        code: '__render(<App />).includes(\'src="/favicon.svg"\')',
        expected: true,
      },
      {
        description: 'img har alt="Logga"',
        code: '__render(<App />).includes(\'alt="Logga"\')',
        expected: true,
      },
      {
        description: 'img har klassen "logo"',
        code: '__render(<App />).includes(\'class="logo"\')',
        expected: true,
      },
    ],
    sourceChecks: [
      {
        description: 'src hämtas med {logoUrl}',
        pattern: /src=\{\s*logoUrl\s*\}/,
      },
      {
        description: 'Klassen skrivs med className, inte class',
        pattern: /\bclass\s*=/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'jsx-05',
    title: 'En rot: Fragment',
    xp: 10,
    track: 'jsx',
    isBoss: false,
    description:
      'En komponent får bara returnera ett element. Vill du returnera två element bredvid varandra lägger du dem i en Fragment: <>…</>. Den samlar ihop dem utan att lägga till något extra element på sidan, som en div skulle göra.',
    task: 'Uppgift: Låt App returnera en h1 med "Profil" och direkt efter den en p med "Ada, 36 år". Använd user.name och user.age. Lägg dem i en Fragment, inte en div.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `const user = { name: 'Ada', age: 36 };

function App() {
  return <h1>Profil</h1>;
}`,
    solution: `const user = { name: 'Ada', age: 36 };

function App() {
  return (
    <>
      <h1>Profil</h1>
      <p>
        {user.name}, {user.age} år
      </p>
    </>
  );
}`,
    hints: [
      'Två element bredvid varandra måste ha en gemensam förälder.',
      'Skriv <> före h1 och </> efter p. JSX över flera rader omges med ( ).',
      'p:n blir <p>{user.name}, {user.age} år</p>',
    ],
    tests: [
      {
        description: 'App renderar <h1>Profil</h1><p>Ada, 36 år</p>',
        code: '__render(<App />)',
        expected: '<h1>Profil</h1><p>Ada, 36 år</p>',
      },
    ],
    sourceChecks: [
      {
        description: 'Namnet och åldern hämtas från user',
        pattern: /user\s*\.\s*name[^]*user\s*\.\s*age/,
      },
    ],
  },
  {
    id: 'jsx-boss-01',
    title: 'Boss: Profilkort',
    xp: 30,
    track: 'jsx',
    isBoss: true,
    description:
      'Kombinera allt om JSX: värden och uttryck i { }, attribut, className och självstängande taggar.',
    task: `Uppgift: Låt App returnera ett profilkort för user.
  En div med klassen "card".
  I den: en img med src från user.avatar och alt från user.name.
  Sedan en h2 med user.name.
  Sist en p med user.title i versaler (toUpperCase).
  Allt ska hämtas från user, inget skrivs in som text.`,
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `const user = {
  name: 'Ada Lovelace',
  title: 'Programmerare',
  avatar: '/favicon.svg',
};

function App() {
  return null;
}`,
    solution: `const user = {
  name: 'Ada Lovelace',
  title: 'Programmerare',
  avatar: '/favicon.svg',
};

function App() {
  return (
    <div className="card">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.title.toUpperCase()}</p>
    </div>
  );
}`,
    hints: [],
    tests: [
      {
        description: 'Kortet är en div med klassen "card"',
        code: '/^<div class="card">.*<\\/div>$/.test(__render(<App />))',
        expected: true,
      },
      {
        description: 'img har src="/favicon.svg" och alt="Ada Lovelace"',
        code: '/<img(?=[^>]*\\bsrc="\\/favicon\\.svg")(?=[^>]*\\balt="Ada Lovelace")[^>]*>/.test(__render(<App />))',
        expected: true,
      },
      {
        description:
          'Efter img kommer <h2>Ada Lovelace</h2><p>PROGRAMMERARE</p>',
        code: '__render(<App />).endsWith("><h2>Ada Lovelace</h2><p>PROGRAMMERARE</p></div>")',
        expected: true,
      },
      {
        description: 'Kortet visar en annan användare om user ändras',
        code: "(user.name = 'Linus', user.title = 'Utvecklare', __render(<App />).includes('<h2>Linus</h2><p>UTVECKLARE</p>'))",
        expected: true,
      },
    ],
    sourceChecks: [
      {
        description: 'Titeln görs om med toUpperCase',
        pattern: /\.\s*toUpperCase\s*\(/,
      },
      {
        description: 'Klassen skrivs med className, inte class',
        pattern: /\bclass\s*=/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'props-01',
    title: 'Komponent i komponent',
    xp: 10,
    track: 'props',
    isBoss: false,
    description:
      'En React-app byggs av komponenter i komponenter. En komponent du skrivit används som en egen tagg: <Logo />. Taggen måste börja med stor bokstav, för <logo /> tror React är en HTML-tagg.',
    task: 'Uppgift: Låt App returnera en header med komponenten Logo inuti.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `function Logo() {
  return <span>⚛️ Academy</span>;
}

function App() {
  return <header></header>;
}`,
    solution: `function Logo() {
  return <span>⚛️ Academy</span>;
}

function App() {
  return (
    <header>
      <Logo />
    </header>
  );
}`,
    hints: [
      'Logo är redan klar, den ska bara användas.',
      'En komponent används som en tagg med sitt namn.',
      'Skriv <Logo /> mellan <header> och </header>.',
    ],
    tests: [
      {
        description: 'App renderar <header><span>⚛️ Academy</span></header>',
        code: '__render(<App />)',
        expected: '<header><span>⚛️ Academy</span></header>',
      },
    ],
    sourceChecks: [
      { description: 'App använder <Logo />', pattern: /<Logo\s*\/>/ },
    ],
  },
  {
    id: 'props-02',
    title: 'Skicka en prop',
    xp: 10,
    track: 'props',
    isBoss: false,
    description:
      'Props är det som skickas in i en komponent, som attribut på taggen: <Greeting name="Ada" />. Till vänster om = står propens namn, det som komponenten tar emot. Till höger står värdet. Komponenten nedan läser props.name.',
    task: 'Uppgift: Låt App returnera Greeting med propen name satt till "Ada".',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `function Greeting(props) {
  return <h1>Hej {props.name}!</h1>;
}

function App() {
  return <Greeting />;
}`,
    solution: `function Greeting(props) {
  return <h1>Hej {props.name}!</h1>;
}

function App() {
  return <Greeting name="Ada" />;
}`,
    hints: [
      'Greeting läser props.name, så propen måste heta name.',
      'Props skrivs som attribut: namn="värde".',
      'Skriv <Greeting name="Ada" />',
    ],
    tests: [
      {
        description: 'App renderar <h1>Hej Ada!</h1>',
        code: '__render(<App />)',
        expected: '<h1>Hej Ada!</h1>',
      },
    ],
    sourceChecks: [
      {
        description: 'App skickar name till Greeting',
        pattern: /<Greeting\s+name=/,
      },
    ],
  },
  {
    id: 'props-03',
    title: 'Ta emot props',
    xp: 10,
    track: 'props',
    isBoss: false,
    description:
      'En komponent får alla props i ett objekt, sitt första argument. <Greeting name="Ada" /> anropar Greeting med { name: "Ada" }. Därför läser man värdet med props.name.',
    task: 'Uppgift: Skriv komponenten Greeting med parametern props. Den ska returnera en h1 med "Hej Ada!", där namnet hämtas från props.name.',
    fileName: 'App.jsx',
    preview: '<Greeting name="Ada" />',
    starterCode: '// Skriv din kod här',
    solution: `function Greeting(props) {
  return <h1>Hej {props.name}!</h1>;
}`,
    hints: [
      'Börja med function Greeting(props) { }.',
      'Namnet finns i props.name.',
      'Returnera <h1>Hej {props.name}!</h1>',
    ],
    tests: [
      {
        description: '<Greeting name="Ada" /> renderar <h1>Hej Ada!</h1>',
        code: '__render(<Greeting name="Ada" />)',
        expected: '<h1>Hej Ada!</h1>',
      },
      {
        description: '<Greeting name="Linus" /> renderar <h1>Hej Linus!</h1>',
        code: '__render(<Greeting name="Linus" />)',
        expected: '<h1>Hej Linus!</h1>',
      },
    ],
  },
  {
    id: 'props-04',
    title: 'Destructuring av props',
    xp: 10,
    track: 'props',
    isBoss: false,
    description:
      'Oftast plockar man ut props direkt i parameterlistan med destructuring: function Badge({ label, count }). Då slipper man skriva props. framför varje namn. Det är samma destructuring som i Modern JS-banan.',
    task: 'Uppgift: Skriv komponenten Badge som tar emot label och count med destructuring. Den ska returnera en span med texten "Nya: 3" (label, kolon, count).',
    fileName: 'App.jsx',
    preview: '<Badge label="Nya" count={3} />',
    starterCode: '// Skriv din kod här',
    solution: `function Badge({ label, count }) {
  return (
    <span>
      {label}: {count}
    </span>
  );
}`,
    hints: [
      'Börja med function Badge({ label, count }) { }.',
      'label och count är vanliga variabler inuti funktionen.',
      'Returnera <span>{label}: {count}</span>',
    ],
    tests: [
      {
        description:
          '<Badge label="Nya" count={3} /> renderar <span>Nya: 3</span>',
        code: '__render(<Badge label="Nya" count={3} />)',
        expected: '<span>Nya: 3</span>',
      },
      {
        description:
          '<Badge label="Olästa" count={12} /> renderar <span>Olästa: 12</span>',
        code: '__render(<Badge label="Olästa" count={12} />)',
        expected: '<span>Olästa: 12</span>',
      },
    ],
    sourceChecks: [
      {
        description: 'Props plockas ut med ({ label, count })',
        pattern:
          /\(\s*\{\s*(label\s*,\s*count|count\s*,\s*label)\s*,?\s*\}\s*\)/,
      },
    ],
  },
  {
    id: 'props-05',
    title: 'Tal och booleans som props',
    xp: 10,
    track: 'props',
    isBoss: false,
    description:
      'Med citattecken blir en prop alltid text: amount="99" är strängen "99". Allt annat skickas inom { }: amount={99} är talet 99 och onSale={true} är en boolean. Skriver du bara onSale utan värde blir den också true.',
    task: 'Uppgift: Låt App returnera Price med amount satt till talet 99 och onSale satt till true.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `function Price({ amount, onSale }) {
  if (typeof amount !== 'number') {
    return <p>amount ska vara ett tal, inte text</p>;
  }
  return <p>{onSale ? 'REA ' : ''}{amount} kr</p>;
}

function App() {
  return <Price />;
}`,
    solution: `function Price({ amount, onSale }) {
  if (typeof amount !== 'number') {
    return <p>amount ska vara ett tal, inte text</p>;
  }
  return <p>{onSale ? 'REA ' : ''}{amount} kr</p>;
}

function App() {
  return <Price amount={99} onSale={true} />;
}`,
    hints: [
      'Talet 99 ska skickas utan citattecken.',
      'Värden som inte är text skrivs inom { }.',
      'Skriv <Price amount={99} onSale={true} />',
    ],
    tests: [
      {
        description: 'App renderar <p>REA 99 kr</p>',
        code: '__render(<App />)',
        expected: '<p>REA 99 kr</p>',
      },
    ],
  },
  {
    id: 'props-06',
    title: 'Standardvärden',
    xp: 10,
    track: 'props',
    isBoss: false,
    description:
      'Skickas inte en prop blir den undefined. Med ett standardvärde i destructuringen, { variant = "primary" }, får den ett värde ändå. Det är vanligt för props som oftast har samma värde.',
    task: 'Uppgift: Skriv komponenten Button med props label och variant, där variant har standardvärdet "primary". Returnera en button med label som text och variant som className.',
    fileName: 'App.jsx',
    preview:
      '<><Button label="Spara" /> <Button label="Ta bort" variant="danger" /></>',
    starterCode: '// Skriv din kod här',
    solution: `function Button({ label, variant = 'primary' }) {
  return <button className={variant}>{label}</button>;
}`,
    hints: [
      'Börja med function Button({ label, variant }) och lägg till standardvärdet.',
      "Standardvärdet skrivs variant = 'primary' i destructuringen.",
      'Returnera <button className={variant}>{label}</button>',
    ],
    tests: [
      {
        description: '<Button label="Spara" /> får klassen "primary"',
        code: '__render(<Button label="Spara" />)',
        expected: '<button class="primary">Spara</button>',
      },
      {
        description:
          '<Button label="Ta bort" variant="danger" /> får klassen "danger"',
        code: '__render(<Button label="Ta bort" variant="danger" />)',
        expected: '<button class="danger">Ta bort</button>',
      },
    ],
  },
  {
    id: 'props-07',
    title: 'children',
    xp: 10,
    track: 'props',
    isBoss: false,
    description:
      'Det du skriver mellan start- och sluttaggen skickas med som propen children: <Card title="Hej"><p>Text</p></Card>. På så sätt kan en komponent vara en ram runt vilket innehåll som helst.',
    task: 'Uppgift: Skriv komponenten Card med props title och children. Returnera en section med klassen "card", med en h2 med title och sedan children.',
    fileName: 'App.jsx',
    preview: '<Card title="Dagens tips"><p>Props flödar nedåt.</p></Card>',
    starterCode: '// Skriv din kod här',
    solution: `function Card({ title, children }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      {children}
    </section>
  );
}`,
    hints: [
      'Börja med function Card({ title, children }) { }.',
      'children används som vilket värde som helst: {children}.',
      'Lägg {children} efter h2:n inuti section.',
    ],
    tests: [
      {
        description: 'Card renderar title och children',
        code: '__render(<Card title="Hej"><p>Text</p></Card>)',
        expected: '<section class="card"><h2>Hej</h2><p>Text</p></section>',
      },
      {
        description: 'Card fungerar med annat innehåll',
        code: '__render(<Card title="Lista"><ul><li>A</li></ul></Card>)',
        expected:
          '<section class="card"><h2>Lista</h2><ul><li>A</li></ul></section>',
      },
    ],
  },
  {
    id: 'props-boss-01',
    title: 'Boss: Profilkort i delar',
    xp: 30,
    track: 'props',
    isBoss: true,
    description:
      'Dela upp ett profilkort i små komponenter som får allt de behöver via props.',
    task: `Uppgift: Skriv tre komponenter.
  Avatar({ src, name }): en img med src och alt satt till name.
  Card({ children }): en div med klassen "card" runt children.
  ProfileCard({ user, isOnline = false }):
    ett Card med Avatar (src från user.avatar, name från user.name),
    en h2 med user.name och en p med "Online" eller "Offline".
  ProfileCard ska använda Card och Avatar.`,
    fileName: 'App.jsx',
    preview:
      "<ProfileCard user={{ name: 'Ada', avatar: '/favicon.svg' }} isOnline />",
    starterCode: '// Skriv din kod här',
    solution: `function Avatar({ src, name }) {
  return <img src={src} alt={name} />;
}

function Card({ children }) {
  return <div className="card">{children}</div>;
}

function ProfileCard({ user, isOnline = false }) {
  return (
    <Card>
      <Avatar src={user.avatar} name={user.name} />
      <h2>{user.name}</h2>
      <p>{isOnline ? 'Online' : 'Offline'}</p>
    </Card>
  );
}`,
    hints: [],
    tests: [
      {
        description: 'Avatar renderar en img med src och alt',
        code: '/^<img(?=[^>]*\\bsrc="\\/a\\.png")(?=[^>]*\\balt="Ada")[^>]*>$/.test(__render(<Avatar src="/a.png" name="Ada" />))',
        expected: true,
      },
      {
        description: 'Card lägger children i <div class="card">',
        code: '__render(<Card><b>Hej</b></Card>)',
        expected: '<div class="card"><b>Hej</b></div>',
      },
      {
        description: 'ProfileCard visar bild, namn och "Online"',
        code: '/^<div class="card"><img(?=[^>]*\\bsrc="\\/l\\.png")(?=[^>]*\\balt="Linus")[^>]*><h2>Linus<\\/h2><p>Online<\\/p><\\/div>$/.test(__render(<ProfileCard user={{ name: \'Linus\', avatar: \'/l.png\' }} isOnline />))',
        expected: true,
      },
      {
        description: 'ProfileCard visar "Offline" när isOnline saknas',
        code: "__render(<ProfileCard user={{ name: 'Linus', avatar: '/l.png' }} />).endsWith('<h2>Linus</h2><p>Offline</p></div>')",
        expected: true,
      },
    ],
    sourceChecks: [
      { description: 'ProfileCard använder <Card>', pattern: /<Card\s*>/ },
      { description: 'ProfileCard använder <Avatar', pattern: /<Avatar\b/ },
      {
        description: 'isOnline har standardvärdet false',
        pattern: /isOnline\s*=\s*false/,
      },
    ],
  },
  {
    id: 'lists-01',
    title: 'Rendera en lista med map',
    xp: 10,
    track: 'lists',
    isBoss: false,
    description:
      'JSX kan visa en array av element. Därför gör man om data till element med map: fruits.map(fruit => <li>{fruit}</li>) ger ett li för varje frukt. Själva listan läggs inom { } i JSX:en.',
    task: 'Uppgift: Låt App returnera en ul med ett li för varje frukt i fruits. Använd map.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `const fruits = ['Äpple', 'Banan', 'Päron'];

function App() {
  return <ul></ul>;
}`,
    solution: `const fruits = ['Äpple', 'Banan', 'Päron'];

function App() {
  return (
    <ul>
      {fruits.map(fruit => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}`,
    hints: [
      'Skriv { } mellan <ul> och </ul>.',
      'Inuti klamrarna: fruits.map(fruit => …).',
      'Varje frukt blir <li>{fruit}</li>.',
    ],
    tests: [
      {
        description: 'App renderar en ul med tre li',
        code: '__render(<App />)',
        expected: '<ul><li>Äpple</li><li>Banan</li><li>Päron</li></ul>',
      },
      {
        description: 'Listan följer med när fruits ändras',
        code: "(fruits.push('Kiwi'), __render(<App />).endsWith('<li>Kiwi</li></ul>'))",
        expected: true,
      },
    ],
    sourceChecks: [
      { description: 'Listan skapas med map', pattern: /\.\s*map\s*\(/ },
    ],
  },
  {
    id: 'lists-02',
    title: 'key',
    xp: 10,
    track: 'lists',
    isBoss: false,
    description:
      'Varje element i en lista behöver en key, ett värde som är unikt inom listan. Med den kan React hålla reda på vilket element som är vilket när listan ändras. key skrivs som en prop: <li key={fruit}>. Den syns inte på sidan.',
    task: 'Uppgift: Ge varje li en key. Frukterna är unika, så fruit duger som key.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `const fruits = ['Äpple', 'Banan', 'Päron'];

function App() {
  return (
    <ul>
      {fruits.map(fruit => (
        <li>{fruit}</li>
      ))}
    </ul>
  );
}`,
    solution: `const fruits = ['Äpple', 'Banan', 'Päron'];

function App() {
  return (
    <ul>
      {fruits.map(fruit => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}`,
    hints: [
      'key skrivs som ett attribut på li.',
      'Värdet är en variabel, så det står inom { }.',
      'Skriv <li key={fruit}>',
    ],
    tests: [
      {
        description: 'App renderar fortfarande listan',
        code: '__render(<App />)',
        expected: '<ul><li>Äpple</li><li>Banan</li><li>Päron</li></ul>',
      },
      {
        description: 'Alla li har en unik key',
        code: '(__render(<App />), __keyProblems)',
        expected: [],
      },
    ],
  },
  {
    id: 'lists-03',
    title: 'key från id',
    xp: 10,
    track: 'lists',
    isBoss: false,
    description:
      'Är listan en array av objekt används oftast ett id som key: <li key={todo.id}>. Använd inte platsen i arrayen (index) som key. Tas ett element bort eller byter ordning flyttas index till fel element, och då kan React blanda ihop dem.',
    task: 'Uppgift: Låt App returnera en ul med ett li för varje todo. Visa todo.text och använd todo.id som key.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `const todos = [
  { id: 1, text: 'Handla' },
  { id: 2, text: 'Träna' },
  { id: 3, text: 'Plugga React' },
];

function App() {
  return <ul></ul>;
}`,
    solution: `const todos = [
  { id: 1, text: 'Handla' },
  { id: 2, text: 'Träna' },
  { id: 3, text: 'Plugga React' },
];

function App() {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`,
    hints: [
      'Börja med {todos.map(todo => …)} inuti ul.',
      'Texten finns i todo.text.',
      'Skriv <li key={todo.id}>{todo.text}</li>',
    ],
    tests: [
      {
        description: 'App renderar de tre uppgifterna',
        code: '__render(<App />)',
        expected: '<ul><li>Handla</li><li>Träna</li><li>Plugga React</li></ul>',
      },
      {
        description: 'Alla li har en unik key',
        code: '(__render(<App />), __keyProblems)',
        expected: [],
      },
    ],
    sourceChecks: [
      {
        description: 'key är todo.id',
        pattern: /key=\{\s*todo\s*\.\s*id\s*\}/,
      },
    ],
  },
  {
    id: 'lists-04',
    title: 'En lista av komponenter',
    xp: 10,
    track: 'lists',
    isBoss: false,
    description:
      'map kan lika gärna returnera dina egna komponenter: <TodoItem key={todo.id} text={todo.text} />. key sätts på komponenten i map, inte på li:n inuti TodoItem. Det är listan i map som behöver key, och TodoItem vet inte ens att den ligger i en lista.',
    task: 'Uppgift: Låt App returnera en ul med en TodoItem för varje todo. Skicka todo.text som propen text och använd todo.id som key.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `const todos = [
  { id: 1, text: 'Handla' },
  { id: 2, text: 'Träna' },
];

function TodoItem({ text }) {
  return <li>✅ {text}</li>;
}

function App() {
  return <ul></ul>;
}`,
    solution: `const todos = [
  { id: 1, text: 'Handla' },
  { id: 2, text: 'Träna' },
];

function TodoItem({ text }) {
  return <li>✅ {text}</li>;
}

function App() {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} text={todo.text} />
      ))}
    </ul>
  );
}`,
    hints: [
      'map ska returnera <TodoItem /> i stället för <li>.',
      'TodoItem behöver propen text={todo.text}.',
      'key={todo.id} skrivs på TodoItem.',
    ],
    tests: [
      {
        description: 'App renderar en TodoItem per uppgift',
        code: '__render(<App />)',
        expected: '<ul><li>✅ Handla</li><li>✅ Träna</li></ul>',
      },
      {
        description: 'Varje TodoItem har en unik key',
        code: '(__render(<App />), __keyProblems)',
        expected: [],
      },
    ],
    sourceChecks: [
      {
        description: 'map returnerar <TodoItem',
        pattern: /=>\s*\(?\s*<TodoItem\b/,
      },
      {
        description: 'key sitter på TodoItem',
        pattern: /<TodoItem[^>]*\bkey=\{\s*todo\s*\.\s*id\s*\}/,
      },
    ],
  },
  {
    id: 'lists-05',
    title: 'filter före map',
    xp: 10,
    track: 'lists',
    isBoss: false,
    description:
      'Vill du bara visa en del av listan filtrerar du först och renderar sedan: todos.filter(todo => !todo.done).map(…). Data ändras aldrig, du väljer bara vad som visas.',
    task: 'Uppgift: Låt App returnera en ul med bara de todos som inte är klara (done är false). Visa todo.text och använd todo.id som key.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `const todos = [
  { id: 1, text: 'Handla', done: true },
  { id: 2, text: 'Träna', done: false },
  { id: 3, text: 'Plugga React', done: false },
];

function App() {
  return <ul></ul>;
}`,
    solution: `const todos = [
  { id: 1, text: 'Handla', done: true },
  { id: 2, text: 'Träna', done: false },
  { id: 3, text: 'Plugga React', done: false },
];

function App() {
  return (
    <ul>
      {todos
        .filter(todo => !todo.done)
        .map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
    </ul>
  );
}`,
    hints: [
      'Börja med todos.filter(todo => !todo.done).',
      'Kedja på .map(…) direkt efter filter.',
      'map ger <li key={todo.id}>{todo.text}</li>.',
    ],
    tests: [
      {
        description: 'App visar bara Träna och Plugga React',
        code: '__render(<App />)',
        expected: '<ul><li>Träna</li><li>Plugga React</li></ul>',
      },
      {
        description: 'Alla li har en unik key',
        code: '(__render(<App />), __keyProblems)',
        expected: [],
      },
      {
        description: 'todos är oförändrad',
        code: 'todos.length',
        expected: 3,
      },
    ],
    sourceChecks: [
      {
        description: 'Listan filtreras med filter',
        pattern: /\.\s*filter\s*\(/,
      },
    ],
  },
  {
    id: 'lists-06',
    title: 'Numrera med index',
    xp: 10,
    track: 'lists',
    isBoss: false,
    description:
      'map skickar med platsen i arrayen som andra argument: players.map((player, index) => …). index passar bra för att visa en numrering, men key ska fortfarande vara player.id.',
    task: 'Uppgift: Låt App returnera en ol med ett li per spelare med texten "1. Ada", där talet är index + 1. Använd player.id som key.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `const players = [
  { id: 'a7', name: 'Ada' },
  { id: 'l3', name: 'Linus' },
  { id: 'g9', name: 'Grace' },
];

function App() {
  return <ol></ol>;
}`,
    solution: `const players = [
  { id: 'a7', name: 'Ada' },
  { id: 'l3', name: 'Linus' },
  { id: 'g9', name: 'Grace' },
];

function App() {
  return (
    <ol>
      {players.map((player, index) => (
        <li key={player.id}>
          {index + 1}. {player.name}
        </li>
      ))}
    </ol>
  );
}`,
    hints: [
      'map tar emot (player, index), med parenteser runt båda.',
      'Numret är {index + 1}.',
      'Skriv <li key={player.id}>{index + 1}. {player.name}</li>',
    ],
    tests: [
      {
        description: 'App renderar en numrerad lista',
        code: '__render(<App />)',
        expected: '<ol><li>1. Ada</li><li>2. Linus</li><li>3. Grace</li></ol>',
      },
      {
        description: 'Alla li har en unik key',
        code: '(__render(<App />), __keyProblems)',
        expected: [],
      },
    ],
    sourceChecks: [
      {
        description: 'key är player.id',
        pattern: /key=\{\s*player\s*\.\s*id\s*\}/,
      },
      {
        description: 'Numret räknas ut med index + 1',
        pattern: /index\s*\+\s*1/,
      },
    ],
  },
  {
    id: 'lists-boss-01',
    title: 'Boss: Produktlistan',
    xp: 30,
    track: 'lists',
    isBoss: true,
    description:
      'Kombinera komponenter, props, filter, map och key i en riktig produktlista.',
    task: `Uppgift: Skriv två komponenter.
  ProductRow({ name, price }): ett li med texten "Keps: 199 kr".
  ProductList({ products }): en section med
    en h2 med texten "2 i lager" (antalet produkter där inStock är true),
    och en ul med en ProductRow per produkt i lager.
  Använd filter och map, och product.id som key på ProductRow.`,
    fileName: 'App.jsx',
    preview: `<ProductList products={[
  { id: 1, name: 'Keps', price: 199, inStock: true },
  { id: 2, name: 'Mössa', price: 149, inStock: false },
  { id: 3, name: 'Halsduk', price: 299, inStock: true },
]} />`,
    starterCode: '// Skriv din kod här',
    solution: `function ProductRow({ name, price }) {
  return (
    <li>
      {name}: {price} kr
    </li>
  );
}

function ProductList({ products }) {
  const inStock = products.filter(product => product.inStock);
  return (
    <section>
      <h2>{inStock.length} i lager</h2>
      <ul>
        {inStock.map(product => (
          <ProductRow key={product.id} name={product.name} price={product.price} />
        ))}
      </ul>
    </section>
  );
}`,
    hints: [],
    tests: [
      {
        description: 'ProductRow renderar <li>Keps: 199 kr</li>',
        code: '__render(<ProductRow name="Keps" price={199} />)',
        expected: '<li>Keps: 199 kr</li>',
      },
      {
        description: 'ProductList visar bara produkter i lager',
        code: "__render(<ProductList products={[{ id: 1, name: 'Keps', price: 199, inStock: true }, { id: 2, name: 'Mössa', price: 149, inStock: false }, { id: 3, name: 'Halsduk', price: 299, inStock: true }]} />)",
        expected:
          '<section><h2>2 i lager</h2><ul><li>Keps: 199 kr</li><li>Halsduk: 299 kr</li></ul></section>',
      },
      {
        description: 'Rubriken räknar produkterna i lager',
        code: "__render(<ProductList products={[{ id: 7, name: 'Vante', price: 99, inStock: true }]} />).startsWith('<section><h2>1 i lager</h2>')",
        expected: true,
      },
      {
        description: 'Varje ProductRow har en unik key',
        code: "(__render(<ProductList products={[{ id: 1, name: 'A', price: 1, inStock: true }, { id: 2, name: 'B', price: 2, inStock: true }]} />), __keyProblems)",
        expected: [],
      },
    ],
    sourceChecks: [
      {
        description: 'Produkterna filtreras med filter',
        pattern: /\.\s*filter\s*\(/,
      },
      { description: 'Raderna skapas med map', pattern: /\.\s*map\s*\(/ },
      {
        description: 'map returnerar <ProductRow med key={product.id}',
        pattern: /<ProductRow[^>]*\bkey=\{\s*product\s*\.\s*id\s*\}/,
      },
    ],
  },
  {
    id: 'cond-01',
    title: 'Visa bara om: &&',
    xp: 10,
    track: 'conditionals',
    isBoss: false,
    description:
      'I JSX kan du inte skriva if, men du kan använda &&: {count > 0 && <p>…</p>}. Är villkoret sant visas elementet, annars visas ingenting. React visar inte false, null eller undefined.',
    task: 'Uppgift: Skriv komponenten Inbox({ count }). Den returnerar en div med en h2 "Inkorg" och, bara om count är större än 0, en p med "Du har 3 nya meddelanden" (med count i stället för 3).',
    fileName: 'App.jsx',
    preview: '<><Inbox count={3} /><Inbox count={0} /></>',
    starterCode: '// Skriv din kod här',
    solution: `function Inbox({ count }) {
  return (
    <div>
      <h2>Inkorg</h2>
      {count > 0 && <p>Du har {count} nya meddelanden</p>}
    </div>
  );
}`,
    hints: [
      'Börja med en div med <h2>Inkorg</h2> inuti.',
      'Efter h2:n: {count > 0 && …}.',
      'Efter && kommer <p>Du har {count} nya meddelanden</p>.',
    ],
    tests: [
      {
        description: '<Inbox count={3} /> visar meddelandet',
        code: '__render(<Inbox count={3} />)',
        expected: '<div><h2>Inkorg</h2><p>Du har 3 nya meddelanden</p></div>',
      },
      {
        description: '<Inbox count={0} /> visar bara rubriken',
        code: '__render(<Inbox count={0} />)',
        expected: '<div><h2>Inkorg</h2></div>',
      },
    ],
    sourceChecks: [{ description: 'Koden använder &&', pattern: /&&/ }],
  },
  {
    id: 'cond-02',
    title: 'Fallgropen 0 &&',
    xp: 10,
    track: 'conditionals',
    isBoss: false,
    description:
      'Se upp med {count && …}. Är count 0 blir hela uttrycket 0, och till skillnad från false visar React talet 0 på sidan. Gör därför villkoret till en riktig boolean: {count > 0 && …}.',
    task: 'Uppgift: Komponenten visar en ensam 0:a när count är 0. Rätta villkoret så att ingenting visas då.',
    fileName: 'App.jsx',
    preview: '<><Cart count={2} /><Cart count={0} /></>',
    starterCode: `function Cart({ count }) {
  return <div>🛒{count && <span> {count} varor</span>}</div>;
}`,
    solution: `function Cart({ count }) {
  return <div>🛒{count > 0 && <span> {count} varor</span>}</div>;
}`,
    hints: [
      'Problemet är villkoret före &&.',
      'count är ett tal, inte en boolean. Jämför det med något.',
      'Skriv {count > 0 && …}.',
    ],
    tests: [
      {
        description: '<Cart count={2} /> visar antalet',
        code: '__render(<Cart count={2} />)',
        expected: '<div>🛒<span> 2 varor</span></div>',
      },
      {
        description: '<Cart count={0} /> visar ingen 0:a',
        code: '__render(<Cart count={0} />)',
        expected: '<div>🛒</div>',
      },
    ],
  },
  {
    id: 'cond-03',
    title: 'Antingen eller: ? :',
    xp: 10,
    track: 'conditionals',
    isBoss: false,
    description:
      'Ska något av två alternativ visas använder du ? :. Det fungerar både för text och för element: {isLoggedIn ? "Logga ut" : "Logga in"}.',
    task: 'Uppgift: Skriv komponenten LoginButton({ isLoggedIn }) som returnerar en button med texten "Logga ut" om isLoggedIn är true och annars "Logga in".',
    fileName: 'App.jsx',
    preview:
      '<><LoginButton isLoggedIn={true} /> <LoginButton isLoggedIn={false} /></>',
    starterCode: '// Skriv din kod här',
    solution: `function LoginButton({ isLoggedIn }) {
  return <button>{isLoggedIn ? 'Logga ut' : 'Logga in'}</button>;
}`,
    hints: [
      'Returnera <button>{ }</button>.',
      'Inuti klamrarna: isLoggedIn ? … : ….',
      "Skriv {isLoggedIn ? 'Logga ut' : 'Logga in'}.",
    ],
    tests: [
      {
        description: 'Inloggad: "Logga ut"',
        code: '__render(<LoginButton isLoggedIn={true} />)',
        expected: '<button>Logga ut</button>',
      },
      {
        description: 'Utloggad: "Logga in"',
        code: '__render(<LoginButton isLoggedIn={false} />)',
        expected: '<button>Logga in</button>',
      },
    ],
    sourceChecks: [{ description: 'Koden använder ? :', pattern: /\?[^:]+:/ }],
  },
  {
    id: 'cond-04',
    title: 'Välj komponent',
    xp: 10,
    track: 'conditionals',
    isBoss: false,
    description:
      'Med ? : kan du välja mellan hela komponenter: {user ? <Welcome name={user.name} /> : <Login />}. Ett objekt räknas som sant och null som falskt, så du kan använda user direkt som villkor.',
    task: 'Uppgift: Skriv komponenten Page({ user }). Finns user ska den returnera Welcome med user.name som propen name. Annars returnerar den Login.',
    fileName: 'App.jsx',
    preview: "<><Page user={{ name: 'Ada' }} /><Page user={null} /></>",
    starterCode: `function Welcome({ name }) {
  return <h1>Välkommen, {name}!</h1>;
}

function Login() {
  return <button>Logga in</button>;
}
`,
    solution: `function Welcome({ name }) {
  return <h1>Välkommen, {name}!</h1>;
}

function Login() {
  return <button>Logga in</button>;
}

function Page({ user }) {
  return user ? <Welcome name={user.name} /> : <Login />;
}`,
    hints: [
      'Skriv function Page({ user }) under de andra komponenterna.',
      'Villkoret är bara user.',
      'Returnera user ? <Welcome name={user.name} /> : <Login />.',
    ],
    tests: [
      {
        description: 'Med user visas Welcome',
        code: "__render(<Page user={{ name: 'Ada' }} />)",
        expected: '<h1>Välkommen, Ada!</h1>',
      },
      {
        description: 'Utan user visas Login',
        code: '__render(<Page user={null} />)',
        expected: '<button>Logga in</button>',
      },
    ],
    sourceChecks: [
      { description: 'Page använder <Welcome', pattern: /<Welcome\b/ },
      { description: 'Page använder <Login', pattern: /<Login\s*\/>/ },
    ],
  },
  {
    id: 'cond-05',
    title: 'Tidig return',
    xp: 10,
    track: 'conditionals',
    isBoss: false,
    description:
      'Före return är komponenten vanlig JavaScript, så där kan du använda if. Ett vanligt mönster är att returnera tidigt: if (!user) return <p>Laddar…</p>; Resten av komponenten kan sedan räkna med att user finns.',
    task: 'Uppgift: Skriv komponenten Profile({ user }). Saknas user returneras <p>Laddar…</p> med en if. Annars returneras en h2 med user.name.',
    fileName: 'App.jsx',
    preview: "<><Profile user={{ name: 'Grace' }} /><Profile /></>",
    starterCode: '// Skriv din kod här',
    solution: `function Profile({ user }) {
  if (!user) {
    return <p>Laddar…</p>;
  }
  return <h2>{user.name}</h2>;
}`,
    hints: [
      'Börja funktionen med if (!user) { }.',
      'Inuti if: return <p>Laddar…</p>;',
      'Efter if: return <h2>{user.name}</h2>;',
    ],
    tests: [
      {
        description: 'Utan user visas "Laddar…"',
        code: '__render(<Profile />)',
        expected: '<p>Laddar…</p>',
      },
      {
        description: 'Med user visas namnet',
        code: "__render(<Profile user={{ name: 'Grace' }} />)",
        expected: '<h2>Grace</h2>',
      },
    ],
    sourceChecks: [{ description: 'Koden använder if', pattern: /\bif\s*\(/ }],
  },
  {
    id: 'cond-06',
    title: 'Returnera null',
    xp: 10,
    track: 'conditionals',
    isBoss: false,
    description:
      'En komponent som inte ska visa något returnerar null. Det är vanligt för till exempel varningar, som bara ska synas när det finns något att varna för.',
    task: 'Uppgift: Skriv komponenten Warning({ message }). Saknas message returneras null. Annars returneras en p med klassen "warning" och message som text.',
    fileName: 'App.jsx',
    preview: '<><Warning message="Lösenordet är för kort" /><Warning /></>',
    starterCode: '// Skriv din kod här',
    solution: `function Warning({ message }) {
  if (!message) return null;
  return <p className="warning">{message}</p>;
}`,
    hints: [
      'Börja med if (!message).',
      'Returnera null om message saknas.',
      'Annars: return <p className="warning">{message}</p>;',
    ],
    tests: [
      {
        description: 'Utan message renderas ingenting',
        code: '__render(<Warning />)',
        expected: '',
      },
      {
        description: 'Med message visas varningen',
        code: '__render(<Warning message="Fel lösenord" />)',
        expected: '<p class="warning">Fel lösenord</p>',
      },
      {
        description: 'Warning returnerar null, inte ett tomt element',
        code: 'Warning({})',
        expected: null,
      },
    ],
  },
  {
    id: 'cond-07',
    title: 'Tom lista',
    xp: 10,
    track: 'conditionals',
    isBoss: false,
    description:
      'En tom lista ger en tom ul, och det ser ut som att något är trasigt. Visa hellre ett meddelande när listan är tom: todos.length === 0 ? <p>…</p> : <ul>…</ul>.',
    task: 'Uppgift: Skriv komponenten TodoList({ todos }). Är todos tom returneras <p>Inga uppgifter</p>. Annars en ul med ett li per todo, med todo.text som text och todo.id som key.',
    fileName: 'App.jsx',
    preview:
      "<><TodoList todos={[{ id: 1, text: 'Handla' }]} /><TodoList todos={[]} /></>",
    starterCode: '// Skriv din kod här',
    solution: `function TodoList({ todos }) {
  return todos.length === 0 ? (
    <p>Inga uppgifter</p>
  ) : (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`,
    hints: [
      'Villkoret är todos.length === 0.',
      'Använd ? : eller en tidig return med if.',
      'Listan är samma map som i Listor-banan.',
    ],
    tests: [
      {
        description: 'Tom lista: "Inga uppgifter"',
        code: '__render(<TodoList todos={[]} />)',
        expected: '<p>Inga uppgifter</p>',
      },
      {
        description: 'Med uppgifter visas listan',
        code: "__render(<TodoList todos={[{ id: 1, text: 'Handla' }, { id: 2, text: 'Träna' }]} />)",
        expected: '<ul><li>Handla</li><li>Träna</li></ul>',
      },
      {
        description: 'Alla li har en unik key',
        code: "(__render(<TodoList todos={[{ id: 1, text: 'A' }, { id: 2, text: 'B' }]} />), __keyProblems)",
        expected: [],
      },
    ],
  },
  {
    id: 'cond-08',
    title: 'Villkorlig className',
    xp: 10,
    track: 'conditionals',
    isBoss: false,
    description:
      'Villkor fungerar i props också. Ett vanligt exempel är att byta klass beroende på data: className={done ? "todo done" : "todo"}. Då kan CSS:en till exempel stryka över klara uppgifter.',
    task: 'Uppgift: Skriv komponenten TodoItem({ text, done }). Den returnerar ett li med text. Klassen är "todo done" om done är true och annars "todo".',
    fileName: 'App.jsx',
    preview: `<ul>
  <style>{'.done { text-decoration: line-through; color: gray; }'}</style>
  <TodoItem text="Handla" done={true} />
  <TodoItem text="Träna" done={false} />
</ul>`,
    starterCode: '// Skriv din kod här',
    solution: `function TodoItem({ text, done }) {
  return <li className={done ? 'todo done' : 'todo'}>{text}</li>;
}`,
    hints: [
      'className får ett värde inom { }.',
      'Inuti klamrarna: done ? … : ….',
      "Skriv className={done ? 'todo done' : 'todo'}.",
    ],
    tests: [
      {
        description: 'Klar uppgift får klassen "todo done"',
        code: '__render(<TodoItem text="Handla" done={true} />)',
        expected: '<li class="todo done">Handla</li>',
      },
      {
        description: 'Oklar uppgift får klassen "todo"',
        code: '__render(<TodoItem text="Träna" done={false} />)',
        expected: '<li class="todo">Träna</li>',
      },
    ],
  },
  {
    id: 'cond-boss-01',
    title: 'Boss: Orderstatus',
    xp: 30,
    track: 'conditionals',
    isBoss: true,
    description:
      'Använd alla sätt att visa saker villkorligt: tidig return, ? :, && och tomma listor. Akta dig för 0 &&.',
    task: `Uppgift: Skriv komponenten OrderSummary({ order }).
  Saknas order: returnera <p>Ingen order vald</p>.
  Annars en section med, i den här ordningen:
    en h2 med "Order 42" (order.id i stället för 42),
    <p>Betald</p> om order.isPaid är true, annars <p>Ej betald</p>,
    <p>Ordern är tom</p> om order.items är tom,
      annars en ul med ett li per item (item.name, key item.id),
    <p>Rabatt: 50 kr</p> bara om order.discount är större än 0.`,
    fileName: 'App.jsx',
    preview: `<OrderSummary order={{
  id: 42,
  isPaid: true,
  discount: 50,
  items: [{ id: 1, name: 'Keps' }, { id: 2, name: 'Halsduk' }],
}} />`,
    starterCode: '// Skriv din kod här',
    solution: `function OrderSummary({ order }) {
  if (!order) return <p>Ingen order vald</p>;

  return (
    <section>
      <h2>Order {order.id}</h2>
      {order.isPaid ? <p>Betald</p> : <p>Ej betald</p>}
      {order.items.length === 0 ? (
        <p>Ordern är tom</p>
      ) : (
        <ul>
          {order.items.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
      {order.discount > 0 && <p>Rabatt: {order.discount} kr</p>}
    </section>
  );
}`,
    hints: [],
    tests: [
      {
        description: 'Utan order: "Ingen order vald"',
        code: '__render(<OrderSummary />)',
        expected: '<p>Ingen order vald</p>',
      },
      {
        description: 'Betald order med varor och rabatt',
        code: "__render(<OrderSummary order={{ id: 42, isPaid: true, discount: 50, items: [{ id: 1, name: 'Keps' }, { id: 2, name: 'Halsduk' }] }} />)",
        expected:
          '<section><h2>Order 42</h2><p>Betald</p><ul><li>Keps</li><li>Halsduk</li></ul><p>Rabatt: 50 kr</p></section>',
      },
      {
        description: 'Obetald, tom order utan rabatt visar ingen 0:a',
        code: '__render(<OrderSummary order={{ id: 7, isPaid: false, discount: 0, items: [] }} />)',
        expected:
          '<section><h2>Order 7</h2><p>Ej betald</p><p>Ordern är tom</p></section>',
      },
      {
        description: 'Alla li har en unik key',
        code: "(__render(<OrderSummary order={{ id: 1, isPaid: true, discount: 0, items: [{ id: 1, name: 'A' }, { id: 2, name: 'B' }] }} />), __keyProblems)",
        expected: [],
      },
    ],
  },
  {
    id: 'state-01',
    title: 'Händelser: onClick',
    xp: 10,
    track: 'state',
    isBoss: false,
    description:
      'Med onClick talar du om vilken funktion som ska köras när någon klickar. Skicka funktionen, anropa den inte: onClick={onLike} är rätt. onClick={onLike()} anropar funktionen direkt när komponenten ritas, och sedan händer ingenting vid klick.',
    task: 'Uppgift: Skriv komponenten LikeButton({ onLike }) som returnerar en button med texten "Gilla". onLike ska anropas när man klickar.',
    fileName: 'App.jsx',
    preview: '<LikeButton onLike={() => {}} />',
    starterCode: '// Skriv din kod här',
    solution: `function LikeButton({ onLike }) {
  return <button onClick={onLike}>Gilla</button>;
}`,
    hints: [
      'Returnera <button>Gilla</button>.',
      'Lägg till onClick på knappen.',
      'Skriv onClick={onLike} utan parenteser efter onLike.',
    ],
    tests: [
      {
        description: 'onLike anropas inte förrän man klickar',
        code: '(() => { let clicks = 0; __mount(<LikeButton onLike={() => clicks++} />); return clicks; })()',
        expected: 0,
      },
      {
        description: 'Ett klick anropar onLike en gång',
        code: "(() => { let clicks = 0; __mount(<LikeButton onLike={() => clicks++} />).click('Gilla'); return clicks; })()",
        expected: 1,
      },
      {
        description: 'Tre klick anropar onLike tre gånger',
        code: "(() => { let clicks = 0; __mount(<LikeButton onLike={() => clicks++} />).click('Gilla').click('Gilla').click('Gilla'); return clicks; })()",
        expected: 3,
      },
    ],
  },
  {
    id: 'state-02',
    title: 'useState',
    xp: 10,
    track: 'state',
    isBoss: false,
    description:
      'En vanlig variabel glöms bort varje gång komponenten ritas om, och React vet inte att den ändrats. För värden som ändras använder du state: const [count, setCount] = useState(0). count är värdet just nu och setCount(…) sparar ett nytt värde och ritar om komponenten. useState importeras från react.',
    task: 'Uppgift: Skriv komponenten Counter. Den har state count som börjar på 0, visar count i en p och har en button "+1" som ökar count med 1.',
    fileName: 'App.jsx',
    preview: '<Counter />',
    starterCode: `import { useState } from 'react';

`,
    solution: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}`,
    hints: [
      'Första raden i Counter: const [count, setCount] = useState(0);',
      'Visa värdet med <p>{count}</p>.',
      'Knappen: <button onClick={() => setCount(count + 1)}>+1</button>',
    ],
    tests: [
      {
        description: 'count börjar på 0',
        code: "__mount(<Counter />).text('p')",
        expected: '0',
      },
      {
        description: 'Ett klick på "+1" ger 1',
        code: "__mount(<Counter />).click('+1').text('p')",
        expected: '1',
      },
      {
        description: 'Tre klick ger 3',
        code: "__mount(<Counter />).click('+1').click('+1').click('+1').text('p')",
        expected: '3',
      },
    ],
    sourceChecks: [
      {
        description: 'Counter använder useState',
        pattern: /useState\s*\(\s*0\s*\)/,
      },
    ],
  },
  {
    id: 'state-03',
    title: 'Flera knappar, samma state',
    xp: 10,
    track: 'state',
    isBoss: false,
    description:
      'Flera knappar kan ändra samma state på olika sätt. Varje knapp får en egen liten funktion: onClick={() => setCount(count - 1)}. Pilfunktionen behövs eftersom setCount ska anropas med ett värde först när man klickar.',
    task: 'Uppgift: Bygg ut Counter med tre knappar: "-1" minskar count, "+1" ökar count och "Nollställ" sätter count till 0.',
    fileName: 'App.jsx',
    preview: '<Counter />',
    starterCode: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}`,
    solution: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(0)}>Nollställ</button>
    </div>
  );
}`,
    hints: [
      'Kopiera knappen "+1" och ändra den till "-1".',
      '"-1" anropar setCount(count - 1).',
      '"Nollställ" anropar setCount(0).',
    ],
    tests: [
      {
        description: '"-1" minskar count',
        code: "__mount(<Counter />).click('-1').click('-1').text('p')",
        expected: '-2',
      },
      {
        description: '"+1" ökar fortfarande count',
        code: "__mount(<Counter />).click('+1').text('p')",
        expected: '1',
      },
      {
        description: '"Nollställ" sätter count till 0',
        code: "__mount(<Counter />).click('+1').click('+1').click('Nollställ').text('p')",
        expected: '0',
      },
    ],
  },
  {
    id: 'state-04',
    title: 'Växla en boolean',
    xp: 10,
    track: 'state',
    isBoss: false,
    description:
      'State kan vara vilken typ av värde som helst. En boolean passar för saker som är på eller av. setIsOn(!isOn) byter till motsatt värde.',
    task: 'Uppgift: Skriv komponenten Lamp med state isOn som börjar på false. En p visar "Lampan är tänd" eller "Lampan är släckt", och en button "Växla" byter isOn.',
    fileName: 'App.jsx',
    preview: '<Lamp />',
    starterCode: `import { useState } from 'react';

`,
    solution: `import { useState } from 'react';

function Lamp() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <p>{isOn ? 'Lampan är tänd' : 'Lampan är släckt'}</p>
      <button onClick={() => setIsOn(!isOn)}>Växla</button>
    </div>
  );
}`,
    hints: [
      'Börja med const [isOn, setIsOn] = useState(false);',
      "Texten väljs med isOn ? 'Lampan är tänd' : 'Lampan är släckt'.",
      'Knappen anropar setIsOn(!isOn).',
    ],
    tests: [
      {
        description: 'Lampan börjar släckt',
        code: "__mount(<Lamp />).text('p')",
        expected: 'Lampan är släckt',
      },
      {
        description: 'Ett klick tänder lampan',
        code: "__mount(<Lamp />).click('Växla').text('p')",
        expected: 'Lampan är tänd',
      },
      {
        description: 'Två klick släcker den igen',
        code: "__mount(<Lamp />).click('Växla').click('Växla').text('p')",
        expected: 'Lampan är släckt',
      },
    ],
  },
  {
    id: 'state-05',
    title: 'Kontrollerat textfält',
    xp: 10,
    track: 'state',
    isBoss: false,
    description:
      'Ett textfält kopplas till state på två sätt: value={name} visar värdet från state och onChange={event => setName(event.target.value)} sparar det man skriver. Då är state alltid det som står i fältet. Det kallas ett kontrollerat fält.',
    task: 'Uppgift: Skriv komponenten NameForm med state name som börjar som "". Den har ett kontrollerat input och en p med texten "Hej Ada!" (med name i stället för Ada).',
    fileName: 'App.jsx',
    preview: '<NameForm />',
    starterCode: `import { useState } from 'react';

`,
    solution: `import { useState } from 'react';

function NameForm() {
  const [name, setName] = useState('');

  return (
    <div>
      <input value={name} onChange={event => setName(event.target.value)} />
      <p>Hej {name}!</p>
    </div>
  );
}`,
    hints: [
      "Börja med const [name, setName] = useState('');",
      'input behöver både value={name} och onChange.',
      'onChange={event => setName(event.target.value)}',
    ],
    tests: [
      {
        description: 'Det man skriver visas i p',
        code: "__mount(<NameForm />).type('Ada').text('p')",
        expected: 'Hej Ada!',
      },
      {
        description: 'input visar värdet från state',
        code: "__mount(<NameForm />).type('Linus').html().includes('value=\"Linus\"')",
        expected: true,
      },
    ],
    sourceChecks: [
      {
        description: 'input har value={name}',
        pattern: /value=\{\s*name\s*\}/,
      },
      {
        description: 'Värdet läses från event.target.value',
        pattern: /\.\s*target\s*\.\s*value/,
      },
    ],
  },
  {
    id: 'state-06',
    title: 'Lägg till i en lista',
    xp: 10,
    track: 'state',
    isBoss: false,
    description:
      'State får aldrig ändras direkt. todos.push(…) ändrar arrayen men React märker inget. Skapa i stället en ny array med spread: setTodos([...todos, newTodo]). Det är därför spread var så viktigt i Modern JS-banan.',
    task: `Uppgift: Bygg klart TodoApp.
  "Lägg till" lägger till { id: crypto.randomUUID(), text } sist i todos
  och tömmer sedan fältet. Använd spread, inte push.`,
    fileName: 'App.jsx',
    preview: '<TodoApp />',
    starterCode: `import { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  function handleAdd() {
    // Din kod här
  }

  return (
    <div>
      <input value={text} onChange={event => setText(event.target.value)} />
      <button onClick={handleAdd}>Lägg till</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}`,
    solution: `import { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  function handleAdd() {
    setTodos([...todos, { id: crypto.randomUUID(), text }]);
    setText('');
  }

  return (
    <div>
      <input value={text} onChange={event => setText(event.target.value)} />
      <button onClick={handleAdd}>Lägg till</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}`,
    hints: [
      'Allt sker i handleAdd.',
      'Skapa den nya arrayen med [...todos, { id: crypto.randomUUID(), text }].',
      "Anropa setTodos med den nya arrayen och sedan setText('').",
    ],
    tests: [
      {
        description: 'En uppgift läggs till',
        code: "__mount(<TodoApp />).type('Handla').click('Lägg till').text('ul')",
        expected: 'Handla',
      },
      {
        description: 'Två uppgifter hamnar i rätt ordning',
        code: "__mount(<TodoApp />).type('Handla').click('Lägg till').type('Träna').click('Lägg till').html().includes('<ul><li>Handla</li><li>Träna</li></ul>')",
        expected: true,
      },
      {
        description: 'Fältet töms efter "Lägg till"',
        code: "__mount(<TodoApp />).type('Handla').click('Lägg till').html().includes('<input value=\"\"/>')",
        expected: true,
      },
      {
        description: 'Alla li har en unik key',
        code: "(__mount(<TodoApp />).type('A').click('Lägg till').type('B').click('Lägg till'), __keyProblems)",
        expected: [],
      },
    ],
    sourceChecks: [
      {
        description: 'Den nya arrayen skapas med spread',
        pattern: /\[\s*\.\.\.\s*\w+/,
      },
      {
        description: 'Koden använder inte push',
        pattern: /\.\s*push\s*\(/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'state-07',
    title: 'Ta bort ur en lista',
    xp: 10,
    track: 'state',
    isBoss: false,
    description:
      'Att ta bort görs också med en ny array, oftast med filter: setTodos(todos.filter(todo => todo.id !== id)). Alla utom den med rätt id blir kvar.',
    task: 'Uppgift: Varje uppgift har en knapp "Ta bort". Skriv klart handleRemove(id) så att uppgiften med det id:t försvinner.',
    fileName: 'App.jsx',
    preview: '<TodoList />',
    starterCode: `import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Handla' },
    { id: 2, text: 'Träna' },
    { id: 3, text: 'Plugga React' },
  ]);

  function handleRemove(id) {
    // Din kod här
  }

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text} <button onClick={() => handleRemove(todo.id)}>Ta bort</button>
        </li>
      ))}
    </ul>
  );
}`,
    solution: `import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Handla' },
    { id: 2, text: 'Träna' },
    { id: 3, text: 'Plugga React' },
  ]);

  function handleRemove(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text} <button onClick={() => handleRemove(todo.id)}>Ta bort</button>
        </li>
      ))}
    </ul>
  );
}`,
    hints: [
      'Använd filter för att skapa en ny array.',
      'Behåll alla todos där todo.id !== id.',
      'Skriv setTodos(todos.filter(todo => todo.id !== id));',
    ],
    tests: [
      {
        description: 'Första uppgiften tas bort',
        code: "__mount(<TodoList />).click('Ta bort').count('li')",
        expected: 2,
      },
      {
        description: 'Rätt uppgift försvinner',
        code: "__mount(<TodoList />).click('Ta bort').text('li').startsWith('Träna')",
        expected: true,
      },
      {
        description: 'Alla kan tas bort',
        code: "__mount(<TodoList />).click('Ta bort').click('Ta bort').click('Ta bort').count('li')",
        expected: 0,
      },
    ],
    sourceChecks: [
      { description: 'Koden använder filter', pattern: /\.\s*filter\s*\(/ },
      {
        description: 'Koden använder inte splice',
        pattern: /\.\s*splice\s*\(/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'state-08',
    title: 'Uppdatera ett objekt',
    xp: 10,
    track: 'state',
    isBoss: false,
    description:
      'Samma regel gäller objekt: ändra aldrig user.age direkt. Skapa en kopia med spread och skriv över det som ändras: setUser({ ...user, age: user.age + 1 }).',
    task: 'Uppgift: Knappen "Fyll år" ska öka user.age med 1. Skriv klart handleBirthday med spread.',
    fileName: 'App.jsx',
    preview: '<Profile />',
    starterCode: `import { useState } from 'react';

function Profile() {
  const [user, setUser] = useState({ name: 'Ada', age: 36 });

  function handleBirthday() {
    // Din kod här
  }

  return (
    <div>
      <p>
        {user.name}, {user.age} år
      </p>
      <button onClick={handleBirthday}>Fyll år</button>
    </div>
  );
}`,
    solution: `import { useState } from 'react';

function Profile() {
  const [user, setUser] = useState({ name: 'Ada', age: 36 });

  function handleBirthday() {
    setUser({ ...user, age: user.age + 1 });
  }

  return (
    <div>
      <p>
        {user.name}, {user.age} år
      </p>
      <button onClick={handleBirthday}>Fyll år</button>
    </div>
  );
}`,
    hints: [
      'Skapa ett nytt objekt med { ...user }.',
      'Skriv över age efter spread: age: user.age + 1.',
      'Skriv setUser({ ...user, age: user.age + 1 });',
    ],
    tests: [
      {
        description: 'Ett klick ger 37 år',
        code: "__mount(<Profile />).click('Fyll år').text('p')",
        expected: 'Ada, 37 år',
      },
      {
        description: 'Två klick ger 38 år',
        code: "__mount(<Profile />).click('Fyll år').click('Fyll år').text('p')",
        expected: 'Ada, 38 år',
      },
    ],
    sourceChecks: [
      {
        description: 'Det nya objektet skapas med { ...user }',
        pattern: /\{\s*\.\.\.\s*user\b/,
      },
      {
        description: 'user ändras inte direkt',
        pattern: /user\s*\.\s*age\s*(\+\+|\+=|=[^=])/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'state-09',
    title: 'Formulär med onSubmit',
    xp: 10,
    track: 'state',
    isBoss: false,
    description:
      'Ett formulär skickas när man trycker Enter eller på en submit-knapp. Lyssna med onSubmit på form. Webbläsaren laddar annars om sidan, så börja alltid med event.preventDefault().',
    task: 'Uppgift: Skriv klart handleSubmit. Det ska stoppa omladdningen och spara name i submitted, så att texten "Tack, Ada!" visas.',
    fileName: 'App.jsx',
    preview: '<SignupForm />',
    starterCode: `import { useState } from 'react';

function SignupForm() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState('');

  function handleSubmit(event) {
    // Din kod här
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={event => setName(event.target.value)} />
      <button type="submit">Skicka</button>
      {submitted && <p>Tack, {submitted}!</p>}
    </form>
  );
}`,
    solution: `import { useState } from 'react';

function SignupForm() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={event => setName(event.target.value)} />
      <button type="submit">Skicka</button>
      {submitted && <p>Tack, {submitted}!</p>}
    </form>
  );
}`,
    hints: [
      'Första raden i handleSubmit: event.preventDefault();',
      'Spara sedan det som står i fältet.',
      'Skriv setSubmitted(name);',
    ],
    tests: [
      {
        description: 'Formuläret stoppar omladdningen',
        code: "__mount(<SignupForm />).type('Ada').submit()",
        expected: true,
      },
      {
        description: 'Efter skickat visas "Tack, Ada!"',
        code: "(() => { const app = __mount(<SignupForm />); app.type('Ada'); app.submit(); return app.text('p'); })()",
        expected: 'Tack, Ada!',
      },
      {
        description: 'Inget tack visas innan formuläret skickats',
        code: "__mount(<SignupForm />).type('Ada').count('p')",
        expected: 0,
      },
    ],
  },
  {
    id: 'state-boss-01',
    title: 'Boss: Todo-appen',
    xp: 30,
    track: 'state',
    isBoss: true,
    description:
      'Bygg en hel todo-app med state, formulär, kontrollerade fält, listor och villkor. Ändra aldrig state direkt.',
    task: `Uppgift: Skriv komponenten TodoApp.
  Ett form med ett input och en button "Lägg till".
    Vid submit: stoppa omladdningen, lägg till { id, text, done: false }
    och töm fältet. Tom text (efter trim) läggs inte till.
  En ul med ett li per todo (key todo.id) som innehåller:
    en checkbox (input type="checkbox") som växlar done,
    texten i en span, och en button "Ta bort".
  En p med "2 kvar": antalet todos som inte är klara.`,
    fileName: 'App.jsx',
    preview: '<TodoApp />',
    starterCode: `import { useState } from 'react';

`,
    solution: `import { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (text.trim() === '') return;
    setTodos([...todos, { id: crypto.randomUUID(), text, done: false }]);
    setText('');
  }

  function toggle(id) {
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    );
  }

  function remove(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const left = todos.filter(todo => !todo.done).length;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={event => setText(event.target.value)} />
        <button type="submit">Lägg till</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggle(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => remove(todo.id)}>Ta bort</button>
          </li>
        ))}
      </ul>
      <p>{left} kvar</p>
    </div>
  );
}`,
    hints: [],
    tests: [
      {
        description: 'Två uppgifter läggs till och fältet töms',
        code: "(() => { const app = __mount(<TodoApp />); app.type('Handla'); app.submit(); app.type('Träna'); app.submit(); return [app.count('li'), app.text('p'), app.html().includes('<input value=\"\"/>')]; })()",
        expected: [2, '2 kvar', true],
      },
      {
        description: 'submit stoppar omladdningen',
        code: "__mount(<TodoApp />).type('Handla').submit()",
        expected: true,
      },
      {
        description: 'Tom text läggs inte till',
        code: "(() => { const app = __mount(<TodoApp />); app.type('   '); app.submit(); return app.count('li'); })()",
        expected: 0,
      },
      {
        description: 'Checkboxen markerar en uppgift som klar',
        code: "(() => { const app = __mount(<TodoApp />); app.type('Handla'); app.submit(); app.type('Träna'); app.submit(); app.check(1); return app.text('p'); })()",
        expected: '1 kvar',
      },
      {
        description: '"Ta bort" tar bort den första uppgiften',
        code: "(() => { const app = __mount(<TodoApp />); app.type('Handla'); app.submit(); app.type('Träna'); app.submit(); app.click('Ta bort'); return [app.count('li'), app.text('span')]; })()",
        expected: [1, 'Träna'],
      },
      {
        description: 'Alla li har en unik key',
        code: "(() => { const app = __mount(<TodoApp />); app.type('A'); app.submit(); app.type('B'); app.submit(); return __keyProblems; })()",
        expected: [],
      },
    ],
    sourceChecks: [
      {
        description: 'Koden använder inte push',
        pattern: /\.\s*push\s*\(/,
        forbidden: true,
      },
      {
        description: 'Koden använder inte splice',
        pattern: /\.\s*splice\s*\(/,
        forbidden: true,
      },
    ],
  },
];
