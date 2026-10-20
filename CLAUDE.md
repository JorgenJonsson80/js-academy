# JS / React Academy

En interaktiv kodskola på svenska för den som aldrig kodat. Eleven skriver
riktig kod i webbläsaren, koden rättas med tester och eleven går från
JavaScript-grunder till React. Publiceras på GitHub Pages:
https://jorgenjonsson80.github.io/js-academy/

Vite + React 19 (JavaScript, inte TypeScript), CodeMirror 6 som editor,
Supabase för inloggning och synkade framsteg (valfritt – utan nycklar
sparas allt i localStorage).

## Kommandon

- `npm run dev` – utvecklingsserver
- `npx vitest run` – alla tester (cirka 2 700, tar några sekunder)
- `npm run lint` och `npx prettier --check src`
- `npm run build`

Push till `main` kör testerna och publicerar via
`.github/workflows/deploy.yml`. Byggs med `base: /js-academy/`.

## Arkitektur

- `src/data/` – innehållet är data, inte kod:
  - `tracks.js` banorna i ordning, med `docs`-länkar och belöning
  - `lesson.js` alla övningar, `projects.js` miniprojekten efter varje bana
  - `ideas.js` egna idéer för Lekplatsen, `resources.js` javascript.info-
    och YouTube-sökningar för Fastnat?-panelen, `quiz.js` nivåtestet
  - `stages.js` figuren som växer en ålder per klar bana
- `src/runner/` – kör elevens kod:
  - `runTests.js` startar en ny Web Worker per körning med 2 s timeout, så
    att en oändlig loop aldrig fryser sidan
  - `evaluate.js` rättar (tester, konsolutskrift, stiltips) och
    `stepThrough` för Kör rad för rad
  - `instrument.js` skriver om koden med Babel så att varje sats sparar ett
    steg med variablernas värden
  - `modules.js` eget modulsystem för import/export, `jsx.js` via sucrase
  - `fakes.js` låtsasversioner av localStorage, fetch och timers – elevens
    kod får aldrig röra appens riktiga data
  - `livePreview.js` + `renderTracker.js` förhandsvisning av komponenter
    och loggen "Varför renderade den?"
  - `friendlyErrors.js` förklarar vanliga felmeddelanden på svenska
- `src/editor/codeInfo.js` – hover ("vad tillhör det här?") och förslag
  efter punkt, byggt på CodeMirrors syntaxträd
- `src/components/` – UI. `App.jsx` äger all progress-state.

## En övning

```js
{
  id: 'functions-04', track: 'functions', title: '…', xp: 10,
  description: '…',          // kort intro
  explain: '…',              // "Ny på det här?" – för den som aldrig sett det
  example: '…',              // kod som visar idén, inte lösningen
  task: 'Uppgift: …',        // `backticks` visas som kod
  starterCode: '// Skriv din kod här',
  solution: '…',             // facit
  hints: ['…', '…', '…'],    // från vag till nästan lösningen
  tests: [{ description: '…', code: 'getDiscount(150)', expected: 20 }],
  sourceChecks: [{ description: '…', pattern: /for\s*\(/, forbidden: true }],
  isBoss, addedLater, fileName, files, preview, // vid behov
}
```

Konsoltester använder `code: '__logs'` och en array som `expected`.

## Regler för innehåll

Det här är en lärplattform – innehållets kvalitet går före allt annat.

- All text på svenska, skriven för någon som aldrig kodat. Förklara
  **när och varför** man använder något, inte bara vad det är. Användaren
  minns att det svåra var att veta *när* man tar till ett verktyg.
- Facit får bara använda det som lärts ut i tidigare banor (t.ex. `if` i
  stället för `? :` före Modern JS) och ska vara formaterat med Prettier.
  `src/data/quality.test.js` kontrollerar båda, och att startkoden
  underkänns och att facit går att köra rad för rad.
- Tester ska ha ett vanligt anrop som `fn(…)`, så att Kör rad för rad kan
  visa funktioner som bara definieras.
- Projektsteg har `why`: varför just det här valet och inte alternativet.
- Testa resultatet, inte exakt hur koden är skriven. Jämför aldrig hela
  objekt (nyckelordningen spelar roll). Använd `sourceChecks` sparsamt.
- Nya lektioner i en bana som redan finns får `addedLater: true`, så att
  den som redan klarat banan inte förlorar den.
- Nya projektbanor behöver tre idéer i `ideas.js` och resurser i
  `resources.js` (testerna kräver det).
- Uppdatera `HelpDialog.jsx` när funktioner läggs till eller ändras.

## Kod

- Prettier: `singleQuote`, `arrowParens: avoid`. Kommentarer på svenska
  och förklarar varför, inte vad.
- Två syskon i samma förälder får aldrig samma `key` – det har orsakat
  buggar två gånger (komponenter som inte byts ut när lektionen byts).
  Använd prefix: ``key={`stuck-${lesson.id}`}``.
- localStorage-läsningar ligger i try/catch och tål skräpdata.
- Kortkommandon: läs `event.code`, inte tecknet – ⌥⇧F blir ett
  specialtecken på Mac.

## Arbetssätt

- Claude bygger appen, användaren lär sig genom att använda den. Ge inte
  användaren kodningsuppgifter i appens egen kod.
- Föreslå nytt innehåll (projekt, idéer) och låt användaren reagera innan
  det byggs.
- Testa i en riktig webbläsare (Playwright mot `npx vite`) innan commit,
  inte bara med Vitest. Selektorer som `text=Kolla lösning` kan träffa
  uppgiftstexten – använd `button:has-text(…)`.
- Svara användaren på svenska.
