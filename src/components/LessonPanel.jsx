import CodeEditor from './CodeEditor';
import FeedbackPanel from './FeedbackPanel';
import FileView from './FileView';
import HintPanel from './HintPanel';
import Preview from './Preview';

export default function LessonPanel({
  lesson,

  trackTitle,
  docs,
  completedInTrack,
  trackLessonCount,
  lessonNumber,
  lessonCount,
  code,
  onCodeChange,
  onCheck,
  isChecking,
  onResetCode,
  feedback,
  failedAttempts,
  showSolution,
  onShowSolution,
  onPrevious,
  onNext,
  canPrevious,
  canNext,
  isCompleted,
}) {
  return (
    <section className="lesson-panel" aria-labelledby="lesson-title">
      <p className="lesson-meta">
        <span className="chip">
          {trackTitle} · {completedInTrack}/{trackLessonCount}
        </span>
        <span className="chip">
          Övning {lessonNumber} av {lessonCount}
        </span>
        <span className="chip chip-xp">⭐ {lesson.xp} XP</span>
        {lesson.isBoss && <span className="chip chip-boss">👑 Boss</span>}
        {isCompleted && <span className="chip chip-done">✓ Klar</span>}
      </p>
      <h2 id="lesson-title" className="lesson-title">
        {lesson.title}
      </h2>
      <p className="lesson-description">{lesson.description}</p>
      <p className="lesson-task">{lesson.task}</p>
      {docs?.length > 0 && (
        <details className="lesson-docs">
          <summary>📚 Läs mer i dokumentationen</summary>
          <ul>
            {docs.map(doc => (
              <li key={doc.url}>
                <a href={doc.url} target="_blank" rel="noreferrer">
                  {doc.title}
                </a>{' '}
                <span className="muted">
                  ({doc.url.includes('mozilla.org') ? 'MDN' : 'react.dev'})
                </span>
              </li>
            ))}
          </ul>
        </details>
      )}
      {Object.entries(lesson.files ?? {}).map(([fileName, source]) => (
        <FileView key={fileName} fileName={fileName} source={source} />
      ))}
      <CodeEditor
        code={code}
        onCodeChange={onCodeChange}
        fileName={lesson.fileName}
      />
      {feedback?.previewSource && <Preview source={feedback.previewSource} />}
      <div className="editor-actions">
        <button
          className="primary-button"
          type="button"
          onClick={onCheck}
          disabled={isChecking}
        >
          {isChecking ? 'Kör koden…' : 'Kolla lösning'}
        </button>
        <button type="button" onClick={onResetCode}>
          Återställ kod
        </button>
      </div>
      <FeedbackPanel feedback={feedback} />
      <HintPanel
        hints={lesson.hints}
        failedAttempts={failedAttempts}
        isBoss={lesson.isBoss}
      />
      {failedAttempts >= 4 && (
        <button type="button" onClick={onShowSolution}>
          Visa lösning
        </button>
      )}
      {showSolution && (
        <pre>
          <code>{lesson.solution}</code>
        </pre>
      )}
      <div className="lesson-navigation">
        <button type="button" onClick={onPrevious} disabled={!canPrevious}>
          Föregående övning
        </button>
        <button type="button" onClick={onNext} disabled={!canNext}>
          Nästa övning
        </button>
      </div>
    </section>
  );
}
