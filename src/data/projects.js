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
          {
            description: 'total är 198 efter rabatten',
            code: 'total',
            expected: 198,
          },
          {
            description: 'hasDiscount är true',
            code: 'hasDiscount',
            expected: true,
          },
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
          "Text och variabel med komma emellan: console.log('Att betala:', total);",
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
            description:
              'Konsolen visar "Att betala: 198" och "Du fick 10 % rabatt!"',
            code: '__logs',
            expected: ['Att betala: 198', 'Du fick 10 % rabatt!'],
          },
        ],
        sourceChecks: [
          {
            description: 'Totalen hämtas från variabeln total',
            pattern: /console\s*\.\s*log\s*\([^)]*,\s*total\s*\)/,
          },
          {
            description: 'Rabatttexten väljs med if och else',
            pattern: /\belse\b/,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-thermostat',
    track: 'js-basics',
    title: 'Termostaten',
    reward: { emoji: '🧣', name: 'Halsduk' },
    summary:
      'Läs av temperaturen, värm upp rummet och kolla om det blev lagom.',
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
          {
            description: 'Konsolen visar "För kallt"',
            code: '__logs',
            expected: ['För kallt'],
          },
        ],
        sourceChecks: [
          {
            description: 'Texten väljs med else if',
            pattern: /\belse\s+if\s*\(/,
          },
          {
            description: 'Det finns ett else för "Lagom"',
            pattern: /\belse\s*\{/,
          },
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
          {
            description: 'temp är 20 efter uppvärmningen',
            code: 'temp',
            expected: 20,
          },
          {
            description:
              'Konsolen visar "För kallt" och sedan varje ny temperatur',
            code: '__logs',
            expected: ['För kallt', 'Temp: 16', 'Temp: 18', 'Temp: 20'],
          },
        ],
        sourceChecks: [
          {
            description: 'Uppvärmningen sker i en for-loop',
            pattern: /\bfor\s*\(/,
          },
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
          {
            description: 'Meddelandet väljs med if och else',
            pattern: /\bif\s*\(\s*isDone\b/,
          },
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
          {
            description: 'totalMinutes är 245',
            code: 'totalMinutes',
            expected: 245,
          },
          isLet('totalMinutes'),
        ],
        sourceChecks: [
          {
            description: 'Minuterna summeras i en for-loop',
            pattern: /\bfor\s*\(/,
          },
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
          {
            description: 'totalMinutes är fortfarande 245',
            code: 'totalMinutes',
            expected: 245,
          },
        ],
        sourceChecks: [
          {
            description: 'De långa passen räknas med if',
            pattern: /\bif\s*\(/,
          },
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
          {
            description: 'goalReached är true',
            code: 'goalReached',
            expected: true,
          },
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
          {
            description: 'Slutorden väljs med if och else',
            pattern: /\belse\b/,
          },
        ],
      },
    ],
  },
  // Från och med Arrays & Objects säger uppgifterna mest vad som ska
  // bli resultatet, och ledtrådarna pekar åt rätt håll utan färdig kod.
  {
    id: 'proj-packing',
    track: 'arrays',
    title: 'Packlistan',
    reward: { emoji: '🧳', name: 'Resväska' },
    summary: 'Packa inför resan, skriv ut listan och kolla att passet är med.',
    steps: [
      {
        title: 'Packa väskan',
        xp: 20,
        description:
          'Du ska ut och resa och gör en packlista i kod. Några saker har du redan skrivit upp, och sedan kommer du på två till.',
        task: `Uppgift:
  1. Skapa konstanten \`packList\` med "tandborste", "laddare" och "bok".
  2. Lägg till "solkräm" och sedan "badbyxor" sist i listan, utan att ändra raden där listan skapas.`,
        starterCode: '// Steg 1: packa väskan\n',
        hints: [
          'En array kan ändras med push även om den är skapad med const.',
          'Varje push lägger till ett värde sist.',
        ],
        solution: `const packList = ['tandborste', 'laddare', 'bok'];
packList.push('solkräm');
packList.push('badbyxor');`,
        tests: [
          {
            description: 'packList har de fem sakerna i rätt ordning',
            code: 'packList',
            expected: ['tandborste', 'laddare', 'bok', 'solkräm', 'badbyxor'],
          },
          isConst('packList'),
        ],
        sourceChecks: [
          {
            description: 'De två nya sakerna läggs till med push',
            pattern: /\.push\s*\([^]*\.push\s*\(/,
          },
        ],
      },
      {
        title: 'Skriv ut listan',
        xp: 20,
        description:
          'Nu vill du se hela listan, med nummer framför varje sak. Koden ska fungera hur lång listan än är, så du kan inte skriva en console.log per sak.',
        task: `Uppgift:
  1. Skriv ut varje sak på en egen rad med nummer framför: "1. tandborste", "2. laddare" och så vidare.
  2. Skriv sist ut "Antal saker:" och hur många saker listan har.`,
        hints: [
          'En for-loop kan gå från 0 till packList.length, och packList[i] är saken i varvet.',
          'Numret är ett mer än i. console.log skriver ut flera värden med mellanslag emellan, så punkten kan sitta ihop med numret som text.',
        ],
        solution: `const packList = ['tandborste', 'laddare', 'bok'];
packList.push('solkräm');
packList.push('badbyxor');

for (let i = 0; i < packList.length; i++) {
  console.log(i + 1 + '.', packList[i]);
}
console.log('Antal saker:', packList.length);`,
        tests: [
          {
            description: 'Konsolen visar listan med nummer och sedan antalet',
            code: '__logs',
            expected: [
              '1. tandborste',
              '2. laddare',
              '3. bok',
              '4. solkräm',
              '5. badbyxor',
              'Antal saker: 5',
            ],
          },
        ],
        sourceChecks: [
          {
            description: 'Listan skrivs ut i en for-loop',
            pattern: /\bfor\s*\(/,
          },
          { description: 'Antalet hämtas med .length', pattern: /\.length\b/ },
          {
            description: 'Raderna skrivs inte ut en och en för hand',
            pattern: /['"]2\./,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Har du passet?',
        xp: 30,
        description:
          'Det värsta som kan hända är att glömma passet. Koden ska själv leta igenom listan, så att den fungerar även när du ändrar i listan.',
        task: `Uppgift:
  1. Skapa \`hasPassport\` med let. Den ska bli true om "pass" finns i packList och annars false. Leta med en loop.
  2. Skriv sist ut "Passet är packat." om passet finns, annars "Glöm inte passet!".`,
        hints: [
          'Börja med att anta att passet saknas, och ändra om du hittar det.',
          'Jämför varje sak i loopen med "pass" med ===.',
        ],
        solution: `const packList = ['tandborste', 'laddare', 'bok'];
packList.push('solkräm');
packList.push('badbyxor');

for (let i = 0; i < packList.length; i++) {
  console.log(i + 1 + '.', packList[i]);
}
console.log('Antal saker:', packList.length);

let hasPassport = false;
for (let i = 0; i < packList.length; i++) {
  if (packList[i] === 'pass') {
    hasPassport = true;
  }
}

if (hasPassport) {
  console.log('Passet är packat.');
} else {
  console.log('Glöm inte passet!');
}`,
        tests: [
          {
            description: 'hasPassport är false',
            code: 'hasPassport',
            expected: false,
          },
          isLet('hasPassport'),
          {
            description: 'Konsolen slutar med "Glöm inte passet!"',
            code: '__logs.at(-1)',
            expected: 'Glöm inte passet!',
          },
        ],
        sourceChecks: [
          {
            description: 'Koden letar efter "pass" med ===',
            pattern: /===\s*['"]pass['"]|['"]pass['"]\s*===/,
          },
          {
            description: 'Meddelandet väljs med if och else',
            pattern: /\belse\b/,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-playlist',
    track: 'arrays',
    title: 'Spellistan',
    reward: { emoji: '📻', name: 'Radio' },
    summary:
      'Lägg till din egen låt, räkna ut speltiden och hitta den längsta.',
    steps: [
      {
        title: 'Din låt',
        xp: 20,
        description:
          'Spellistan är en array med låtar. Varje låt är ett objekt med title, artist och seconds, alltså låtens längd i sekunder. Nu ska din favoritlåt in.',
        task: 'Uppgift: Lägg till en låt du gillar sist i `songs`. Den ska ha samma tre egenskaper som de andra låtarna. Ändra inte de tre låtarna som redan finns.',
        starterCode: `const songs = [
  { title: 'Dancing Queen', artist: 'ABBA', seconds: 231 },
  { title: 'Levitating', artist: 'Dua Lipa', seconds: 203 },
  { title: 'Bohemian Rhapsody', artist: 'Queen', seconds: 355 },
];

// Steg 1: lägg till din låt
`,
        hints: [
          'push fungerar för objekt precis som för text och tal.',
          "Ett objekt skrivs med { } och egenskaper som title: '...', med komma emellan.",
        ],
        solution: `const songs = [
  { title: 'Dancing Queen', artist: 'ABBA', seconds: 231 },
  { title: 'Levitating', artist: 'Dua Lipa', seconds: 203 },
  { title: 'Bohemian Rhapsody', artist: 'Queen', seconds: 355 },
];

songs.push({ title: 'Hey Jude', artist: 'The Beatles', seconds: 431 });`,
        tests: [
          {
            description: 'songs har fyra låtar',
            code: 'songs.length',
            expected: 4,
          },
          {
            description: 'De tre första låtarna är kvar',
            code: 'songs.slice(0, 3).map(song => song.title)',
            expected: ['Dancing Queen', 'Levitating', 'Bohemian Rhapsody'],
          },
          {
            description: 'Din låt har en title och en artist som är text',
            code: "typeof songs[3]?.title === 'string' && typeof songs[3]?.artist === 'string'",
            expected: true,
          },
          {
            description: 'Din låt har seconds som ett tal större än 0',
            code: "typeof songs[3]?.seconds === 'number' && songs[3].seconds > 0",
            expected: true,
          },
        ],
        sourceChecks: [
          {
            description: 'Låten läggs till med push',
            pattern: /songs\s*\.\s*push\s*\(/,
          },
        ],
      },
      {
        title: 'Hur länge spelar den?',
        xp: 20,
        description:
          'Hur lång tid tar hela spellistan? Summera sekunderna och gör om dem till minuter och sekunder. Två nya verktyg: Math.floor(x) avrundar nedåt till ett heltal, och x % 60 ger det som blir över när x delas med 60.',
        task: `Uppgift:
  1. Skapa \`totalSeconds\` med let och summera alla låtars seconds i den med en loop.
  2. Skriv ut speltiden så här: "Speltid: 20 min 20 s", fast med rätt tal för din spellista.`,
        hints: [
          'songs[i].seconds är längden på låten i varvet.',
          'Hela minuter är Math.floor(totalSeconds / 60). console.log kan få flera värden: text, tal, text och så vidare.',
        ],
        solution: `const songs = [
  { title: 'Dancing Queen', artist: 'ABBA', seconds: 231 },
  { title: 'Levitating', artist: 'Dua Lipa', seconds: 203 },
  { title: 'Bohemian Rhapsody', artist: 'Queen', seconds: 355 },
];

songs.push({ title: 'Hey Jude', artist: 'The Beatles', seconds: 431 });

let totalSeconds = 0;
for (let i = 0; i < songs.length; i++) {
  totalSeconds = totalSeconds + songs[i].seconds;
}

const minutes = Math.floor(totalSeconds / 60);
const rest = totalSeconds % 60;
console.log('Speltid:', minutes, 'min', rest, 's');`,
        tests: [
          {
            description: 'totalSeconds är summan av alla låtars sekunder',
            code: 'totalSeconds === songs.reduce((sum, song) => sum + song.seconds, 0)',
            expected: true,
          },
          isLet('totalSeconds'),
          {
            description: 'Konsolen visar speltiden i minuter och sekunder',
            code: "(() => { const t = songs.reduce((sum, song) => sum + song.seconds, 0); return __logs.at(-1) === 'Speltid: ' + Math.floor(t / 60) + ' min ' + (t % 60) + ' s'; })()",
            expected: true,
          },
        ],
        sourceChecks: [
          {
            description: 'Sekunderna summeras i en for-loop',
            pattern: /\bfor\s*\(/,
          },
        ],
      },
      {
        title: 'Den längsta låten',
        xp: 30,
        description:
          'Vilken låt i spellistan är längst? Koden ska hitta den själv, så att svaret blir rätt vilken låt du än lade till.',
        task: `Uppgift:
  1. Skapa \`longest\` med let. Efter din kod ska den vara objektet för den längsta låten.
  2. Skriv sist ut till exempel "Längst: Hey Jude av The Beatles".`,
        hints: [
          'Börja med att anta att första låten är längst, och byt när du hittar en som är längre.',
          'Jämför songs[i].seconds med longest.seconds.',
        ],
        solution: `const songs = [
  { title: 'Dancing Queen', artist: 'ABBA', seconds: 231 },
  { title: 'Levitating', artist: 'Dua Lipa', seconds: 203 },
  { title: 'Bohemian Rhapsody', artist: 'Queen', seconds: 355 },
];

songs.push({ title: 'Hey Jude', artist: 'The Beatles', seconds: 431 });

let totalSeconds = 0;
for (let i = 0; i < songs.length; i++) {
  totalSeconds = totalSeconds + songs[i].seconds;
}

const minutes = Math.floor(totalSeconds / 60);
const rest = totalSeconds % 60;
console.log('Speltid:', minutes, 'min', rest, 's');

let longest = songs[0];
for (let i = 1; i < songs.length; i++) {
  if (songs[i].seconds > longest.seconds) {
    longest = songs[i];
  }
}
console.log('Längst:', longest.title, 'av', longest.artist);`,
        tests: [
          {
            description: 'longest är den längsta låten',
            code: 'longest === songs.reduce((max, song) => (song.seconds > max.seconds ? song : max))',
            expected: true,
          },
          isLet('longest'),
          {
            description: 'Konsolen slutar med den längsta låten och artisten',
            code: "__logs.at(-1) === 'Längst: ' + longest?.title + ' av ' + longest?.artist",
            expected: true,
          },
        ],
        sourceChecks: [
          {
            description: 'Låtarnas längder jämförs med if',
            pattern: /\bif\s*\(/,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-leaderboard',
    track: 'arrays',
    title: 'Topplistan',
    reward: { emoji: '🏆', name: 'Pokal' },
    summary:
      'Ställ upp dig själv i tävlingen, räkna snittet och kora vinnaren.',
    steps: [
      {
        title: 'Ställ upp',
        xp: 20,
        description:
          'Fyra spelare har redan tävlat, och nu är det din tur. Varje spelare är ett objekt med name och score.',
        task: 'Uppgift: Lägg till dig själv sist i `players`, med ditt namn och ett score mellan 0 och 100. Ändra inte de andra spelarna.',
        starterCode: `const players = [
  { name: 'Ada', score: 42 },
  { name: 'Linus', score: 35 },
  { name: 'Grace', score: 51 },
  { name: 'Alan', score: 28 },
];

// Steg 1: ställ upp i tävlingen
`,
        hints: [
          'Samma sätt som när du lade till saker i en array, fast med ett objekt.',
          'Objektet behöver egenskaperna name och score.',
        ],
        solution: `const players = [
  { name: 'Ada', score: 42 },
  { name: 'Linus', score: 35 },
  { name: 'Grace', score: 51 },
  { name: 'Alan', score: 28 },
];

players.push({ name: 'Kim', score: 47 });`,
        tests: [
          {
            description: 'players har fem spelare',
            code: 'players.length',
            expected: 5,
          },
          {
            description: 'De fyra första spelarna är kvar',
            code: 'players.slice(0, 4).map(player => player.score)',
            expected: [42, 35, 51, 28],
          },
          {
            description: 'Du har ett name som är text',
            code: "typeof players[4]?.name === 'string' && players[4].name.length > 0",
            expected: true,
          },
          {
            description: 'Ditt score är ett tal mellan 0 och 100',
            code: "typeof players[4]?.score === 'number' && players[4].score >= 0 && players[4].score <= 100",
            expected: true,
          },
        ],
        sourceChecks: [
          {
            description: 'Du läggs till med push',
            pattern: /players\s*\.\s*push\s*\(/,
          },
        ],
      },
      {
        title: 'Snittet',
        xp: 20,
        description:
          'Hur bra gick det i snitt? Snittet är summan av alla poäng delat med antalet spelare.',
        task: `Uppgift:
  1. Skapa konstanten \`average\` med snittpoängen för alla spelare. Räkna ut summan med en loop.
  2. Skriv ut "Snitt:" och snittet.`,
        hints: [
          'Du behöver en summa som börjar på 0 och växer i loopen.',
          'Antalet spelare får du med .length.',
        ],
        solution: `const players = [
  { name: 'Ada', score: 42 },
  { name: 'Linus', score: 35 },
  { name: 'Grace', score: 51 },
  { name: 'Alan', score: 28 },
];

players.push({ name: 'Kim', score: 47 });

let total = 0;
for (let i = 0; i < players.length; i++) {
  total = total + players[i].score;
}
const average = total / players.length;
console.log('Snitt:', average);`,
        tests: [
          {
            description: 'average är snittet av alla spelares poäng',
            code: 'average === players.reduce((sum, player) => sum + player.score, 0) / players.length',
            expected: true,
          },
          isConst('average'),
          {
            description: 'Konsolen visar snittet',
            code: "__logs.at(-1) === 'Snitt: ' + average",
            expected: true,
          },
        ],
        sourceChecks: [
          {
            description: 'Poängen summeras i en for-loop',
            pattern: /\bfor\s*\(/,
          },
          {
            description: 'Antalet spelare hämtas med .length',
            pattern: /\.length\b/,
          },
        ],
      },
      {
        title: 'Vinnaren',
        xp: 30,
        description:
          'Dags för prisutdelning. Vem vann, och hur många spelade bättre än snittet?',
        task: `Uppgift:
  1. Skapa \`winner\` med let. Efter din kod ska den vara objektet för spelaren med högst score. Blir det lika vinner den som står först.
  2. Skapa \`aboveAverage\` med let: antalet spelare med mer poäng än snittet.
  3. Skriv ut "Vinnare:" och vinnarens namn, och sist "Över snittet:" och antalet.`,
        hints: [
          'Båda kan räknas ut i samma loop, eller i var sin.',
          'För att den som står först ska vinna vid lika poäng byter du bara vinnare när någon har mer, inte lika mycket.',
        ],
        solution: `const players = [
  { name: 'Ada', score: 42 },
  { name: 'Linus', score: 35 },
  { name: 'Grace', score: 51 },
  { name: 'Alan', score: 28 },
];

players.push({ name: 'Kim', score: 47 });

let total = 0;
for (let i = 0; i < players.length; i++) {
  total = total + players[i].score;
}
const average = total / players.length;
console.log('Snitt:', average);

let winner = players[0];
let aboveAverage = 0;
for (let i = 0; i < players.length; i++) {
  if (players[i].score > winner.score) {
    winner = players[i];
  }
  if (players[i].score > average) {
    aboveAverage = aboveAverage + 1;
  }
}
console.log('Vinnare:', winner.name);
console.log('Över snittet:', aboveAverage);`,
        tests: [
          {
            description: 'winner är spelaren med högst score',
            code: 'winner === players.reduce((best, player) => (player.score > best.score ? player : best))',
            expected: true,
          },
          isLet('winner'),
          {
            description: 'aboveAverage är antalet spelare över snittet',
            code: 'aboveAverage === players.filter(player => player.score > average).length',
            expected: true,
          },
          isLet('aboveAverage'),
          {
            description:
              'Konsolen slutar med vinnaren och antalet över snittet',
            code: "__logs.slice(-2).join('|') === 'Vinnare: ' + winner?.name + '|Över snittet: ' + aboveAverage",
            expected: true,
          },
        ],
        sourceChecks: [
          { description: 'Poängen jämförs med if', pattern: /\bif\s*\(/ },
        ],
      },
    ],
  },
  // Från och med Functions säger uppgiften bara vad funktionerna ska
  // göra. Testerna anropar dem med många olika värden, så det spelar
  // ingen roll hur de är skrivna.
  {
    id: 'proj-change',
    track: 'functions',
    title: 'Växelautomaten',
    reward: { emoji: '🐷', name: 'Spargris' },
    summary: 'Räkna ut växel med så få mynt som möjligt.',
    steps: [
      {
        title: 'Hur många mynt?',
        xp: 25,
        description:
          'Du bygger en automat som ger växel i mynt på 20, 10, 5 och 1 kr. Först behöver den veta hur många hela mynt av en sort som ryms i ett belopp. Math.floor(x) avrundar ett tal nedåt.',
        task: 'Uppgift: Skriv funktionen `coinsOf(amount, coin)` som returnerar hur många hela mynt värda coin som ryms i amount. coinsOf(37, 10) ger 3 och coinsOf(9, 10) ger 0.',
        starterCode: '// Steg 1: hur många mynt ryms?\n',
        hints: [
          'Dela beloppet med myntets värde. Vad gör du med decimalerna?',
          'Det är bara hela mynt som räknas, så svaret avrundas alltid nedåt.',
        ],
        solution: `function coinsOf(amount, coin) {
  return Math.floor(amount / coin);
}`,
        tests: [
          {
            description: 'coinsOf(37, 10) ger 3',
            code: 'coinsOf(37, 10)',
            expected: 3,
          },
          {
            description: 'coinsOf(9, 10) ger 0',
            code: 'coinsOf(9, 10)',
            expected: 0,
          },
          {
            description: 'coinsOf(40, 20) ger 2',
            code: 'coinsOf(40, 20)',
            expected: 2,
          },
          {
            description: 'coinsOf(7, 1) ger 7',
            code: 'coinsOf(7, 1)',
            expected: 7,
          },
        ],
      },
      {
        title: 'Växla',
        xp: 25,
        description:
          'Nu ska automaten dela upp ett helt belopp i mynt. Den tar alltid så många stora mynt som möjligt först, så att det blir så få mynt som möjligt. Det som blir över efter en sort går vidare till nästa.',
        task: 'Uppgift: Skriv funktionen `makeChange(amount)` som returnerar ett objekt med egenskaperna twenties, tens, fives och ones. makeChange(37) ger { twenties: 1, tens: 1, fives: 1, ones: 2 }. Använd coinsOf.',
        hints: [
          'Håll reda på hur mycket som är kvar att växla efter varje myntsort.',
          'Det som är kvar efter 20-kronorna är beloppet minus antalet 20-kronor gånger 20. Eller resten med %.',
        ],
        solution: `function coinsOf(amount, coin) {
  return Math.floor(amount / coin);
}

function makeChange(amount) {
  let left = amount;
  const twenties = coinsOf(left, 20);
  left = left - twenties * 20;
  const tens = coinsOf(left, 10);
  left = left - tens * 10;
  const fives = coinsOf(left, 5);
  left = left - fives * 5;
  return { twenties, tens, fives, ones: left };
}`,
        tests: [
          {
            description: 'makeChange(37) ger 1, 1, 1 och 2 mynt',
            code: '(() => { const c = makeChange(37); return [c.twenties, c.tens, c.fives, c.ones]; })()',
            expected: [1, 1, 1, 2],
          },
          {
            description: 'makeChange(80) ger fyra 20-kronor och inget annat',
            code: '(() => { const c = makeChange(80); return [c.twenties, c.tens, c.fives, c.ones]; })()',
            expected: [4, 0, 0, 0],
          },
          {
            description: 'makeChange(19) ger 0, 1, 1 och 4 mynt',
            code: '(() => { const c = makeChange(19); return [c.twenties, c.tens, c.fives, c.ones]; })()',
            expected: [0, 1, 1, 4],
          },
          {
            description: 'makeChange(0) ger inga mynt',
            code: '(() => { const c = makeChange(0); return [c.twenties, c.tens, c.fives, c.ones]; })()',
            expected: [0, 0, 0, 0],
          },
        ],
        sourceChecks: [
          {
            description: 'makeChange använder coinsOf',
            pattern:
              /function\s+makeChange[^]*coinsOf\s*\(|makeChange\s*=[^]*coinsOf\s*\(/,
          },
        ],
      },
      {
        title: 'Betala',
        xp: 40,
        description:
          'Sist kopplar du ihop allt till själva betalningen. Kunden lägger i pengar, och automaten svarar på tre olika sätt beroende på hur mycket som kom in.',
        task: `Uppgift: Skriv funktionen \`pay(price, paid)\`.
  - Om kunden betalat för lite returnerar den texten "Det fattas 13 kr", med rätt belopp.
  - Om kunden betalat exakt returnerar den "Jämnt!".
  - Om kunden betalat för mycket returnerar den växeln som ett objekt från makeChange.`,
        hints: [
          'Tre fall betyder tre vägar genom funktionen. Vilket fall ska kollas först?',
          'Texten kan byggas med + mellan text och tal.',
        ],
        solution: `function coinsOf(amount, coin) {
  return Math.floor(amount / coin);
}

function makeChange(amount) {
  let left = amount;
  const twenties = coinsOf(left, 20);
  left = left - twenties * 20;
  const tens = coinsOf(left, 10);
  left = left - tens * 10;
  const fives = coinsOf(left, 5);
  left = left - fives * 5;
  return { twenties, tens, fives, ones: left };
}

function pay(price, paid) {
  if (paid < price) {
    return 'Det fattas ' + (price - paid) + ' kr';
  }
  if (paid === price) {
    return 'Jämnt!';
  }
  return makeChange(paid - price);
}`,
        tests: [
          {
            description: 'pay(50, 37) ger "Det fattas 13 kr"',
            code: 'pay(50, 37)',
            expected: 'Det fattas 13 kr',
          },
          {
            description: 'pay(25, 25) ger "Jämnt!"',
            code: 'pay(25, 25)',
            expected: 'Jämnt!',
          },
          {
            description: 'pay(63, 100) ger växel för 37 kr',
            code: '(() => { const c = pay(63, 100); return [c.twenties, c.tens, c.fives, c.ones]; })()',
            expected: [1, 1, 1, 2],
          },
          {
            description: 'pay(1, 50) ger växel för 49 kr',
            code: '(() => { const c = pay(1, 50); return [c.twenties, c.tens, c.fives, c.ones]; })()',
            expected: [2, 0, 1, 4],
          },
        ],
        sourceChecks: [
          {
            description: 'pay använder makeChange',
            pattern:
              /function\s+pay[^]*makeChange\s*\(|pay\s*=[^]*makeChange\s*\(/,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-weather',
    track: 'functions',
    title: 'Väderstationen',
    reward: { emoji: '🌂', name: 'Paraply' },
    summary: 'Små funktioner som tillsammans blir en veckorapport om vädret.',
    steps: [
      {
        title: 'Medeltemperaturen',
        xp: 25,
        description:
          'Väderstationen mäter temperaturen varje dag och sparar mätningarna i en array. Första verktyget räknar ut medelvärdet.',
        task: 'Uppgift: Skriv funktionen `average(numbers)` som returnerar medelvärdet av talen i arrayen. För en tom array ska den returnera 0.',
        starterCode: '// Steg 1: medelvärdet\n',
        hints: [
          'Medelvärdet är summan delat med antalet.',
          'Vad blir 0 / 0 i JavaScript? Den tomma arrayen behöver ett eget fall.',
        ],
        solution: `function average(numbers) {
  if (numbers.length === 0) {
    return 0;
  }
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum = sum + numbers[i];
  }
  return sum / numbers.length;
}`,
        tests: [
          {
            description: 'average([12, 15, 18]) ger 15',
            code: 'average([12, 15, 18])',
            expected: 15,
          },
          {
            description: 'average([-4, 2]) ger -1',
            code: 'average([-4, 2])',
            expected: -1,
          },
          {
            description: 'average([7]) ger 7',
            code: 'average([7])',
            expected: 7,
          },
          {
            description: 'average([]) ger 0',
            code: 'average([])',
            expected: 0,
          },
        ],
      },
      {
        title: 'Varmast och känsla',
        xp: 25,
        description:
          'Två verktyg till: ett som hittar den varmaste dagen och ett som beskriver hur en temperatur känns.',
        task: `Uppgift:
  - Skriv \`warmest(temps)\` som returnerar den högsta temperaturen i arrayen. Den ska fungera även när alla temperaturer är under noll.
  - Skriv \`describe(temp)\` som returnerar "kallt" under 10 grader, "varmt" över 20 grader och annars "lagom".`,
        hints: [
          'Om du börjar leta från 0 blir det fel när alla dagar är kalla. Vad kan du börja med i stället?',
          'Gränserna 10 och 20 räknas som lagom.',
        ],
        solution: `function average(numbers) {
  if (numbers.length === 0) {
    return 0;
  }
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum = sum + numbers[i];
  }
  return sum / numbers.length;
}

function warmest(temps) {
  let max = temps[0];
  for (let i = 1; i < temps.length; i++) {
    if (temps[i] > max) {
      max = temps[i];
    }
  }
  return max;
}

function describe(temp) {
  if (temp < 10) {
    return 'kallt';
  }
  if (temp > 20) {
    return 'varmt';
  }
  return 'lagom';
}`,
        tests: [
          {
            description: 'warmest([12, 25, 18]) ger 25',
            code: 'warmest([12, 25, 18])',
            expected: 25,
          },
          {
            description: 'warmest([-8, -3, -12]) ger -3',
            code: 'warmest([-8, -3, -12])',
            expected: -3,
          },
          {
            description: 'describe(4) ger "kallt"',
            code: 'describe(4)',
            expected: 'kallt',
          },
          {
            description: 'describe(10) ger "lagom"',
            code: 'describe(10)',
            expected: 'lagom',
          },
          {
            description: 'describe(20) ger "lagom"',
            code: 'describe(20)',
            expected: 'lagom',
          },
          {
            description: 'describe(27) ger "varmt"',
            code: 'describe(27)',
            expected: 'varmt',
          },
        ],
      },
      {
        title: 'Veckorapporten',
        xp: 40,
        description:
          'Nu sätter du ihop verktygen. Bra funktioner gör en sak var, och större funktioner bygger på de små.',
        task: 'Uppgift: Skriv `weekReport(temps)` som returnerar ett objekt med average (medeltemperaturen), warmest (högsta temperaturen) och feel (hur medeltemperaturen känns). Använd dina tre funktioner.',
        hints: [
          'weekReport behöver inte räkna något själv.',
          'feel beskriver medeltemperaturen, inte den varmaste dagen.',
        ],
        solution: `function average(numbers) {
  if (numbers.length === 0) {
    return 0;
  }
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum = sum + numbers[i];
  }
  return sum / numbers.length;
}

function warmest(temps) {
  let max = temps[0];
  for (let i = 1; i < temps.length; i++) {
    if (temps[i] > max) {
      max = temps[i];
    }
  }
  return max;
}

function describe(temp) {
  if (temp < 10) {
    return 'kallt';
  }
  if (temp > 20) {
    return 'varmt';
  }
  return 'lagom';
}

function weekReport(temps) {
  const avg = average(temps);
  return {
    average: avg,
    warmest: warmest(temps),
    feel: describe(avg),
  };
}`,
        tests: [
          {
            description: 'weekReport för en sval vecka',
            code: '(() => { const r = weekReport([8, 12, 14, 10, 16, 18, 6]); return [r.average, r.warmest, r.feel]; })()',
            expected: [12, 18, 'lagom'],
          },
          {
            description: 'weekReport för en vintervecka',
            code: '(() => { const r = weekReport([-2, -6, 1, -4, -3, 0, 0]); return [r.average, r.warmest, r.feel]; })()',
            expected: [-2, 1, 'kallt'],
          },
          {
            description:
              'feel beskriver medeltemperaturen och inte den varmaste dagen',
            code: 'weekReport([18, 18, 18, 18, 18, 18, 30]).feel',
            expected: 'lagom',
          },
        ],
        sourceChecks: [
          {
            description: 'weekReport använder average, warmest och describe',
            pattern:
              /weekReport[^]*(?=[^]*\baverage\s*\()(?=[^]*\bwarmest\s*\()(?=[^]*\bdescribe\s*\()/,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-dice',
    track: 'functions',
    title: 'Tärningsspelet',
    reward: { emoji: '🎲', name: 'Tärningar' },
    summary: 'Räkna poäng för ett kast med fem tärningar.',
    steps: [
      {
        title: 'Räkna ögon',
        xp: 25,
        description:
          'Du bygger poängräkningen till ett tärningsspel med fem tärningar. Ett kast är en array, till exempel [3, 1, 3, 6, 3].',
        task: 'Uppgift: Skriv `countValue(dice, value)` som returnerar hur många tärningar i kastet som visar value. countValue([3, 1, 3, 6, 3], 3) ger 3.',
        starterCode: '// Steg 1: räkna en sorts tärningar\n',
        hints: [
          'Gå igenom tärningarna en i taget.',
          'Du behöver en räknare som börjar på 0.',
        ],
        solution: `function countValue(dice, value) {
  let count = 0;
  for (let i = 0; i < dice.length; i++) {
    if (dice[i] === value) {
      count = count + 1;
    }
  }
  return count;
}`,
        tests: [
          {
            description: 'countValue([3, 1, 3, 6, 3], 3) ger 3',
            code: 'countValue([3, 1, 3, 6, 3], 3)',
            expected: 3,
          },
          {
            description: 'countValue([3, 1, 3, 6, 3], 6) ger 1',
            code: 'countValue([3, 1, 3, 6, 3], 6)',
            expected: 1,
          },
          {
            description: 'countValue([3, 1, 3, 6, 3], 5) ger 0',
            code: 'countValue([3, 1, 3, 6, 3], 5)',
            expected: 0,
          },
          {
            description: 'countValue([2, 2, 2, 2, 2], 2) ger 5',
            code: 'countValue([2, 2, 2, 2, 2], 2)',
            expected: 5,
          },
        ],
      },
      {
        title: 'Summa och yatzy',
        xp: 25,
        description:
          'Två regler till spelet: summan av alla tärningar, och yatzy, som är när alla fem visar samma.',
        task: `Uppgift:
  - Skriv \`sumDice(dice)\` som returnerar summan av tärningarna.
  - Skriv \`hasYatzy(dice)\` som returnerar true om alla fem tärningar visar samma, annars false.`,
        hints: [
          'Om alla visar samma som den första tärningen, hur många visar då det värdet?',
          'countValue kan svara på det.',
        ],
        solution: `function countValue(dice, value) {
  let count = 0;
  for (let i = 0; i < dice.length; i++) {
    if (dice[i] === value) {
      count = count + 1;
    }
  }
  return count;
}

function sumDice(dice) {
  let sum = 0;
  for (let i = 0; i < dice.length; i++) {
    sum = sum + dice[i];
  }
  return sum;
}

function hasYatzy(dice) {
  return countValue(dice, dice[0]) === 5;
}`,
        tests: [
          {
            description: 'sumDice([3, 1, 3, 6, 3]) ger 16',
            code: 'sumDice([3, 1, 3, 6, 3])',
            expected: 16,
          },
          {
            description: 'sumDice([6, 6, 6, 6, 6]) ger 30',
            code: 'sumDice([6, 6, 6, 6, 6])',
            expected: 30,
          },
          {
            description: 'hasYatzy([4, 4, 4, 4, 4]) ger true',
            code: 'hasYatzy([4, 4, 4, 4, 4])',
            expected: true,
          },
          {
            description: 'hasYatzy([4, 4, 4, 4, 1]) ger false',
            code: 'hasYatzy([4, 4, 4, 4, 1])',
            expected: false,
          },
          {
            description: 'hasYatzy([1, 4, 4, 4, 4]) ger false',
            code: 'hasYatzy([1, 4, 4, 4, 4])',
            expected: false,
          },
        ],
      },
      {
        title: 'Poängen',
        xp: 40,
        description: 'Nu ska ett kast få sin poäng enligt spelets regler.',
        task: `Uppgift: Skriv \`score(dice)\` som returnerar poängen för ett kast:
  - Yatzy ger 50 poäng.
  - Annars: visar minst tre tärningar samma värde ger kastet summan av alla tärningar.
  - Annars ger kastet 0 poäng.`,
        hints: [
          'Börja med regeln som ger mest poäng.',
          'För att hitta tre lika kan du prova varje värde från 1 till 6.',
        ],
        solution: `function countValue(dice, value) {
  let count = 0;
  for (let i = 0; i < dice.length; i++) {
    if (dice[i] === value) {
      count = count + 1;
    }
  }
  return count;
}

function sumDice(dice) {
  let sum = 0;
  for (let i = 0; i < dice.length; i++) {
    sum = sum + dice[i];
  }
  return sum;
}

function hasYatzy(dice) {
  return countValue(dice, dice[0]) === 5;
}

function score(dice) {
  if (hasYatzy(dice)) {
    return 50;
  }
  for (let value = 1; value <= 6; value++) {
    if (countValue(dice, value) >= 3) {
      return sumDice(dice);
    }
  }
  return 0;
}`,
        tests: [
          {
            description: 'score([5, 5, 5, 5, 5]) ger 50',
            code: 'score([5, 5, 5, 5, 5])',
            expected: 50,
          },
          {
            description: 'score([3, 1, 3, 6, 3]) ger 16',
            code: 'score([3, 1, 3, 6, 3])',
            expected: 16,
          },
          {
            description: 'score([2, 6, 6, 6, 6]) ger 26',
            code: 'score([2, 6, 6, 6, 6])',
            expected: 26,
          },
          {
            description: 'score([1, 2, 3, 4, 6]) ger 0',
            code: 'score([1, 2, 3, 4, 6])',
            expected: 0,
          },
          {
            description: 'score([4, 4, 1, 1, 6]) ger 0',
            code: 'score([4, 4, 1, 1, 6])',
            expected: 0,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-password',
    track: 'strings',
    title: 'Lösenordskollen',
    reward: { emoji: '🔑', name: 'Nyckel' },
    summary: 'Kolla hur starkt ett lösenord är och säg vad som saknas.',
    steps: [
      {
        title: 'Siffror och stora bokstäver',
        xp: 25,
        description:
          'Du bygger lösenordskollen till ett registreringsformulär. Först behövs två små verktyg som letar efter olika sorters tecken. En sträng kan gås igenom tecken för tecken precis som en array: text[i] och text.length.',
        task: `Uppgift:
  - Skriv \`hasDigit(text)\` som returnerar true om text innehåller minst en siffra.
  - Skriv \`hasUpper(text)\` som returnerar true om text innehåller minst en stor bokstav, även Å, Ä och Ö.`,
        starterCode: '// Steg 1: leta efter tecken\n',
        hints: [
          'Finns det en sträng som innehåller alla siffror, som du kan fråga med includes?',
          'Vad händer med en stor bokstav när du gör toLowerCase på den? Och med en siffra?',
        ],
        solution: `function hasDigit(text) {
  for (let i = 0; i < text.length; i++) {
    if ('0123456789'.includes(text[i])) {
      return true;
    }
  }
  return false;
}

function hasUpper(text) {
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char !== char.toLowerCase()) {
      return true;
    }
  }
  return false;
}`,
        tests: [
          {
            description: 'hasDigit("hemligt7") ger true',
            code: "hasDigit('hemligt7')",
            expected: true,
          },
          {
            description: 'hasDigit("0abc") ger true',
            code: "hasDigit('0abc')",
            expected: true,
          },
          {
            description: 'hasDigit("hemligt") ger false',
            code: "hasDigit('hemligt')",
            expected: false,
          },
          {
            description: 'hasDigit("") ger false',
            code: "hasDigit('')",
            expected: false,
          },
          {
            description: 'hasUpper("hejSan") ger true',
            code: "hasUpper('hejSan')",
            expected: true,
          },
          {
            description: 'hasUpper("åÖ") ger true',
            code: "hasUpper('åÖ')",
            expected: true,
          },
          {
            description: 'hasUpper("hej123!") ger false',
            code: "hasUpper('hej123!')",
            expected: false,
          },
        ],
      },
      {
        title: 'Vad är fel?',
        xp: 25,
        description:
          'Formuläret ska kunna säga exakt vad som är fel med ett lösenord, så att användaren vet vad hen ska ändra.',
        task: `Uppgift: Skriv \`passwordProblems(password)\` som returnerar en array med alla problem, i den här ordningen:
  - "För kort" om lösenordet har färre än 8 tecken
  - "Saknar siffra"
  - "Saknar stor bokstav"
Ett bra lösenord ger en tom array.`,
        hints: [
          'Börja med en tom array och lägg till ett problem i taget.',
          'Varje regel är en egen if, inte en else if. Varför?',
        ],
        solution: `function hasDigit(text) {
  for (let i = 0; i < text.length; i++) {
    if ('0123456789'.includes(text[i])) {
      return true;
    }
  }
  return false;
}

function hasUpper(text) {
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char !== char.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function passwordProblems(password) {
  const problems = [];
  if (password.length < 8) {
    problems.push('För kort');
  }
  if (!hasDigit(password)) {
    problems.push('Saknar siffra');
  }
  if (!hasUpper(password)) {
    problems.push('Saknar stor bokstav');
  }
  return problems;
}`,
        tests: [
          {
            description: 'passwordProblems("Hemligt123") ger []',
            code: "passwordProblems('Hemligt123')",
            expected: [],
          },
          {
            description: 'passwordProblems("abc") ger alla tre problemen',
            code: "passwordProblems('abc')",
            expected: ['För kort', 'Saknar siffra', 'Saknar stor bokstav'],
          },
          {
            description:
              'passwordProblems("hemligt123") saknar bara stor bokstav',
            code: "passwordProblems('hemligt123')",
            expected: ['Saknar stor bokstav'],
          },
          {
            description: 'passwordProblems("Kort1") är bara för kort',
            code: "passwordProblems('Kort1')",
            expected: ['För kort'],
          },
          {
            description: 'Exakt 8 tecken är inte för kort',
            code: "passwordProblems('Abcdefg1')",
            expected: [],
          },
        ],
        sourceChecks: [
          {
            description: 'passwordProblems använder hasDigit och hasUpper',
            pattern:
              /passwordProblems[^]*(?=[^]*\bhasDigit\s*\()(?=[^]*\bhasUpper\s*\()/,
          },
        ],
      },
      {
        title: 'Omdömet',
        xp: 40,
        description:
          'Sist ska användaren få ett omdöme om lösenordet i klartext, precis under rutan i formuläret.',
        task: `Uppgift: Skriv \`feedback(password)\` som returnerar en text:
  - Inga problem: "Lösenordet är starkt!"
  - Ett problem: "Lösenordet är okej: Saknar siffra", med problemet efter kolon.
  - Två eller fler: "Lösenordet är svagt: För kort, Saknar siffra", med problemen i ordning och komma emellan.
Mellanslag före och efter lösenordet räknas inte, så "  Hemligt1  " är bara 8 tecken.`,
        hints: [
          'Städa lösenordet först och skicka det städade vidare.',
          'Det finns en array-metod som sätter ihop alla delar med en text emellan.',
        ],
        solution: `function hasDigit(text) {
  for (let i = 0; i < text.length; i++) {
    if ('0123456789'.includes(text[i])) {
      return true;
    }
  }
  return false;
}

function hasUpper(text) {
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char !== char.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function passwordProblems(password) {
  const problems = [];
  if (password.length < 8) {
    problems.push('För kort');
  }
  if (!hasDigit(password)) {
    problems.push('Saknar siffra');
  }
  if (!hasUpper(password)) {
    problems.push('Saknar stor bokstav');
  }
  return problems;
}

function feedback(password) {
  const problems = passwordProblems(password.trim());
  if (problems.length === 0) {
    return 'Lösenordet är starkt!';
  }
  const level = problems.length === 1 ? 'okej' : 'svagt';
  return \`Lösenordet är \${level}: \${problems.join(', ')}\`;
}`,
        tests: [
          {
            description: 'feedback("Hemligt123") ger starkt',
            code: "feedback('Hemligt123')",
            expected: 'Lösenordet är starkt!',
          },
          {
            description: 'feedback("hemligt123") ger okej med problemet',
            code: "feedback('hemligt123')",
            expected: 'Lösenordet är okej: Saknar stor bokstav',
          },
          {
            description: 'feedback("abc") ger svagt med alla problemen',
            code: "feedback('abc')",
            expected:
              'Lösenordet är svagt: För kort, Saknar siffra, Saknar stor bokstav',
          },
          {
            description: 'Mellanslag runt lösenordet räknas inte',
            code: "feedback('  Hemligt  ')",
            expected: 'Lösenordet är svagt: För kort, Saknar siffra',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-badge',
    track: 'strings',
    title: 'Namnbrickan',
    reward: { emoji: '📛', name: 'Namnbricka' },
    summary:
      'Städa slarvigt inskrivna namn och gör namnbrickor till en konferens.',
    steps: [
      {
        title: 'Stor första bokstav',
        xp: 25,
        description:
          'Till en konferens skriver deltagarna in sina namn själva, och de gör det slarvigt: "aDA", " linus ", "GRACE". Namnbrickorna ska ändå bli snygga. Ett nytt verktyg: text.slice(1) ger hela texten utom första tecknet.',
        task: 'Uppgift: Skriv `capitalize(word)` som tar bort mellanslag runt ordet och returnerar det med stor första bokstav och resten små. capitalize(" aDA ") ger "Ada". En tom sträng ger en tom sträng.',
        starterCode: '// Steg 1: stor första bokstav\n',
        hints: [
          'Dela upp jobbet: den första bokstaven och resten av ordet behandlas olika.',
          'Vad är text[0], och vad är text.slice(1)? Vad gör en tom sträng med text[0]?',
        ],
        solution: `function capitalize(word) {
  const clean = word.trim();
  if (clean === '') {
    return '';
  }
  return clean[0].toUpperCase() + clean.slice(1).toLowerCase();
}`,
        tests: [
          {
            description: 'capitalize(" aDA ") ger "Ada"',
            code: "capitalize(' aDA ')",
            expected: 'Ada',
          },
          {
            description: 'capitalize("GRACE") ger "Grace"',
            code: "capitalize('GRACE')",
            expected: 'Grace',
          },
          {
            description: 'capitalize("östen") ger "Östen"',
            code: "capitalize('östen')",
            expected: 'Östen',
          },
          {
            description: 'capitalize("x") ger "X"',
            code: "capitalize('x')",
            expected: 'X',
          },
          {
            description: 'capitalize("") ger ""',
            code: "capitalize('')",
            expected: '',
          },
          {
            description: 'capitalize("   ") ger ""',
            code: "capitalize('   ')",
            expected: '',
          },
        ],
      },
      {
        title: 'Hela namnet',
        xp: 25,
        description:
          'Många skriver både för- och efternamn, ibland med flera mellanslag emellan. Också dubbelnamn som "anna maria" ska bli rätt.',
        task: 'Uppgift: Skriv `formatName(fullName)` som returnerar namnet med stor bokstav i varje del och exakt ett mellanslag mellan delarna. formatName("  ada   LOVELACE ") ger "Ada Lovelace".',
        hints: [
          'Vad ger "a  b".split(" ")? Prova med console.log.',
          'Tomma delar ska hoppas över innan du sätter ihop namnet igen.',
        ],
        solution: `function capitalize(word) {
  const clean = word.trim();
  if (clean === '') {
    return '';
  }
  return clean[0].toUpperCase() + clean.slice(1).toLowerCase();
}

function formatName(fullName) {
  const parts = fullName.split(' ');
  const words = [];
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] !== '') {
      words.push(capitalize(parts[i]));
    }
  }
  return words.join(' ');
}`,
        tests: [
          {
            description: 'formatName("  ada   LOVELACE ") ger "Ada Lovelace"',
            code: "formatName('  ada   LOVELACE ')",
            expected: 'Ada Lovelace',
          },
          {
            description: 'formatName("linus") ger "Linus"',
            code: "formatName('linus')",
            expected: 'Linus',
          },
          {
            description:
              'formatName("anna maria ÅBERG") ger "Anna Maria Åberg"',
            code: "formatName('anna maria ÅBERG')",
            expected: 'Anna Maria Åberg',
          },
          {
            description: 'formatName("") ger ""',
            code: "formatName('')",
            expected: '',
          },
        ],
      },
      {
        title: 'Brickan',
        xp: 40,
        description:
          'Nu ska brickorna skrivas ut. Varje deltagare är ett objekt, men alla har inte fyllt i allt, och ibland saknas deltagaren helt.',
        task: `Uppgift: Skriv \`badge(person)\` som returnerar texten på brickan.
  - Namnet formateras som i förra steget, och efter det kommer " – " och rollen: "Ada Lovelace – Utvecklare".
  - Saknas rollen står det "Gäst".
  - Har personen ett företag med ett namn, som person.company.name, läggs det till inom parentes: "Ada Lovelace – Utvecklare (Analytical AB)".
  - Saknas personen helt returneras "Okänd besökare".`,
        hints: [
          'Två av operatorerna från banan är gjorda för precis det här: saker som kanske saknas.',
          'Bygg texten i två delar: först det som alltid finns, sedan det som bara ibland finns.',
        ],
        solution: `function capitalize(word) {
  const clean = word.trim();
  if (clean === '') {
    return '';
  }
  return clean[0].toUpperCase() + clean.slice(1).toLowerCase();
}

function formatName(fullName) {
  const parts = fullName.split(' ');
  const words = [];
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] !== '') {
      words.push(capitalize(parts[i]));
    }
  }
  return words.join(' ');
}

function badge(person) {
  if (!person) {
    return 'Okänd besökare';
  }
  const text = \`\${formatName(person.name)} – \${person.role ?? 'Gäst'}\`;
  const company = person.company?.name;
  if (company) {
    return \`\${text} (\${company})\`;
  }
  return text;
}`,
        tests: [
          {
            description: 'En person med roll och företag',
            code: "badge({ name: 'ada lovelace', role: 'Utvecklare', company: { name: 'Analytical AB' } })",
            expected: 'Ada Lovelace – Utvecklare (Analytical AB)',
          },
          {
            description: 'En person utan roll blir Gäst',
            code: "badge({ name: ' LINUS ' })",
            expected: 'Linus – Gäst',
          },
          {
            description: 'Ett företag utan namn visas inte',
            code: "badge({ name: 'grace hopper', role: 'Amiral', company: {} })",
            expected: 'Grace Hopper – Amiral',
          },
          {
            description: 'Utan person blir det "Okänd besökare"',
            code: 'badge(undefined)',
            expected: 'Okänd besökare',
          },
          {
            description: 'Även null ger "Okänd besökare"',
            code: 'badge(null)',
            expected: 'Okänd besökare',
          },
        ],
        sourceChecks: [
          {
            description: 'badge använder formatName',
            pattern: /badge[^]*\bformatName\s*\(/,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-chat',
    track: 'strings',
    title: 'Chattfiltret',
    reward: { emoji: '🦜', name: 'Papegoja' },
    summary: 'Räkna ord, censurera fula ord och visa chattmeddelanden snyggt.',
    steps: [
      {
        title: 'Räkna ord',
        xp: 25,
        description:
          'Du bygger filtret till en chatt. Först ska den kunna räkna orden i ett meddelande, till exempel för att stoppa meddelanden som är för långa. Folk skriver ofta med extra mellanslag.',
        task: 'Uppgift: Skriv `countWords(text)` som returnerar antalet ord. countWords("  hej  på dig ") ger 3, och en tom text eller bara mellanslag ger 0.',
        starterCode: '// Steg 1: räkna ord\n',
        hints: [
          'Vad blir det när du delar " hej " med split(" ")? Vilka delar är egentligen ord?',
          'Räkna bara de delar som inte är tomma.',
        ],
        solution: `function countWords(text) {
  const parts = text.split(' ');
  let count = 0;
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] !== '') {
      count = count + 1;
    }
  }
  return count;
}`,
        tests: [
          {
            description: 'countWords("hej på dig") ger 3',
            code: "countWords('hej på dig')",
            expected: 3,
          },
          {
            description: 'countWords("  hej  på dig ") ger 3',
            code: "countWords('  hej  på dig ')",
            expected: 3,
          },
          {
            description: 'countWords("hej") ger 1',
            code: "countWords('hej')",
            expected: 1,
          },
          {
            description: 'countWords("") ger 0',
            code: "countWords('')",
            expected: 0,
          },
          {
            description: 'countWords("    ") ger 0',
            code: "countWords('    ')",
            expected: 0,
          },
        ],
      },
      {
        title: 'Censur',
        xp: 25,
        description:
          'Chatten ska vara snäll. Fula ord byts ut mot stjärnor, en stjärna per bokstav, så att man ser att något stod där. Orden i ett meddelande skiljs åt med ett mellanslag.',
        task: 'Uppgift: Skriv `censor(text, badWords)` som byter ut varje ord som finns i arrayen badWords mot lika många * som ordet har bokstäver. Stora och små bokstäver spelar ingen roll. censor("Du är en Fåne", ["fåne"]) ger "Du är en ****". Alla andra ord ska vara precis som förut.',
        hints: [
          'Dela upp, byt ut de delar som behöver det, och sätt ihop igen.',
          'Stjärnorna kan byggas upp i en loop, ett tecken per varv.',
        ],
        solution: `function countWords(text) {
  const parts = text.split(' ');
  let count = 0;
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] !== '') {
      count = count + 1;
    }
  }
  return count;
}

function stars(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result = result + '*';
  }
  return result;
}

function censor(text, badWords) {
  const words = text.split(' ');
  for (let i = 0; i < words.length; i++) {
    if (badWords.includes(words[i].toLowerCase())) {
      words[i] = stars(words[i].length);
    }
  }
  return words.join(' ');
}`,
        tests: [
          {
            description:
              'censor("Du är en Fåne", ["fåne"]) ger "Du är en ****"',
            code: "censor('Du är en Fåne', ['fåne'])",
            expected: 'Du är en ****',
          },
          {
            description: 'Flera fula ord byts ut',
            code: "censor('DUMBOM och fåne', ['fåne', 'dumbom'])",
            expected: '****** och ****',
          },
          {
            description: 'Ord som bara innehåller ett fult ord byts inte ut',
            code: "censor('Fånerier är kul', ['fåne'])",
            expected: 'Fånerier är kul',
          },
          {
            description: 'Utan fula ord blir texten likadan',
            code: "censor('Hej på dig', ['fåne'])",
            expected: 'Hej på dig',
          },
        ],
      },
      {
        title: 'Visa meddelandet',
        xp: 40,
        description:
          'Sist ska meddelandena visas i chatten. Ett meddelande är ett objekt med text, och ibland user och time. Ordlistan med fula ord är ["fåne", "dumbom"].',
        task: `Uppgift: Skriv \`formatMessage(message)\` som returnerar raden som visas i chatten.
  - Formatet är "[12:05] Ada: Hej på dig", med texten censurerad.
  - Saknas user står det "Anonym". Saknas time visas ingen tid, och raden börjar direkt med namnet.
  - Mellanslag runt texten tas bort.
  - Är texten tom, eller bara mellanslag, ska meddelandet inte visas: returnera null.`,
        hints: [
          'Börja med fallet där inget ska visas, så slipper resten av funktionen tänka på det.',
          'Tiden är antingen en bit text med hakparenteser och ett mellanslag, eller ingenting.',
        ],
        solution: `function countWords(text) {
  const parts = text.split(' ');
  let count = 0;
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] !== '') {
      count = count + 1;
    }
  }
  return count;
}

function stars(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result = result + '*';
  }
  return result;
}

function censor(text, badWords) {
  const words = text.split(' ');
  for (let i = 0; i < words.length; i++) {
    if (badWords.includes(words[i].toLowerCase())) {
      words[i] = stars(words[i].length);
    }
  }
  return words.join(' ');
}

const BAD_WORDS = ['fåne', 'dumbom'];

function formatMessage(message) {
  const text = message.text.trim();
  if (text === '') {
    return null;
  }
  const time = message.time ? \`[\${message.time}] \` : '';
  const user = message.user ?? 'Anonym';
  return \`\${time}\${user}: \${censor(text, BAD_WORDS)}\`;
}`,
        tests: [
          {
            description: 'Ett helt meddelande med tid och namn',
            code: "formatMessage({ user: 'Ada', time: '12:05', text: 'Hej på dig' })",
            expected: '[12:05] Ada: Hej på dig',
          },
          {
            description: 'Utan user blir det Anonym, och fula ord censureras',
            code: "formatMessage({ time: '09:30', text: 'Din dumbom' })",
            expected: '[09:30] Anonym: Din ******',
          },
          {
            description: 'Utan time börjar raden med namnet',
            code: "formatMessage({ user: 'Linus', text: '  Hallå!  ' })",
            expected: 'Linus: Hallå!',
          },
          {
            description: 'Ett tomt meddelande ger null',
            code: "formatMessage({ user: 'Grace', time: '10:00', text: '   ' })",
            expected: null,
          },
        ],
        sourceChecks: [
          {
            description: 'formatMessage använder censor',
            pattern: /formatMessage[^]*\bcensor\s*\(/,
          },
        ],
      },
    ],
  },
  // Array-metoder: samma nivå som Functions, och dessutom inga
  // for-loopar. Allt görs med map, filter, find och reduce.
  {
    id: 'proj-movies',
    track: 'array-methods',
    title: 'Filmkvällen',
    reward: { emoji: '🍿', name: 'Popcorn' },
    summary: 'Sök bland filmer, hitta den bästa och få tips på vad du ska se.',
    steps: [
      {
        title: 'Välj genre',
        xp: 25,
        description:
          'Du bygger en app för filmkvällen. Varje film är ett objekt: { title, year, rating, genres }, där genres är en array som ["komedi", "drama"]. Inga for-loopar i det här projektet.',
        task: 'Uppgift: Skriv `titlesByGenre(movies, genre)` som returnerar en array med titlarna på filmerna som har genren, i samma ordning som i movies.',
        starterCode: '// Steg 1: filmer i en genre\n',
        hints: [
          'Det är två jobb: välja ut filmer och sedan göra om dem till titlar.',
          'genres är en array. Hur frågar man en array om den innehåller något?',
        ],
        solution: `function titlesByGenre(movies, genre) {
  return movies
    .filter(movie => movie.genres.includes(genre))
    .map(movie => movie.title);
}`,
        tests: [
          {
            description: 'Hittar alla komedier i rätt ordning',
            code: "titlesByGenre([{ title: 'A', genres: ['komedi'] }, { title: 'B', genres: ['skräck'] }, { title: 'C', genres: ['drama', 'komedi'] }], 'komedi')",
            expected: ['A', 'C'],
          },
          {
            description: 'Ger en tom array när ingen film har genren',
            code: "titlesByGenre([{ title: 'A', genres: ['komedi'] }], 'western')",
            expected: [],
          },
          {
            description: 'Ger en tom array för en tom lista',
            code: "titlesByGenre([], 'drama')",
            expected: [],
          },
        ],
        sourceChecks: [
          {
            description: 'Inga for-loopar',
            pattern: /\bfor\s*\(/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Betyg',
        xp: 25,
        description:
          'Nu ska appen kunna säga något om betygen, som går från 1 till 10.',
        task: `Uppgift:
  - Skriv \`averageRating(movies)\` som returnerar medelbetyget, eller 0 om listan är tom.
  - Skriv \`bestMovie(movies)\` som returnerar filmobjektet med högst betyg. Vid lika vinner den som kommer först. En tom lista ger undefined.`,
        hints: [
          'En av metoderna kan gå igenom en lista och bära med sig ett värde från varv till varv.',
          'För bestMovie kan det värdet vara den bästa filmen hittills.',
        ],
        solution: `function titlesByGenre(movies, genre) {
  return movies
    .filter(movie => movie.genres.includes(genre))
    .map(movie => movie.title);
}

function averageRating(movies) {
  if (movies.length === 0) {
    return 0;
  }
  const sum = movies.reduce((total, movie) => total + movie.rating, 0);
  return sum / movies.length;
}

function bestMovie(movies) {
  if (movies.length === 0) {
    return undefined;
  }
  return movies.reduce((best, movie) =>
    movie.rating > best.rating ? movie : best,
  );
}`,
        tests: [
          {
            description: 'averageRating räknar ut medelbetyget',
            code: "averageRating([{ title: 'A', rating: 6 }, { title: 'B', rating: 9 }, { title: 'C', rating: 9 }])",
            expected: 8,
          },
          {
            description: 'averageRating([]) ger 0',
            code: 'averageRating([])',
            expected: 0,
          },
          {
            description:
              'bestMovie ger filmen med högst betyg, den första vid lika',
            code: "bestMovie([{ title: 'A', rating: 6 }, { title: 'B', rating: 9 }, { title: 'C', rating: 9 }]).title",
            expected: 'B',
          },
          {
            description: 'bestMovie fungerar när den bästa ligger först',
            code: "bestMovie([{ title: 'A', rating: 10 }, { title: 'B', rating: 2 }]).title",
            expected: 'A',
          },
          {
            description: 'bestMovie([]) ger undefined',
            code: 'bestMovie([])',
            expected: undefined,
          },
        ],
        sourceChecks: [
          {
            description: 'Inga for-loopar',
            pattern: /\bfor\s*\(/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Tips',
        xp: 40,
        description:
          'Sist ska appen tipsa om vad du ska se ikväll. Den vet vilka filmer du redan har sett.',
        task: 'Uppgift: Skriv `recommend(movies, seen)`, där seen är en array med titlar du redan sett. Den returnerar titlarna på högst 3 filmer som du inte har sett och som har minst betyget 7, i samma ordning som i movies. Titlarna i seen kan vara skrivna med andra stora och små bokstäver.',
        hints: [
          'Börja med att göra seen lätt att jämföra med.',
          'Begränsa till 3 sist, när allt annat är klart.',
        ],
        solution: `function titlesByGenre(movies, genre) {
  return movies
    .filter(movie => movie.genres.includes(genre))
    .map(movie => movie.title);
}

function averageRating(movies) {
  if (movies.length === 0) {
    return 0;
  }
  const sum = movies.reduce((total, movie) => total + movie.rating, 0);
  return sum / movies.length;
}

function bestMovie(movies) {
  if (movies.length === 0) {
    return undefined;
  }
  return movies.reduce((best, movie) =>
    movie.rating > best.rating ? movie : best,
  );
}

function recommend(movies, seen) {
  const seenLower = seen.map(title => title.toLowerCase());
  return movies
    .filter(movie => movie.rating >= 7)
    .filter(movie => !seenLower.includes(movie.title.toLowerCase()))
    .map(movie => movie.title)
    .slice(0, 3);
}`,
        tests: [
          {
            description: 'Tipsar om bra filmer du inte sett',
            code: "recommend([{ title: 'Up', rating: 8 }, { title: 'Cats', rating: 3 }, { title: 'Jaws', rating: 7 }], [])",
            expected: ['Up', 'Jaws'],
          },
          {
            description:
              'Hoppar över filmer du sett, oavsett stora och små bokstäver',
            code: "recommend([{ title: 'Up', rating: 8 }, { title: 'Jaws', rating: 7 }], ['UP'])",
            expected: ['Jaws'],
          },
          {
            description: 'Ger högst 3 tips',
            code: "recommend([{ title: 'A', rating: 9 }, { title: 'B', rating: 9 }, { title: 'C', rating: 9 }, { title: 'D', rating: 9 }], ['x'])",
            expected: ['A', 'B', 'C'],
          },
          {
            description: 'Filmer du sett räknas inte in bland de 3',
            code: "recommend([{ title: 'A', rating: 9 }, { title: 'B', rating: 9 }, { title: 'C', rating: 9 }, { title: 'D', rating: 9 }], ['a'])",
            expected: ['B', 'C', 'D'],
          },
        ],
        sourceChecks: [
          {
            description: 'Inga for-loopar',
            pattern: /\bfor\s*\(/,
            forbidden: true,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-cart',
    track: 'array-methods',
    title: 'Varukorgen',
    reward: { emoji: '🧺', name: 'Korg' },
    summary: 'Räkna på en varukorg i en webbshop och skriv ut kvittot.',
    steps: [
      {
        title: 'Summan',
        xp: 25,
        description:
          'Du bygger varukorgen i en webbshop. Varje rad i korgen är ett objekt: { id, name, price, qty }, där qty är antalet. Inga for-loopar i det här projektet.',
        task: `Uppgift:
  - Skriv \`cartTotal(cart)\` som returnerar vad hela korgen kostar.
  - Skriv \`itemCount(cart)\` som returnerar hur många varor som ligger i korgen totalt.`,
        starterCode: '// Steg 1: vad kostar korgen?\n',
        hints: [
          'En rad kostar priset gånger antalet.',
          'Båda funktionerna gör om en lista till ett enda tal.',
        ],
        solution: `function cartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function itemCount(cart) {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}`,
        tests: [
          {
            description: 'cartTotal räknar pris gånger antal för varje rad',
            code: "cartTotal([{ id: 1, name: 'Mjölk', price: 18, qty: 2 }, { id: 2, name: 'Bröd', price: 35, qty: 1 }])",
            expected: 71,
          },
          {
            description: 'cartTotal([]) ger 0',
            code: 'cartTotal([])',
            expected: 0,
          },
          {
            description: 'itemCount räknar alla varor',
            code: "itemCount([{ id: 1, name: 'Mjölk', price: 18, qty: 2 }, { id: 2, name: 'Bröd', price: 35, qty: 1 }])",
            expected: 3,
          },
          {
            description: 'itemCount([]) ger 0',
            code: 'itemCount([])',
            expected: 0,
          },
        ],
        sourceChecks: [
          {
            description: 'Inga for-loopar',
            pattern: /\bfor\s*\(/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Sök i korgen',
        xp: 25,
        description: 'Kunden vill kunna leta i korgen och se vad som är dyrt.',
        task: `Uppgift:
  - Skriv \`findItem(cart, name)\` som returnerar raden med varan, oavsett stora och små bokstäver. Finns den inte returneras null.
  - Skriv \`expensiveNames(cart, limit)\` som returnerar namnen på varorna som kostar mer än limit styck.`,
        hints: [
          'Vad returnerar find när inget hittas? Är det null?',
          'Det finns en operator som ger ett reservvärde när något saknas.',
        ],
        solution: `function cartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function itemCount(cart) {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function findItem(cart, name) {
  const item = cart.find(
    item => item.name.toLowerCase() === name.toLowerCase(),
  );
  return item ?? null;
}

function expensiveNames(cart, limit) {
  return cart.filter(item => item.price > limit).map(item => item.name);
}`,
        tests: [
          {
            description:
              'findItem hittar varan oavsett stora och små bokstäver',
            code: "findItem([{ id: 1, name: 'Mjölk', price: 18, qty: 2 }, { id: 2, name: 'Bröd', price: 35, qty: 1 }], 'BRÖD').id",
            expected: 2,
          },
          {
            description: 'findItem ger null när varan inte finns',
            code: "findItem([{ id: 1, name: 'Mjölk', price: 18, qty: 2 }], 'Ost')",
            expected: null,
          },
          {
            description: 'expensiveNames ger varorna över gränsen',
            code: "expensiveNames([{ id: 1, name: 'Mjölk', price: 18, qty: 2 }, { id: 2, name: 'Ost', price: 89, qty: 1 }, { id: 3, name: 'Kaffe', price: 50, qty: 1 }], 50)",
            expected: ['Ost'],
          },
        ],
        sourceChecks: [
          {
            description: 'Inga for-loopar',
            pattern: /\bfor\s*\(/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Kvittot',
        xp: 40,
        description:
          'Dags att betala. Kvittot är en array med rader som visas en och en på skärmen.',
        task: `Uppgift: Skriv \`receipt(cart)\` som returnerar kvittots rader:
  - En rad per vara: "2 × Mjölk: 36 kr", med antal, namn och radens summa.
  - Är summan minst 500 kr får kunden 10 % rabatt, avrundat nedåt till hela kronor. Då kommer en rad "Rabatt: -52 kr".
  - Sist kommer "Totalt: 468 kr", med rabatten avdragen.`,
        hints: [
          'Varje vara blir en textrad: det låter som ett jobb för en av metoderna.',
          'Räkna ut rabatten med funktionerna du redan har, innan du bygger de sista raderna.',
        ],
        solution: `function cartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function itemCount(cart) {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function findItem(cart, name) {
  const item = cart.find(
    item => item.name.toLowerCase() === name.toLowerCase(),
  );
  return item ?? null;
}

function expensiveNames(cart, limit) {
  return cart.filter(item => item.price > limit).map(item => item.name);
}

function receipt(cart) {
  const lines = cart.map(
    item => \`\${item.qty} × \${item.name}: \${item.price * item.qty} kr\`,
  );
  const total = cartTotal(cart);
  const discount = total >= 500 ? Math.floor(total / 10) : 0;
  if (discount > 0) {
    lines.push(\`Rabatt: -\${discount} kr\`);
  }
  lines.push(\`Totalt: \${total - discount} kr\`);
  return lines;
}`,
        tests: [
          {
            description: 'Ett kvitto utan rabatt',
            code: "receipt([{ id: 1, name: 'Mjölk', price: 18, qty: 2 }, { id: 2, name: 'Bröd', price: 35, qty: 1 }])",
            expected: ['2 × Mjölk: 36 kr', '1 × Bröd: 35 kr', 'Totalt: 71 kr'],
          },
          {
            description: 'Ett kvitto med rabatt',
            code: "receipt([{ id: 1, name: 'Hörlurar', price: 499, qty: 1 }, { id: 2, name: 'Kabel', price: 25, qty: 1 }])",
            expected: [
              '1 × Hörlurar: 499 kr',
              '1 × Kabel: 25 kr',
              'Rabatt: -52 kr',
              'Totalt: 472 kr',
            ],
          },
          {
            description: 'Exakt 500 kr ger rabatt',
            code: "receipt([{ id: 1, name: 'Spel', price: 250, qty: 2 }])",
            expected: ['2 × Spel: 500 kr', 'Rabatt: -50 kr', 'Totalt: 450 kr'],
          },
          {
            description: 'En tom korg',
            code: 'receipt([])',
            expected: ['Totalt: 0 kr'],
          },
        ],
        sourceChecks: [
          {
            description: 'Inga for-loopar',
            pattern: /\bfor\s*\(/,
            forbidden: true,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-quiz-results',
    track: 'array-methods',
    title: 'Quizresultaten',
    reward: { emoji: '📜', name: 'Diplom' },
    summary: 'Rätta ett quiz, se vem som klarade det och sammanfatta klassen.',
    steps: [
      {
        title: 'Rätta',
        xp: 25,
        description:
          'Du rättar ett quiz. En elevs svar är en array med true för rätt och false för fel, till exempel [true, false, true, true]. Inga for-loopar i det här projektet.',
        task: `Uppgift:
  - Skriv \`scoreOf(answers)\` som returnerar antalet rätt.
  - Skriv \`percent(answers)\` som returnerar andelen rätt i procent, avrundat till närmaste heltal med Math.round. Inga svar alls ger 0.`,
        starterCode: '// Steg 1: rätta svaren\n',
        hints: [
          'Hur många rätt är lika med hur många true som blir kvar om du bara behåller dem.',
          'Procent är andelen gånger 100.',
        ],
        solution: `function scoreOf(answers) {
  return answers.filter(answer => answer).length;
}

function percent(answers) {
  if (answers.length === 0) {
    return 0;
  }
  return Math.round((scoreOf(answers) / answers.length) * 100);
}`,
        tests: [
          {
            description: 'scoreOf([true, false, true, true]) ger 3',
            code: 'scoreOf([true, false, true, true])',
            expected: 3,
          },
          {
            description: 'scoreOf([false, false]) ger 0',
            code: 'scoreOf([false, false])',
            expected: 0,
          },
          {
            description: 'percent([true, false, true, true]) ger 75',
            code: 'percent([true, false, true, true])',
            expected: 75,
          },
          {
            description: 'percent([true, false, false]) ger 33',
            code: 'percent([true, false, false])',
            expected: 33,
          },
          {
            description: 'percent([true, true, false]) ger 67',
            code: 'percent([true, true, false])',
            expected: 67,
          },
          {
            description: 'percent([]) ger 0',
            code: 'percent([])',
            expected: 0,
          },
        ],
        sourceChecks: [
          {
            description: 'Inga for-loopar',
            pattern: /\bfor\s*\(/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Godkänd?',
        xp: 25,
        description:
          'Nu rättar du hela klassen. Varje elev är ett objekt: { name, answers }. Man är godkänd med minst 60 %.',
        task: `Uppgift:
  - Skriv \`passedNames(students)\` som returnerar namnen på de godkända eleverna.
  - Skriv \`topStudent(students)\` som returnerar namnet på eleven med högst procent. Vid lika vinner den som kommer först, och en tom klass ger null.`,
        hints: [
          'percent kan räkna åt dig, så slipper du göra det igen.',
          'Hitta den bästa eleven först, och plocka ut namnet sist.',
        ],
        solution: `function scoreOf(answers) {
  return answers.filter(answer => answer).length;
}

function percent(answers) {
  if (answers.length === 0) {
    return 0;
  }
  return Math.round((scoreOf(answers) / answers.length) * 100);
}

function passedNames(students) {
  return students
    .filter(student => percent(student.answers) >= 60)
    .map(student => student.name);
}

function topStudent(students) {
  if (students.length === 0) {
    return null;
  }
  const best = students.reduce((top, student) =>
    percent(student.answers) > percent(top.answers) ? student : top,
  );
  return best.name;
}`,
        tests: [
          {
            description: 'passedNames ger de godkända, 60 % räcker',
            code: "passedNames([{ name: 'Ada', answers: [true, true, true, false, false] }, { name: 'Bo', answers: [true, false, false] }, { name: 'Cy', answers: [true] }])",
            expected: ['Ada', 'Cy'],
          },
          {
            description: 'topStudent ger den med högst procent',
            code: "topStudent([{ name: 'Ada', answers: [true, true, false] }, { name: 'Bo', answers: [true, true, true, false] }])",
            expected: 'Bo',
          },
          {
            description: 'topStudent låter den första vinna vid lika',
            code: "topStudent([{ name: 'Ada', answers: [true, false] }, { name: 'Bo', answers: [false, true] }])",
            expected: 'Ada',
          },
          {
            description: 'topStudent([]) ger null',
            code: 'topStudent([])',
            expected: null,
          },
        ],
        sourceChecks: [
          {
            description: 'Inga for-loopar',
            pattern: /\bfor\s*\(/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Klassens sammanfattning',
        xp: 40,
        description:
          'Läraren vill ha en sammanfattning av hela klassen. Betygen är A från 90 %, B från 60 % och annars C.',
        task: 'Uppgift: Skriv `summary(students)` som returnerar ett objekt med average (klassens medelprocent, avrundad med Math.round, 0 för en tom klass), passed (antalet godkända) och grades, ett objekt med hur många som fick varje betyg: { A: 1, B: 2, C: 0 }. Alla tre betyg ska finnas med, även när ingen fick det.',
        hints: [
          'Gör om eleverna till procent en gång, och räkna på den listan.',
          'reduce kan bygga upp ett objekt lika gärna som ett tal. Vad är startvärdet då?',
        ],
        solution: `function scoreOf(answers) {
  return answers.filter(answer => answer).length;
}

function percent(answers) {
  if (answers.length === 0) {
    return 0;
  }
  return Math.round((scoreOf(answers) / answers.length) * 100);
}

function passedNames(students) {
  return students
    .filter(student => percent(student.answers) >= 60)
    .map(student => student.name);
}

function topStudent(students) {
  if (students.length === 0) {
    return null;
  }
  const best = students.reduce((top, student) =>
    percent(student.answers) > percent(top.answers) ? student : top,
  );
  return best.name;
}

function gradeOf(value) {
  if (value >= 90) {
    return 'A';
  }
  if (value >= 60) {
    return 'B';
  }
  return 'C';
}

function summary(students) {
  const percents = students.map(student => percent(student.answers));
  const sum = percents.reduce((total, value) => total + value, 0);
  const grades = percents.reduce(
    (counts, value) => {
      counts[gradeOf(value)] = counts[gradeOf(value)] + 1;
      return counts;
    },
    { A: 0, B: 0, C: 0 },
  );
  return {
    average: students.length === 0 ? 0 : Math.round(sum / students.length),
    passed: percents.filter(value => value >= 60).length,
    grades,
  };
}`,
        tests: [
          {
            description: 'average är klassens medelprocent',
            code: "summary([{ name: 'Ada', answers: [true, true, true, true, true, true, true, true, true, false] }, { name: 'Bo', answers: [true, true, false] }, { name: 'Cy', answers: [false, false, true, false] }]).average",
            expected: 61,
          },
          {
            description: 'passed är antalet godkända',
            code: "summary([{ name: 'Ada', answers: [true, true, true, true, true, true, true, true, true, false] }, { name: 'Bo', answers: [true, true, false] }, { name: 'Cy', answers: [false, false, true, false] }]).passed",
            expected: 2,
          },
          {
            description: 'grades räknar varje betyg',
            code: "(() => { const g = summary([{ name: 'Ada', answers: [true, true, true, true, true, true, true, true, true, false] }, { name: 'Bo', answers: [true, true, false] }, { name: 'Cy', answers: [false, false, true, false] }]).grades; return [g.A, g.B, g.C]; })()",
            expected: [1, 1, 1],
          },
          {
            description: 'Alla betyg finns med, även när ingen fick dem',
            code: "(() => { const g = summary([{ name: 'Ada', answers: [true, false] }]).grades; return [g.A, g.B, g.C]; })()",
            expected: [0, 0, 1],
          },
          {
            description: 'En tom klass',
            code: '(() => { const s = summary([]); return [s.average, s.passed, s.grades.A, s.grades.B, s.grades.C]; })()',
            expected: [0, 0, 0, 0, 0],
          },
        ],
        sourceChecks: [
          {
            description: 'Inga for-loopar',
            pattern: /\bfor\s*\(/,
            forbidden: true,
          },
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

// Ett projekt som byggs klart utan ledtrådar sparas som ett eget id
// bland de klara, så att det följer med till kontot som allt annat.
export function noHintsId(project) {
  return `${project.id}-utan-ledtradar`;
}

// Bonusen för att bygga utan ledtrådar: hälften av projektets XP.
export function noHintsBonusXp(project) {
  const xp = project.steps.reduce((sum, step) => sum + step.xp, 0);
  return Math.round(xp / 2);
}
