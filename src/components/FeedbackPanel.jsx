function FeedbackPanel({ feedback }) {
  return (
    <div aria-live="polite">
      {feedback && (
        <>
          <p
            className={
              feedback.isCorrect
                ? 'feedback-message feedback-success'
                : 'feedback-message feedback-error'
            }
          >
            {feedback.message}
            {feedback.xpGained > 0 && (
              <span className="xp-pop"> +{feedback.xpGained} XP</span>
            )}
          </p>
          {feedback.output?.length > 0 && (
            <figure className="console-output">
              <figcaption>Konsol</figcaption>
              <pre>{feedback.output.join('\n')}</pre>
            </figure>
          )}
          {feedback.notes?.map(note => (
            <p key={note} className="style-note">
              <span aria-hidden="true">💡</span> Tips: {note}
            </p>
          ))}
          {feedback.error && (
            <pre className="feedback-error">{feedback.error}</pre>
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
                  {!result.passed && result.actual !== undefined && (
                    <span>
                      {' '}
                      — fick {result.actual}, förväntat {result.expected}
                    </span>
                  )}
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
