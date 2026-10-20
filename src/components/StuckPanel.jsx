import { useState } from 'react';
import { videoSearchUrl } from '../data/resources';

const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
const COMMENT_KEYS = isMac ? 'Cmd+/' : 'Ctrl+/';
// Så många felaktiga försök innan panelen öppnar sig själv.
const OPEN_AFTER = 3;

// Andra sätt att förstå när ledtrådarna inte räcker: bryt ner koden i
// mindre delar, eller lär dig ämnet från en annan källa.
// resources: banans ämnen från data/resources.js.
export default function StuckPanel({ resources, failedAttempts, onBreakDown }) {
  // null tills man själv öppnat eller stängt panelen.
  const [chosenOpen, setChosenOpen] = useState(null);
  const isOpen = chosenOpen ?? failedAttempts >= OPEN_AFTER;
  const isReact = resources.length > 0 && resources.every(item => !item.read);

  return (
    <details
      className="stuck-panel"
      open={isOpen}
      onToggle={event => setChosenOpen(event.currentTarget.open)}
    >
      <summary>🆘 Fastnat? Andra sätt att förstå</summary>

      <h3>Bryt ner koden</h3>
      <ul>
        <li>
          <strong>Se vad som händer.</strong> Lägg in{' '}
          <code>console.log(…)</code> efter raderna du är osäker på och tryck på
          Kolla lösning. Då ser du värdena i konsolen.
        </li>
        <li>
          <strong>En sak i taget.</strong> Markera rader och tryck{' '}
          <kbd>{COMMENT_KEYS}</kbd> för att kommentera bort dem. Få första delen
          att fungera innan du tar nästa.
        </li>
        <li>
          <strong>Håll musen över</strong> det du inte känner igen i editorn, så
          ser du vad det är.
        </li>
        <li>
          <strong>Förklara koden högt</strong>, rad för rad, som för en kompis
          eller en gummianka 🦆. Ofta hittar man felet själv halvvägs.
        </li>
      </ul>
      <button type="button" onClick={onBreakDown}>
        📋 Bryt ner den på Lekplatsen
      </button>
      <p className="muted stuck-note">
        Din kod kopieras till Lekplatsen, där du kan köra bitar av den fritt
        utan tester.
      </p>

      {resources.length > 0 && (
        <>
          <h3>Lär dig ämnet på ett annat sätt</h3>
          <ul className="stuck-resources">
            {resources.map(item => (
              <li key={item.topic}>
                <strong>{item.topic}</strong>
                <span>
                  {item.read && (
                    <>
                      <a href={item.read} target="_blank" rel="noreferrer">
                        📖 Läs på javascript.info
                      </a>
                      {' · '}
                    </>
                  )}
                  <a
                    href={videoSearchUrl(item.video)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    🎥 Hitta en video
                  </a>
                </span>
              </li>
            ))}
          </ul>
          <p className="muted stuck-note">
            {isReact &&
              'På react.dev finns övningar längst ner på varje sida i dokumentationen. '}
            Videorna är mest på engelska. Sätt på textning och sänk hastigheten
            om det går fort.
          </p>
        </>
      )}
    </details>
  );
}
