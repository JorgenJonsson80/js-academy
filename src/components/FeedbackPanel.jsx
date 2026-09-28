function FeedbackPanel({ feedback }) {
  return (
    <div aria-live="polite">
      {feedback && (
        <>
          <p
            className={
              feedback.isCorrect ? 'feedback-success' : 'feedback-error'
            }
          >
            {feedback.message}
          </p>
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
