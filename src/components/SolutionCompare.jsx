import { compareWithSolution } from '../runner/compare';

const messages = {
  longer:
    'Din lösning fungerar! Den går att skriva kortare. Så här ser facit ut:',
  different:
    'Din lösning fungerar! Facit är skrivet på ett annat sätt, jämför gärna:',
};

// Visas när svaret är rätt, så att eleven kan jämföra med facit.
function SolutionCompare({ code, solution }) {
  const result = compareWithSolution(code, solution);
  if (result === 'same') return null;

  return (
    <figure className="solution-compare">
      <figcaption>{messages[result]}</figcaption>
      <pre>
        <code>{solution}</code>
      </pre>
    </figure>
  );
}

export default SolutionCompare;
