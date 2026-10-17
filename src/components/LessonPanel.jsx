import CodeEditor from './CodeEditor';
import FeedbackPanel from './FeedbackPanel';
import FileView from './FileView';
import HintPanel from './HintPanel';
import Preview from './Preview';
import SolutionCompare from './SolutionCompare';

// Text inom `backticks` i uppgiften visas som kod, så att det syns
// vilka funktioner och variabler eleven ska skapa.
function TaskText({ text }) {
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

export default function LessonPanel({
  lesson,
  project,
  projectMode,
  onChooseProjectMode,
  noHintsBonusXp,

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
  canTestOut,
  onTestOut,
  bossLeft,
  onGoToBoss,
  canUndoReset,
  onUndoReset,
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
        {project ? (
          <>
            <span className="chip chip-project">
              🛠️ Projekt: {project.title}
            </span>
            <span className="chip">
              Steg {lesson.stepNumber} av {project.steps.length}
            </span>
          </>
        ) : (
          <>
            <span className="chip">
              {trackTitle} · {completedInTrack}/{trackLessonCount}
            </span>
            <span className="chip">
              Övning {lessonNumber} av {lessonCount}
            </span>
          </>
        )}
        <span className="chip chip-xp">⭐ {lesson.xp} XP</span>
        {lesson.isBoss && <span className="chip chip-boss">👑 Boss</span>}
        {projectMode === 'noHints' && (
          <span className="chip chip-boss">🔥 Utan ledtrådar</span>
        )}
        {isCompleted && <span className="chip chip-done">✓ Klar</span>}
      </p>
      {canTestOut && (
        <button type="button" className="test-out-banner" onClick={onTestOut}>
          ⚡ Kan du redan {trackTitle}? Testa dig på banan och hoppa vidare
        </button>
      )}
      {bossLeft && bossLeft.id !== lesson.id && (
        <button
          type="button"
          className="test-out-banner"
          onClick={() => onGoToBoss(bossLeft)}
        >
          ⚡ Du klarade testet. 👑 Ta bossen{' '}
          {bossLeft.title.replace('Boss: ', '')} för att få prylen
        </button>
      )}
      <h2 id="lesson-title" className="lesson-title">
        {lesson.title}
      </h2>
      <p className="lesson-description">{lesson.description}</p>
      {lesson.explain && (
        <details className="lesson-explain">
          <summary>📖 Ny på det här? Läs mer och se ett exempel</summary>
          {lesson.explain.split('\n\n').map(paragraph => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {lesson.example && (
            <figure>
              <figcaption>Exempel, med andra värden än i uppgiften:</figcaption>
              <pre>
                <code>{lesson.example}</code>
              </pre>
            </figure>
          )}
        </details>
      )}
      {project && projectMode === null && (
        <div className="mode-choice">
          <p>
            <strong>Hur vill du bygga {project.title}?</strong> Du kan byta till
            ledtrådar senare om du kör fast.
          </p>
          <button type="button" onClick={() => onChooseProjectMode('hints')}>
            💡 Med ledtrådar
          </button>
          <button
            type="button"
            className="primary-button"
            onClick={() => onChooseProjectMode('noHints')}
          >
            🔥 Utan ledtrådar, +{noHintsBonusXp} bonus-XP
          </button>
        </div>
      )}
      <p className="lesson-task">
        <TaskText text={lesson.task} />
      </p>
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
        {canUndoReset && (
          <button type="button" onClick={onUndoReset}>
            ↩ Ångra återställning
          </button>
        )}
      </div>
      <FeedbackPanel feedback={feedback} />
      {lesson.why && (feedback?.isCorrect || isCompleted) && (
        <aside className="lesson-why">
          <strong>💭 Varför så här?</strong> {lesson.why}
        </aside>
      )}
      {feedback?.isCorrect && !showSolution && (
        <SolutionCompare code={code} solution={lesson.solution} />
      )}
      <HintPanel
        key={lesson.id}
        hints={project && projectMode !== 'hints' ? [] : lesson.hints}
        failedAttempts={failedAttempts}
        isBoss={lesson.isBoss}
      />
      {projectMode === 'noHints' && !isCompleted && (
        <button type="button" onClick={() => onChooseProjectMode('hints')}>
          💡 Byt till med ledtrådar (bonusen försvinner)
        </button>
      )}
      {failedAttempts >= (projectMode === 'noHints' ? 6 : 4) && (
        <button type="button" onClick={onShowSolution}>
          Visa lösning
          {projectMode === 'noHints' && ' (bonusen försvinner)'}
        </button>
      )}
      {showSolution && (
        <pre>
          <code>{lesson.solution}</code>
        </pre>
      )}
      <div className="lesson-navigation">
        <button type="button" onClick={onPrevious} disabled={!canPrevious}>
          {project ? 'Föregående steg' : 'Föregående övning'}
        </button>
        <button type="button" onClick={onNext} disabled={!canNext}>
          {project ? 'Nästa steg' : 'Nästa övning'}
        </button>
      </div>
    </section>
  );
}
