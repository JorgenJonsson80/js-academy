// Koden på Lekplatsen sparas i webbläsaren, en kod per idé.
const STORAGE_KEY = 'academy-playground';
// Platsen för fri kod, och platsen för kod som kopierats från en övning.
export const PLAYGROUND_FREE = 'fritt';
export const PLAYGROUND_COPY = 'kopia';
// Platsen för en egen React-komponent, med en liten mall att börja från.
export const PLAYGROUND_REACT = 'react';
export const REACT_STARTER = `import { useState } from 'react';

// Ändra komponenten och tryck på Kör koden. Klicka sedan i
// förhandsvisningen och se i loggen varför den renderar.
export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Hej från Lekplatsen!</h1>
      <button onClick={() => setCount(count + 1)}>Klickat {count} gånger</button>
    </div>
  );
}
`;

export function loadPlaygroundCodes() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? parsed
      : {};
  } catch {
    return {};
  }
}

export function savePlaygroundCodes(codes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(codes));
  } catch {
    // Utan localStorage sparas koden bara tills sidan laddas om.
  }
}

// Kopian får en egen plats, så att den fria koden inte skrivs över.
export function copyToPlayground(code, lessonTitle) {
  savePlaygroundCodes({
    ...loadPlaygroundCodes(),
    [PLAYGROUND_COPY]: `// Kopia från övningen: ${lessonTitle}\n// Bryt ner den: kör en bit i taget och lägg in console.log.\n\n${code}`,
  });
}
