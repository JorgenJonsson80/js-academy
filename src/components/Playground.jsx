import { useEffect, useState } from 'react';
import { ideaStarterCode } from '../data/ideas';
import { runTests } from '../runner/runTests';
import CodeEditor from './CodeEditor';

const STORAGE_KEY = 'academy-playground';
const FREE = 'fritt';

function loadCodes() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? parsed
      : {};
  } catch {
    return {};
  }
}

// Text inom `backticks` visas som kod, precis som i uppgifterna.
function WithCode({ text }) {
  return text.split(/`([^`]+)`/).map((part, index) =>
    index % 2 === 1 ? (
      <code key={index} className="task-code">
        {part}
      </code>
    ) : (
      part
    ),
  );
}

// En fri editor utan tester. Man kör koden och ser konsolen, och
// bestämmer själv när den är klar. Koden sparas per idé.
// ideas: alla idéer, med unlocked och trackTitle.
export default function Playground({ ideas, ideaId, onSelectIdea, onBack }) {
  const idea = ideas.find(item => item.id === ideaId && item.unlocked) ?? null;
  const key = idea?.id ?? FREE;
  const [codes, setCodes] = useState(loadCodes);
  const [run, setRun] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const code = codes[key] ?? ideaStarterCode(idea);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(codes));
    } catch {
      // Utan localStorage sparas koden bara tills sidan laddas om.
    }
  }, [codes]);

  function handleCodeChange(newCode) {
    setCodes(previous => ({ ...previous, [key]: newCode }));
  }

  function handleSelect(event) {
    setRun(null);
    onSelectIdea(event.target.value === FREE ? null : event.target.value);
  }

  async function handleRun() {
    setIsRunning(true);
    const result = await runTests(code, [], [], {});
    setIsRunning(false);
    setRun(result);
  }

  function handleReset() {
    setCodes(previous => {
      const rest = { ...previous };
      delete rest[key];
      return rest;
    });
    setRun(null);
  }

  const tracksWithIdeas = [...new Set(ideas.map(item => item.trackTitle))];

  return (
    <section
      className="lesson-panel playground"
      aria-labelledby="playground-title"
    >
      <button type="button" className="playground-back" onClick={onBack}>
        ← Tillbaka till övningarna
      </button>
      <h2 id="playground-title">🧪 Lekplatsen</h2>
      <p>
        Här finns inga tester och inget facit. Skriv vad du vill, tryck på{' '}
        <strong>Kör koden</strong> och se vad som händer i konsolen. Du
        bestämmer själv när det är klart.
      </p>

      <label className="playground-pick">
        Bygg
        <select value={key} onChange={handleSelect}>
          <option value={FREE}>Fritt – ingen idé</option>
          {tracksWithIdeas.map(trackTitle => (
            <optgroup key={trackTitle} label={trackTitle}>
              {ideas
                .filter(item => item.trackTitle === trackTitle)
                .map(item => (
                  <option
                    key={item.id}
                    value={item.id}
                    disabled={!item.unlocked}
                  >
                    {item.emoji} {item.title}
                    {item.unlocked ? '' : ' 🔒'}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </label>
      <p className="muted playground-locked-note">
        🔒 Idéerna låses upp när du byggt alla tre projekt på banan.
      </p>

      {idea && (
        <aside className="idea-card">
          <h3>
            {idea.emoji} {idea.title}
          </h3>
          <p>{idea.summary}</p>
          <ol>
            {idea.goals.map(goal => (
              <li key={goal}>
                <WithCode text={goal} />
              </li>
            ))}
          </ol>
          <p>
            <strong>Extra:</strong> <WithCode text={idea.extra} />
          </p>
        </aside>
      )}

      <CodeEditor code={code} onCodeChange={handleCodeChange} />
      <div className="editor-actions">
        <button
          className="primary-button"
          type="button"
          onClick={handleRun}
          disabled={isRunning}
        >
          {isRunning ? 'Kör koden…' : '▶ Kör koden'}
        </button>
        <button type="button" onClick={handleReset}>
          Börja om
        </button>
      </div>

      <div aria-live="polite">
        {run?.error && <pre className="feedback-error">{run.error}</pre>}
        {run && !run.error && (
          <figure className="console-output">
            <figcaption>Konsol</figcaption>
            <pre>
              {run.output?.length > 0
                ? run.output.join('\n')
                : 'Inget skrevs ut. Använd console.log för att se vad koden gör.'}
            </pre>
          </figure>
        )}
        {run?.notes?.map(note => (
          <p key={note} className="style-note">
            <span aria-hidden="true">💡</span> Tips: {note}
          </p>
        ))}
      </div>
    </section>
  );
}
