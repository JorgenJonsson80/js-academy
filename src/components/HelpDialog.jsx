import { useEffect, useRef } from 'react';

const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
const MOD = isMac ? 'Cmd' : 'Ctrl';

// Instruktioner och tips. Öppnas automatiskt första gången man besöker
// sidan, och sedan från knappen Hjälp i sidhuvudet.
export default function HelpDialog({ onClose }) {
  const dialogRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    // Fokus på Nu kör vi!, så att Enter stänger. Texten ska ändå läsas
    // från början.
    startRef.current?.focus();
    if (dialog) dialog.scrollTop = 0;
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="quiz help-dialog"
      aria-labelledby="help-title"
      onClose={onClose}
    >
      <h2 id="help-title">👋 Välkommen!</h2>
      <p>
        Här lär du dig JavaScript och sedan React genom att skriva riktig kod.
        Du behöver inte kunna något innan.
      </p>

      <ol className="help-steps">
        <li>
          <strong>Läs uppgiften.</strong> Ny på det? Öppna{' '}
          <em>📖 Ny på det här?</em> för en förklaring och ett exempel.
        </li>
        <li>
          <strong>Skriv din kod</strong> i den mörka rutan.
        </li>
        <li>
          <strong>Tryck på Kolla lösning.</strong> Du ser direkt vad som blev
          rätt, och under <em>Konsol</em> det din kod skrev ut.
        </li>
      </ol>
      <p className="muted">
        Fel är helt okej – du får ledtrådar på vägen och kan alltid se lösningen
        till slut.
      </p>

      <details className="help-more">
        <summary>Fler tips: banor, projekt, editorn och knep</summary>
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
            På <strong>🧪 Lekplatsen</strong> skriver du fri kod utan tester.
            När du byggt en banas tre projekt får du idéer att bygga helt själv.
          </li>
        </ul>

        <h3>Editorn</h3>
        <ul>
          <li>
            <kbd>{MOD}+Shift+F</kbd> eller <kbd>{MOD}+S</kbd> formaterar koden,
            så att indrag och semikolon blir snygga.
          </li>
          <li>
            Förslag dyker upp när du skriver: dina egna variabler, egenskaperna
            i dina objekt efter en punkt och metoder som <code>console.</code>.
            Välj med <kbd>Enter</kbd>.
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
            <strong>Kör rad för rad.</strong> Knappen 👣 stegar igenom koden en
            rad i taget och visar vad varje variabel innehåller. Perfekt för
            loopar, <code>map</code> och <code>reduce</code>.
          </li>
          <li>
            <strong>Varför renderade den?</strong> Under förhandsvisningen i
            React-övningarna, och på Lekplatsen med ⚛️ React-komponent, visar en
            logg vad som får varje komponent att rendera om.
          </li>
          <li>
            <strong>Använd console.log.</strong> Skriv ut värden mitt i koden
            för att se vad som faktiskt händer. Det gör proffs också.
          </li>
          <li>
            <strong>Små steg.</strong> Skriv lite, kör, och skriv lite till. Det
            är lättare att hitta felet i tre nya rader än i trettio.
          </li>
          <li>
            <strong>Fastnat?</strong> Under varje övning finns{' '}
            <em>🆘 Fastnat?</em> med tips på hur du bryter ner koden, och länkar
            till texter och videor som förklarar ämnet på ett annat sätt. Där
            kan du också kopiera en färdig fråga till en AI, som ber den hjälpa
            dig förstå i stället för att ge dig svaret.
          </li>
          <li>
            <strong>Kolla facit efteråt.</strong> När du klarat en uppgift kan
            du jämföra med facit. Det finns ofta flera bra lösningar.
          </li>
          <li>
            <strong>Logga in</strong> för att spara framstegen i ditt konto, så
            följer de med till andra enheter.
          </li>
        </ul>
      </details>

      <form method="dialog">
        <button type="submit" className="primary-button" ref={startRef}>
          Nu kör vi!
        </button>
      </form>
    </dialog>
  );
}
