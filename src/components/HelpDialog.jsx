import { useEffect, useRef } from 'react';

const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
const MOD = isMac ? 'Cmd' : 'Ctrl';

// Instruktioner och tips. Öppnas automatiskt första gången man besöker
// sidan, och sedan från knappen Hjälp i sidhuvudet.
export default function HelpDialog({ onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    // Knappen längst ner får fokus, men texten ska läsas från början.
    if (dialog) dialog.scrollTop = 0;
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="quiz help-dialog"
      aria-labelledby="help-title"
      onClose={onClose}
    >
      <h2 id="help-title">👋 Välkommen till JS / React Academy</h2>
      <p>
        Du lär dig JavaScript och React genom att skriva riktig kod. Först
        grunderna i JavaScript, sedan det som behövs för React, och sist React
        självt.
      </p>

      <h3>Så funkar det</h3>
      <ol>
        <li>
          <strong>Läs uppgiften.</strong> Är det nytt för dig, öppna{' '}
          <em>Ny på det här?</em> för en förklaring och ett exempel.
        </li>
        <li>
          <strong>Skriv koden</strong> i editorn och tryck på{' '}
          <em>Kolla lösning</em>. Du ser vilka tester som gick igenom och vad
          koden skrev ut i konsolen.
        </li>
        <li>
          <strong>Fastnat?</strong> Be om en ledtråd när du vill. Efter några
          felaktiga försök kommer de av sig själva, och efter fyra försök kan du
          se lösningen.
        </li>
        <li>
          <strong>Klara övningen</strong> så får du XP. När en bana är klar
          växer din figur och nästa bana låses upp.
        </li>
      </ol>

      <h3>Banor, projekt och Lekplatsen</h3>
      <ul>
        <li>
          Kan du redan en del? Gör <em>nivåtestet</em> eller{' '}
          <em>Testa dig på banan</em> för att hoppa fram.
        </li>
        <li>
          Varje bana har en <strong>boss</strong>, en större uppgift utan
          ledtrådar som visar att du kan banan.
        </li>
        <li>
          När en bana är klar låses tre <strong>projekt</strong> upp. Bygg dem
          med eller utan ledtrådar. Utan ledtrådar ger +50 % XP och en 🔥.
        </li>
        <li>
          På <strong>🧪 Lekplatsen</strong> skriver du fri kod utan tester. När
          du byggt en banas tre projekt får du idéer att bygga helt själv.
        </li>
      </ul>

      <h3>Editorn</h3>
      <ul>
        <li>
          <kbd>{MOD}+Shift+F</kbd> eller <kbd>{MOD}+S</kbd> formaterar koden, så
          att indrag och semikolon blir snygga.
        </li>
        <li>
          Förslag dyker upp när du skriver: dina egna variabler, egenskaperna i
          dina objekt efter en punkt och metoder som <code>console.</code>. Välj
          med <kbd>Enter</kbd>.
        </li>
        <li>
          Håll musen över ett namn för att se vad det är och vad det tillhör,
          eller över ett nyckelord för att se när man använder det.
        </li>
      </ul>

      <h3>Tips och trix</h3>
      <ul>
        <li>
          <strong>Läs felmeddelandet.</strong> Det berättar ofta exakt vad som
          är fel, t.ex. <code>ReferenceError: x is not defined</code> när ett
          namn är felstavat.
        </li>
        <li>
          <strong>Använd console.log.</strong> Skriv ut värden mitt i koden för
          att se vad som faktiskt händer. Det gör proffs också.
        </li>
        <li>
          <strong>Små steg.</strong> Skriv lite, kör, och skriv lite till. Det
          är lättare att hitta felet i tre nya rader än i trettio.
        </li>
        <li>
          <strong>Kolla facit efteråt.</strong> När du klarat en uppgift kan du
          jämföra med facit. Det finns ofta flera bra lösningar.
        </li>
        <li>
          <strong>Logga in</strong> för att spara framstegen i ditt konto, så
          följer de med till andra enheter.
        </li>
      </ul>

      <form method="dialog">
        <button type="submit" className="primary-button">
          Nu kör vi!
        </button>
      </form>
    </dialog>
  );
}
