import { isConst, isLet } from './lesson';

// Miniprojekt som låses upp när en bana är klar. Eleven väljer ett av
// tre, men kan göra alla. Varje projekt byggs i steg, och koden från
// förra steget följer med till nästa. Uppgifterna säger vad koden ska
// göra men mindre om exakt hur, så testerna kollar mest resultatet.
// reward: priset man får till samlingen när projektet är klart.
export const projects = [
  {
    id: 'proj-checkout',
    track: 'js-basics',
    title: 'Kassaapparaten',
    reward: { emoji: '🛒', name: 'Kundvagn' },
    summary: 'Räkna ihop varorna, ge rabatt och skriv ut kvittot.',
    steps: [
      {
        title: 'Varorna',
        xp: 15,
        description:
          'Du bygger kassan i en affär. Först behöver kassan veta vad varorna kostar och ha en summa som börjar på noll.',
        task: `Uppgift:
  1. Skapa tre konstanter med priserna: \`bread\` 35, \`cheese\` 89 och \`coffee\` 96.
  2. Skapa \`total\` med let och startvärdet 0. Den ska ändras i nästa steg.`,
        starterCode: '// Steg 1: priserna och summan\n',
        solution: `const bread = 35;
const cheese = 89;
const coffee = 96;

let total = 0;`,
        hints: [
          'Priserna ändras inte, så de skapas med const.',
          'Summan ska kunna ändras senare, så den skapas med let.',
          'Till exempel: const bread = 35; och let total = 0;',
        ],
        tests: [
          { description: 'bread är 35', code: 'bread', expected: 35 },
          { description: 'cheese är 89', code: 'cheese', expected: 89 },
          { description: 'coffee är 96', code: 'coffee', expected: 96 },
          isConst('bread'),
          isConst('cheese'),
          isConst('coffee'),
          { description: 'total är 0', code: 'total', expected: 0 },
          isLet('total'),
        ],
      },
      {
        title: 'Lägg i korgen',
        xp: 15,
        description:
          'Kunden lägger en av varje vara i korgen. Kassan ska räkna ut summan själv från priserna, så att den blir rätt även när ett pris ändras.',
        task: 'Uppgift: Lägg till alla tre priserna i `total`. Använd variablerna, inte talen.',
        hints: [
          'Du kan öka total på samma sätt som score = score + 5.',
          'Antingen en rad per vara, eller allt på en gång.',
          'total = total + bread + cheese + coffee;',
        ],
        solution: `const bread = 35;
const cheese = 89;
const coffee = 96;

let total = 0;
total = total + bread + cheese + coffee;`,
        tests: [{ description: 'total är 220', code: 'total', expected: 220 }],
        sourceChecks: [
          {
            description: 'total räknas ut från variablerna',
            pattern: /total\s*\+?=[^;]*\b(bread|cheese|coffee)\b/,
          },
          {
            description: 'total skrivs inte in som 220 för hand',
            pattern: /total\s*=\s*220\b/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Rabatten',
        xp: 15,
        description:
          'Affären har ett erbjudande: handlar man för minst 200 kr får man 10 % rabatt. 10 % av ett belopp är beloppet delat med 10.',
        task: `Uppgift:
  1. Skapa \`hasDiscount\` med let och värdet false.
  2. Om total är minst 200 ska du dra av 10 % från total och sätta hasDiscount till true.`,
        hints: [
          '"Minst 200" skrivs total >= 200.',
          'Dra av rabatten med total = total - total / 10;',
          'Inuti if: total = total - total / 10; och hasDiscount = true;',
        ],
        solution: `const bread = 35;
const cheese = 89;
const coffee = 96;

let total = 0;
total = total + bread + cheese + coffee;

let hasDiscount = false;
if (total >= 200) {
  total = total - total / 10;
  hasDiscount = true;
}`,
        tests: [
          { description: 'total är 198 efter rabatten', code: 'total', expected: 198 },
          { description: 'hasDiscount är true', code: 'hasDiscount', expected: true },
          isLet('hasDiscount'),
        ],
        sourceChecks: [
          { description: 'Rabatten ges med if', pattern: /\bif\s*\(/ },
          {
            description: 'total skrivs inte in som 198 för hand',
            pattern: /total\s*=\s*198\b/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Kvittot',
        xp: 25,
        description:
          'Sist skriver kassan ut kvittot. Kunden ska se vad hen ska betala, och få veta om rabatten räknades in.',
        task: `Uppgift:
  1. Skriv ut texten "Att betala:" och total med console.log.
  2. Om hasDiscount är true ska du också skriva ut "Du fick 10 % rabatt!". Annars skriver du ut "Ingen rabatt den här gången.".`,
        hints: [
          'Text och variabel med komma emellan: console.log(\'Att betala:\', total);',
          'Du kan skriva if (hasDiscount) i stället för if (hasDiscount === true).',
          'Använd if och else med en console.log i varje del.',
        ],
        solution: `const bread = 35;
const cheese = 89;
const coffee = 96;

let total = 0;
total = total + bread + cheese + coffee;

let hasDiscount = false;
if (total >= 200) {
  total = total - total / 10;
  hasDiscount = true;
}

console.log('Att betala:', total);
if (hasDiscount) {
  console.log('Du fick 10 % rabatt!');
} else {
  console.log('Ingen rabatt den här gången.');
}`,
        tests: [
          {
            description: 'Konsolen visar "Att betala: 198" och "Du fick 10 % rabatt!"',
            code: '__logs',
            expected: ['Att betala: 198', 'Du fick 10 % rabatt!'],
          },
        ],
        sourceChecks: [
          {
            description: 'Totalen hämtas från variabeln total',
            pattern: /console\s*\.\s*log\s*\([^)]*,\s*total\s*\)/,
          },
          { description: 'Rabatttexten väljs med if och else', pattern: /\belse\b/ },
        ],
      },
    ],
  },
  {
    id: 'proj-thermostat',
    track: 'js-basics',
    title: 'Termostaten',
    reward: { emoji: '🧣', name: 'Halsduk' },
    summary: 'Läs av temperaturen, värm upp rummet och kolla om det blev lagom.',
    steps: [
      {
        title: 'Läs av temperaturen',
        xp: 15,
        description:
          'Du programmerar en termostat. Den läser av temperaturen och säger om det är för kallt, för varmt eller lagom. Lagom är från 18 till och med 24 grader.',
        task: `Uppgift:
  1. Skapa \`temp\` med let och värdet 14.
  2. Skriv ut "För kallt" om temp är under 18, "För varmt" om temp är över 24 och annars "Lagom". Använd if, else if och else.`,
        starterCode: '// Steg 1: läs av temperaturen\n',
        hints: [
          'Under 18 skrivs temp < 18 och över 24 skrivs temp > 24.',
          'else if kommer mellan if och else och har ett eget villkor.',
          "if (temp < 18) { console.log('För kallt'); } else if (temp > 24) { ... } else { ... }",
        ],
        solution: `let temp = 14;

if (temp < 18) {
  console.log('För kallt');
} else if (temp > 24) {
  console.log('För varmt');
} else {
  console.log('Lagom');
}`,
        tests: [
          { description: 'temp är 14', code: 'temp', expected: 14 },
          isLet('temp'),
          { description: 'Konsolen visar "För kallt"', code: '__logs', expected: ['För kallt'] },
        ],
        sourceChecks: [
          { description: 'Texten väljs med else if', pattern: /\belse\s+if\s*\(/ },
          { description: 'Det finns ett else för "Lagom"', pattern: /\belse\s*\{/ },
        ],
      },
      {
        title: 'Värm upp',
        xp: 15,
        description:
          'Termostaten sätter på elementet. Varje minut blir rummet 2 grader varmare, och elementet är på i 3 minuter.',
        task: 'Uppgift: Efter koden du har, skriv en for-loop som går 3 varv. Varje varv ökar temp med 2 och skriver ut "Temp:" och temp.',
        hints: [
          'En loop med 3 varv: for (let i = 0; i < 3; i++) { ... }',
          'Inuti loopen: öka temp först, skriv sedan ut den.',
          "temp = temp + 2; och sedan console.log('Temp:', temp);",
        ],
        solution: `let temp = 14;

if (temp < 18) {
  console.log('För kallt');
} else if (temp > 24) {
  console.log('För varmt');
} else {
  console.log('Lagom');
}

for (let i = 0; i < 3; i++) {
  temp = temp + 2;
  console.log('Temp:', temp);
}`,
        tests: [
          { description: 'temp är 20 efter uppvärmningen', code: 'temp', expected: 20 },
          {
            description: 'Konsolen visar "För kallt" och sedan varje ny temperatur',
            code: '__logs',
            expected: ['För kallt', 'Temp: 16', 'Temp: 18', 'Temp: 20'],
          },
        ],
        sourceChecks: [
          { description: 'Uppvärmningen sker i en for-loop', pattern: /\bfor\s*\(/ },
          {
            description: 'temp skrivs inte in som 20 för hand',
            pattern: /temp\s*=\s*20\b/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Blev det lagom?',
        xp: 25,
        description:
          'Nu ska termostaten kolla om det räckte. Termostaten bara värmer, så det räcker att kolla att temp är minst 18.',
        task: `Uppgift:
  1. Skapa konstanten \`isDone\` som är resultatet av jämförelsen temp >= 18.
  2. Om isDone är true skriver du ut "Klart, stänger av elementet". Annars skriver du ut "Fortsätter värma".`,
        hints: [
          'En jämförelse ger true eller false, och det kan sparas i en variabel.',
          'const isDone = temp >= 18;',
          'if (isDone) { ... } else { ... } med en console.log i varje del.',
        ],
        solution: `let temp = 14;

if (temp < 18) {
  console.log('För kallt');
} else if (temp > 24) {
  console.log('För varmt');
} else {
  console.log('Lagom');
}

for (let i = 0; i < 3; i++) {
  temp = temp + 2;
  console.log('Temp:', temp);
}

const isDone = temp >= 18;
if (isDone) {
  console.log('Klart, stänger av elementet');
} else {
  console.log('Fortsätter värma');
}`,
        tests: [
          { description: 'isDone är true', code: 'isDone', expected: true },
          isConst('isDone'),
          {
            description: 'Konsolen slutar med "Klart, stänger av elementet"',
            code: '__logs.at(-1)',
            expected: 'Klart, stänger av elementet',
          },
        ],
        sourceChecks: [
          {
            description: 'isDone räknas ut med en jämförelse',
            pattern: /isDone\s*=\s*temp\s*>=\s*18/,
          },
          { description: 'Meddelandet väljs med if och else', pattern: /\bif\s*\(\s*isDone\b/ },
        ],
      },
    ],
  },
  {
    id: 'proj-workout',
    track: 'js-basics',
    title: 'Träningsloggen',
    reward: { emoji: '👟', name: 'Löparskor' },
    summary: 'Summera en veckas träning och se om du nådde målet.',
    steps: [
      {
        title: 'Veckans minuter',
        xp: 15,
        description:
          'Du tränar varje dag i en vecka. Första dagen tränar du 20 minuter, och sedan 5 minuter mer för varje dag. Dag 1 blir 20, dag 2 blir 25 och så vidare. Dagens minuter kan räknas ut som 15 + day * 5.',
        task: `Uppgift:
  1. Skapa \`totalMinutes\` med let och värdet 0.
  2. Skriv en for-loop med \`day\` som går från 1 till och med 7.
  3. Räkna ut dagens minuter i loopen och lägg till dem i totalMinutes.`,
        starterCode: '// Steg 1: summera veckans träning\n',
        hints: [
          'Till och med 7 skrivs day <= 7.',
          'Inuti loopen: const minutes = 15 + day * 5;',
          'totalMinutes = totalMinutes + minutes;',
        ],
        solution: `let totalMinutes = 0;

for (let day = 1; day <= 7; day++) {
  const minutes = 15 + day * 5;
  totalMinutes = totalMinutes + minutes;
}`,
        tests: [
          { description: 'totalMinutes är 245', code: 'totalMinutes', expected: 245 },
          isLet('totalMinutes'),
        ],
        sourceChecks: [
          { description: 'Minuterna summeras i en for-loop', pattern: /\bfor\s*\(/ },
          {
            description: 'totalMinutes skrivs inte in som 245 för hand',
            pattern: /totalMinutes\s*=\s*245\b/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Långa pass',
        xp: 15,
        description:
          'Ett pass som är längre än 30 minuter räknas som ett långt pass. Hur många sådana hade du i veckan?',
        task: 'Uppgift: Skapa `longDays` med let och värdet 0 före loopen. Öka longDays med 1 inuti loopen de dagar då minuterna är fler än 30.',
        hints: [
          'longDays måste skapas före loopen, annars börjar den om på 0 varje varv.',
          'Fler än 30 skrivs minutes > 30.',
          'if (minutes > 30) { longDays = longDays + 1; }',
        ],
        solution: `let totalMinutes = 0;
let longDays = 0;

for (let day = 1; day <= 7; day++) {
  const minutes = 15 + day * 5;
  totalMinutes = totalMinutes + minutes;
  if (minutes > 30) {
    longDays = longDays + 1;
  }
}`,
        tests: [
          { description: 'longDays är 4', code: 'longDays', expected: 4 },
          isLet('longDays'),
          { description: 'totalMinutes är fortfarande 245', code: 'totalMinutes', expected: 245 },
        ],
        sourceChecks: [
          { description: 'De långa passen räknas med if', pattern: /\bif\s*\(/ },
          {
            description: 'longDays skrivs inte in som 4 för hand',
            pattern: /longDays\s*=\s*4\b/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Nådde du målet?',
        xp: 25,
        description:
          'Målet är att träna minst 150 minuter i veckan. Avsluta med en sammanfattning av veckan.',
        task: `Uppgift:
  1. Skapa konstanten \`goalReached\` som är resultatet av jämförelsen totalMinutes >= 150.
  2. Skriv ut "Minuter:" och totalMinutes, och sedan "Långa pass:" och longDays.
  3. Skriv sist ut "Målet är nått!" om goalReached är true, annars "Fortsätt kämpa!".`,
        hints: [
          'Gör det här efter loopen, när allt är summerat.',
          'const goalReached = totalMinutes >= 150;',
          "console.log('Minuter:', totalMinutes); och sedan if (goalReached) { ... } else { ... }",
        ],
        solution: `let totalMinutes = 0;
let longDays = 0;

for (let day = 1; day <= 7; day++) {
  const minutes = 15 + day * 5;
  totalMinutes = totalMinutes + minutes;
  if (minutes > 30) {
    longDays = longDays + 1;
  }
}

const goalReached = totalMinutes >= 150;
console.log('Minuter:', totalMinutes);
console.log('Långa pass:', longDays);
if (goalReached) {
  console.log('Målet är nått!');
} else {
  console.log('Fortsätt kämpa!');
}`,
        tests: [
          { description: 'goalReached är true', code: 'goalReached', expected: true },
          isConst('goalReached'),
          {
            description: 'Konsolen visar sammanfattningen',
            code: '__logs',
            expected: ['Minuter: 245', 'Långa pass: 4', 'Målet är nått!'],
          },
        ],
        sourceChecks: [
          {
            description: 'goalReached räknas ut med en jämförelse',
            pattern: /goalReached\s*=\s*totalMinutes\s*>=\s*150/,
          },
          { description: 'Slutorden väljs med if och else', pattern: /\belse\b/ },
        ],
      },
    ],
  },
];

// Stegen som vanliga övningar, så att samma editor och rättning kan
// användas. Ett steg utan egen startkod börjar med förra stegets lösning.
export const projectSteps = projects.flatMap(project =>
  project.steps.map((step, index) => ({
    ...step,
    id: `${project.id}-${index + 1}`,
    title: `${project.title}: ${step.title}`,
    track: project.track,
    project: project.id,
    stepNumber: index + 1,
    isBoss: false,
    starterCode:
      step.starterCode ??
      `${project.steps[index - 1].solution}\n\n// Steg ${index + 1}: ${step.title.toLowerCase()}\n`,
  })),
);

// Projekt som är klara: alla steg är klara.
export function isProjectComplete(project, completedIds) {
  return project.steps.every((_, index) =>
    completedIds.includes(`${project.id}-${index + 1}`),
  );
}
