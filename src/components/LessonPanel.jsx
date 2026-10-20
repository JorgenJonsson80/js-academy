import { exampleCall, useStepper } from '../lib/useStepper';
import CodeEditor from './CodeEditor';
import FeedbackPanel from './FeedbackPanel';
import FileView from './FileView';
import HintPanel from './HintPanel';
import Preview from './Preview';
import SolutionCompare from './SolutionCompare';
import StepPanel from './StepPanel';
import StuckPanel from './StuckPanel';

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
  freeBuildIdeas,
  onOpenIdea,
  resources,
  onBreakDown,
  canStep,
  stage,

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
  const stepper = useStepper(code, {
    fileName: lesson.fileName,
    files: lesson.files,
    example: exampleCall(lesson.tests),
  });
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
        // I de allra första övningarna är förklaringen öppen från början,
        // så att den som aldrig kodat hittar den.
        <details
          key={`explain-${lesson.id}`}
          className="lesson-explain"
          open={!project && lessonNumber <= 3}
        >
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
        activeLine={stepper.activeLine}
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
        {canStep && stepper.frames === null && (
          <button
            type="button"
            onClick={stepper.start}
            disabled={stepper.isRunning}
            title="Se koden köras en rad i taget, med variablernas värden"
          >
            {stepper.isRunning ? 'Kör…' : '👣 Kör rad för rad'}
          </button>
        )}
        <button type="button" onClick={onResetCode}>
          Återställ kod
        </button>
        {canUndoReset && (
          <button type="button" onClick={onUndoReset}>
            ↩ Ångra återställning
          </button>
        )}
      </div>
      {stepper.frames && <StepPanel stepper={stepper} />}
      <FeedbackPanel feedback={feedback} code={code} stage={stage} />
      {lesson.why && (feedback?.isCorrect || isCompleted) && (
        <aside className="lesson-why">
          <strong>💭 Varför så här?</strong> {lesson.why}
        </aside>
      )}
      {project &&
        isCompleted &&
        lesson.stepNumber === project.steps.length &&
        freeBuildIdeas.length > 0 && (
          <aside className="idea-card">
            <strong>🧪 Bygg helt själv</strong>
            <p>
              Nu när du byggt alla tre projekt på banan, testa gärna att bygga
              något helt själv – utan tester och utan facit. Till exempel:
            </p>
            <div className="idea-buttons">
              {freeBuildIdeas.map(idea => (
                <button
                  key={idea.id}
                  type="button"
                  onClick={() => onOpenIdea(idea.id)}
                  title={idea.summary}
                >
                  {idea.emoji} {idea.title}
                </button>
              ))}
            </div>
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
      {!isCompleted && (
        <StuckPanel
          key={`stuck-${lesson.id}`}
          resources={resources}
          failedAttempts={failedAttempts}
          onBreakDown={onBreakDown}
        />
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
