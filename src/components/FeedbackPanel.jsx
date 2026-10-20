import Avatar from './Avatar';
import ErrorHint from './ErrorHint';

// Konsolens rader som text, t.ex. Hej · Då, eller ingenting.
function consoleText(lines) {
  return lines.length > 0 ? lines.join(' · ') : 'ingenting';
}

function FeedbackPanel({ feedback, code, stage }) {
  // Ett fel när koden körs hamnar sist i konsolen.
  const runtimeError = feedback?.output?.at(-1)?.match(/^[A-Z]\w*Error: /)
    ? feedback.output.at(-1)
    : null;

  return (
    <div aria-live="polite">
      {feedback && (
        <>
          {feedback.isCorrect ? (
            <p className="feedback-message feedback-success">
              {feedback.message}
              {feedback.xpGained > 0 && (
                <span className="xp-pop"> +{feedback.xpGained} XP</span>
              )}
            </p>
          ) : (
            <div className="feedback-try-again">
              {stage && <Avatar stage={stage} size={44} />}
              <p className="feedback-bubble">{feedback.message}</p>
            </div>
          )}
          {feedback.output?.length > 0 && (
            <figure className="console-output">
              <figcaption>Konsol</figcaption>
              <pre>{feedback.output.join('\n')}</pre>
            </figure>
          )}
          {runtimeError && <ErrorHint message={runtimeError} code={code} />}
          {feedback.notes?.map(note => (
            <p key={note} className="style-note">
              <span aria-hidden="true">💡</span> Tips: {note}
            </p>
          ))}
          {feedback.error && (
            <>
              <pre className="feedback-error">{feedback.error}</pre>
              <ErrorHint message={feedback.error} code={code} />
            </>
          )}
          {feedback.results?.length > 0 && (
            <ul className="test-results">
              {feedback.results.map(result => (
                <li
                  key={result.description}
                  className={
                    result.passed ? 'feedback-success' : 'feedback-error'
                  }
                >
                  {result.passed ? '✓ ' : '✗ '}
                  {result.description}
                  {!result.passed &&
                    (result.consoleActual ? (
                      <span>
                        {' '}
                        — konsolen visade{' '}
                        <code>{consoleText(result.consoleActual)}</code> men
                        skulle visa{' '}
                        <code>{consoleText(result.consoleExpected)}</code>
                      </span>
                    ) : /^[A-Z]\w*Error: /.test(result.actual ?? '') ? (
                      <span>
                        {' '}
                        — koden stoppade med ett fel innan testet hann klart
                      </span>
                    ) : (
                      result.actual !== undefined && (
                        <span>
                          {' '}
                          — fick {result.actual}, förväntat {result.expected}
                        </span>
                      )
                    ))}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default FeedbackPanel;
