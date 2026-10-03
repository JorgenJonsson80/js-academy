import CodeEditor from './CodeEditor';
import FeedbackPanel from './FeedbackPanel';
import HintPanel from './HintPanel';

export default function LessonPanel({
  lesson,

  trackTitle,
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
      <p>Bana: {trackTitle}</p>
      <p>
        Klarade i banan: {completedInTrack} av {trackLessonCount}
      </p>
      {lesson.isBoss && <p className="boss-label">Boss Level</p>}
      <h2 id="lesson-title">{lesson.title}</h2>
      <p>Övningen ger: {lesson.xp}xp</p>
      {isCompleted && <p className="feedback-success">✓ Övningen är klar</p>}
      <p>
        Övning {lessonNumber} av {lessonCount}
      </p>

      <p>{lesson.description}</p>
      <p>{lesson.task}</p>
      {Object.entries(lesson.files ?? {}).map(([fileName, source]) => (
        <figure className="lesson-file" key={fileName}>
          <figcaption>{fileName}</figcaption>
          <pre>
            <code>{source}</code>
          </pre>
        </figure>
      ))}
      <CodeEditor
        code={code}
        onCodeChange={onCodeChange}
        fileName={lesson.fileName}
      />
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
