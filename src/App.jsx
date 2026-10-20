import { useEffect, useRef, useState } from 'react';
import './App.css';
import TrackList from './components/TrackList';
import LessonPanel from './components/LessonPanel';

import { lessons } from './data/lesson';
import { tracks } from './data/tracks';
import Avatar from './components/Avatar';
import Collection from './components/Collection';
import HeroCard from './components/HeroCard';
import LevelUp from './components/LevelUp';
import { getGrowth, trackProgress } from './data/stages';
import { runTests } from './runner/runTests';
import AccountPanel from './components/AccountPanel';
import { useCloudProgress } from './lib/useCloudProgress';
import Quiz from './components/Quiz';
import HelpDialog from './components/HelpDialog';
import Playground from './components/Playground';
import { ideas } from './data/ideas';
import { resources } from './data/resources';
import { copyToPlayground, PLAYGROUND_COPY } from './lib/playgroundStorage';
import { quiz } from './data/quiz';
import {
  isProjectComplete,
  noHintsBonusXp,
  noHintsId,
  projects,
  projectSteps,
} from './data/projects';

// Övningarna först och projektstegen efter, så att en övnings plats
// i lessons är samma som i exercises.
const exercises = [...lessons, ...projectSteps];

function App() {
  // Öppna övningen man senast arbetade med.
  const [lessonIndex, setLessonIndex] = useState(() => {
    try {
      const savedId = localStorage.getItem('academy-current-lesson');
      const index = exercises.findIndex(item => item.id === savedId);
      return index === -1 ? 0 : index;
    } catch {
      return 0;
    }
  });

  const lesson = exercises[lessonIndex];
  const track = tracks.find(track => track.id === lesson.track);
  const project = projects.find(item => item.id === lesson.project) ?? null;
  const [feedback, setFeedback] = useState(null);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [celebration, setCelebration] = useState(null);
  // Räknas upp vid varje kontroll och lektionsbyte, så att ett
  // sent testresultat inte hamnar på fel lektion.
  const checkIdRef = useRef(0);
  const [drafts, setDrafts] = useState(() => {
    try {
      const saved = localStorage.getItem('academy-drafts');
      const parsed = JSON.parse(saved ?? '{}');

      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        return {};
      }

      return Object.fromEntries(
        Object.entries(parsed).filter(([, value]) => typeof value === 'string'),
      );
    } catch {
      return {};
    }
  });
  const [code, setCode] = useState(drafts[lesson.id] ?? lesson.starterCode);
  const [completedIds, setCompletedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('academy-completed-ids');
      const parsed = JSON.parse(saved ?? '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('academy-completed-ids', JSON.stringify(completedIds));
  }, [completedIds]);
  useEffect(() => {
    localStorage.setItem('academy-drafts', JSON.stringify(drafts));
  }, [drafts]);
  useEffect(() => {
    localStorage.setItem('academy-current-lesson', lesson.id);
  }, [lesson.id]);

  // Banor man klarat i nivåtestet eller med "Testa dig förbi".
  // De låser upp nästa bana men räknas inte som klara.
  const [passedTrackIds, setPassedTrackIds] = useState(() => {
    try {
      const parsed = JSON.parse(
        localStorage.getItem('academy-passed-tracks') ?? '[]',
      );
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem(
      'academy-passed-tracks',
      JSON.stringify(passedTrackIds),
    );
  }, [passedTrackIds]);

  // Hur man valt att bygga varje projekt: 'hints' eller 'noHints'.
  const [projectModes, setProjectModes] = useState(() => {
    try {
      const parsed = JSON.parse(
        localStorage.getItem('academy-project-modes') ?? '{}',
      );
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
        ? parsed
        : {};
    } catch {
      return {};
    }
  });
  useEffect(() => {
    localStorage.setItem('academy-project-modes', JSON.stringify(projectModes));
  }, [projectModes]);

  // null tills man valt. Har man redan klarat ett steg utan att välja
  // bygger man med ledtrådar.
  const projectMode = project
    ? (projectModes[project.id] ??
      (project.steps.some((_, index) =>
        completedIds.includes(`${project.id}-${index + 1}`),
      )
        ? 'hints'
        : null))
    : null;

  function handleChooseProjectMode(mode) {
    setProjectModes(previous => ({ ...previous, [project.id]: mode }));
  }

  // Lösningen räknas som hjälp, så då försvinner bonusen.
  function handleShowSolution() {
    if (project && projectMode !== 'hints') handleChooseProjectMode('hints');
    setShowSolution(true);
  }

  // null när inget quiz visas, annars { trackId } för en bana eller {}
  // för nivåtestet.
  const [activeQuiz, setActiveQuiz] = useState(null);
  // Koden innan man tryckte på Återställ kod, så att det går att ångra.
  const [undoCode, setUndoCode] = useState(null);
  // Lekplatsen visas i stället för övningen. Idén man bygger finns kvar
  // när man går tillbaka, null betyder fri kod.
  const [showPlayground, setShowPlayground] = useState(false);
  const [playgroundIdeaId, setPlaygroundIdeaId] = useState(null);
  // Hjälpen öppnas av sig själv första gången man besöker sidan.
  const [showHelp, setShowHelp] = useState(() => {
    try {
      return !localStorage.getItem('academy-help-seen');
    } catch {
      return false;
    }
  });

  function handleCloseHelp() {
    setShowHelp(false);
    try {
      localStorage.setItem('academy-help-seen', 'true');
    } catch {
      // Då visas hjälpen igen nästa gång, vilket inte gör något.
    }
  }

  const account = useCloudProgress({
    completedIds,
    setCompletedIds,
    drafts,
    setDrafts,
    passedTrackIds,
    setPassedTrackIds,
  });

  // Efter utloggning töms webbläsaren, så att nästa person som loggar in
  // här inte får med sig dina framsteg. De finns kvar i ditt konto.
  async function handleSignOut() {
    await account.signOut();
    setCompletedIds([]);
    setDrafts({});
    setPassedTrackIds([]);
    setCode(lesson.starterCode);
    setFeedback(null);
  }

  const totalXp =
    exercises
      .filter(lesson => completedIds.includes(lesson.id))
      .reduce((sum, lesson) => sum + lesson.xp, 0) +
    projects
      .filter(item => completedIds.includes(noHintsId(item)))
      .reduce((sum, item) => sum + noHintsBonusXp(item), 0);

  const growth = getGrowth(tracks, lessons, completedIds, passedTrackIds);
  const trackStatusById = Object.fromEntries(
    tracks.map(item => [
      item.id,
      trackProgress(item, lessons, completedIds, passedTrackIds),
    ]),
  );
  const completedTrackIds = tracks
    .filter(item => trackStatusById[item.id].isComplete)
    .map(item => item.id);
  const testedOutTrackIds = tracks
    .filter(item => trackStatusById[item.id].viaTest)
    .map(item => item.id);

  // Banorna som blir klara när framstegen ändras, för att kunna fira dem.
  function newlyCompletedTracks(newCompletedIds, newPassedTrackIds) {
    return tracks.filter(
      item =>
        !trackStatusById[item.id].isComplete &&
        trackProgress(item, lessons, newCompletedIds, newPassedTrackIds)
          .isComplete,
    );
  }

  function celebrate(
    doneTracks,
    newCompletedIds,
    newPassedTrackIds,
    doneProjects = [],
  ) {
    if (doneTracks.length === 0 && doneProjects.length === 0) return;
    const newGrowth = getGrowth(
      tracks,
      lessons,
      newCompletedIds,
      newPassedTrackIds,
    );
    setCelebration({
      tracks: doneTracks,
      projects: doneProjects,
      unlockedProjects: projects.filter(item =>
        doneTracks.some(done => done.id === item.track),
      ),
      stage: newGrowth.stage,
      hasGrown: newGrowth.stageIndex > growth.stageIndex,
    });
  }

  // Egna idéer låses upp när alla tre projekt på banan är byggda.
  function canBuildFreely(trackId) {
    const trackProjects = projects.filter(item => item.track === trackId);
    return (
      trackProjects.length > 0 &&
      trackProjects.every(item => isProjectComplete(item, completedIds))
    );
  }
  const ideasWithStatus = ideas.map(idea => ({
    ...idea,
    trackTitle: tracks.find(item => item.id === idea.track).title,
    unlocked: canBuildFreely(idea.track),
  }));

  // Utan ideaId öppnas idén man byggde senast.
  function openPlayground(ideaId) {
    if (ideaId !== undefined) setPlaygroundIdeaId(ideaId);
    setShowPlayground(true);
    window.scrollTo({ top: 0 });
  }

  // Från banlistan öppnas första idén på banan.
  function handleOpenIdeas(trackId) {
    openPlayground(ideas.find(idea => idea.track === trackId)?.id ?? null);
  }

  const trackLessons = lessons.filter(item => item.track === track.id);
  const completedInTrack = trackLessons.filter(item =>
    completedIds.includes(item.id),
  ).length;

  function isTrackUnlocked(trackId) {
    const index = tracks.findIndex(item => item.id === trackId);
    if (index === -1) return false;
    if (index === 0) return true;

    // En bana man redan nått låses inte igen, även om en tidigare bana
    // fått nya lektioner.
    const hasReached = lessons.some(
      item =>
        completedIds.includes(item.id) &&
        tracks.findIndex(track => track.id === item.track) >= index,
    );
    if (hasReached) return true;

    const previousTrack = tracks[index - 1];
    if (passedTrackIds.includes(previousTrack.id)) return true;
    const previousLessons = lessons.filter(
      item => item.track === previousTrack.id && !item.addedLater,
    );

    return (
      previousLessons.length > 0 &&
      previousLessons.every(item => completedIds.includes(item.id))
    );
  }

  // Projekten på en bana låses upp när banan är klar, och varje steg
  // när förra steget är klart.
  function isExerciseUnlocked(item) {
    if (!isTrackUnlocked(item.track)) return false;
    if (!item.project) return true;
    if (!trackStatusById[item.track].isComplete) return false;
    if (item.stepNumber === 1) return true;
    return completedIds.includes(`${item.project}-${item.stepNumber - 1}`);
  }

  // Ett projektsteg man inte påbörjat börjar med koden man skrev i
  // förra steget, så att man bygger vidare på sitt eget projekt.
  function startCodeFor(item) {
    if (drafts[item.id] !== undefined) return drafts[item.id];
    const previousDraft =
      item.project && drafts[`${item.project}-${item.stepNumber - 1}`];
    if (!previousDraft) return item.starterCode;
    return `${previousDraft.trimEnd()}\n\n// Steg ${item.stepNumber}: ${item.title.split(': ').at(-1).toLowerCase()}\n`;
  }

  function handleCodeChange(newCode) {
    setCode(newCode);
    setDrafts(previous => ({
      ...previous,
      [lesson.id]: newCode,
    }));
    setFeedback(null);
  }

  async function checkCode() {
    const {
      error,
      results,
      notes = [],
      output = [],
    } = await runTests(code, lesson.tests, lesson.sourceChecks, {
      fileName: lesson.fileName,
      files: lesson.files,
    });
    const isCorrect =
      !error && results.length > 0 && results.every(result => result.passed);
    // Förhandsvisningen kör koden på riktigt, men bara om den gick att
    // köra i workern. Annars kan en oändlig loop frysa sidan.
    const previewSource =
      lesson.preview && !error
        ? {
            code,
            fileName: lesson.fileName,
            files: lesson.files,
            preview: lesson.preview,
          }
        : null;
    return { isCorrect, error, results, notes, output, previewSource };
  }

  async function handleCheck() {
    const checkId = ++checkIdRef.current;
    setIsChecking(true);
    const { isCorrect, error, results, notes, output, previewSource } =
      await checkCode();
    if (checkId !== checkIdRef.current) return;
    setIsChecking(false);

    const isFirstTime = isCorrect && !completedIds.includes(lesson.id);

    setFeedback({
      message: isCorrect ? 'Rätt svar!' : 'Försök igen.',
      xpGained: isFirstTime ? lesson.xp : 0,
      isCorrect,
      error,
      results,
      notes,
      output,
      previewSource,
    });
    if (!isCorrect) {
      setFailedAttempts(previous => previous + 1);
    }
    if (isFirstTime) {
      const newIds = [...completedIds, lesson.id];
      const projectDone = project && isProjectComplete(project, newIds);
      const withoutHints = projectDone && projectMode === 'noHints';
      if (withoutHints) newIds.push(noHintsId(project));
      setCompletedIds(newIds);

      // Blev banan klar nu? Då firar vi och visar hur figuren växt.
      celebrate(
        newlyCompletedTracks(newIds, passedTrackIds),
        newIds,
        passedTrackIds,
        projectDone
          ? [
              {
                ...project,
                bonusXp: withoutHints ? noHintsBonusXp(project) : 0,
              },
            ]
          : [],
      );
    }
  }
  function selectLesson(index) {
    setShowPlayground(false);
    checkIdRef.current += 1;
    setIsChecking(false);
    setLessonIndex(index);
    setCode(startCodeFor(exercises[index]));
    setFeedback(null);
    setFailedAttempts(0);
    setShowSolution(false);
    setUndoCode(null);
  }

  // Föregående och nästa håller sig inom övningarna, eller inom
  // projektet man arbetar med.
  function neighbour(offset) {
    const item = exercises[lessonIndex + offset];
    if (!item || item.project !== lesson.project) return null;
    return isExerciseUnlocked(item) ? lessonIndex + offset : null;
  }

  function handleNext() {
    const nextIndex = neighbour(1);
    if (nextIndex !== null) selectLesson(nextIndex);
  }

  function handlePrevious() {
    const previousIndex = neighbour(-1);
    if (previousIndex !== null) selectLesson(previousIndex);
  }

  function handleSelectLesson(lessonId) {
    const index = exercises.findIndex(item => item.id === lessonId);
    if (index === -1) return;
    if (!isExerciseUnlocked(exercises[index])) return;

    selectLesson(index);
  }

  // Öppnar första steget i projektet som inte är klart.
  function handleSelectProject(projectId) {
    const steps = projectSteps.filter(item => item.project === projectId);
    const step =
      steps.find(item => !completedIds.includes(item.id)) ?? steps[0];
    handleSelectLesson(step.id);
  }

  function handleSelectTrack(trackId) {
    if (!isTrackUnlocked(trackId)) return;
    const firstIndex = lessons.findIndex(item => item.track === trackId);
    if (firstIndex === -1) return;

    selectLesson(firstIndex);
  }

  const nextUncompletedIndex = lessons.findIndex(
    item => !completedIds.includes(item.id) && isTrackUnlocked(item.track),
  );

  function handleContinue() {
    if (nextUncompletedIndex === -1) return;
    selectLesson(nextUncompletedIndex);
  }

  function handleEditCode(newCode) {
    setUndoCode(null);
    handleCodeChange(newCode);
  }

  function handleResetCode() {
    if (code === lesson.starterCode) return;
    setUndoCode(code);
    handleCodeChange(lesson.starterCode);
  }

  function handleUndoReset() {
    handleCodeChange(undoCode);
    setUndoCode(null);
  }

  // Man kan testa sig på en upplåst bana som inte är klar och vars test
  // man inte redan klarat.
  function canTestOut(trackId) {
    return (
      Boolean(quiz[trackId]) &&
      isTrackUnlocked(trackId) &&
      !trackStatusById[trackId].isComplete &&
      !passedTrackIds.includes(trackId)
    );
  }

  // Första bossen som är kvar i en bana man klarat testet för.
  function bossLeftIn(trackId) {
    if (!passedTrackIds.includes(trackId)) return null;
    return trackStatusById[trackId].bossesLeft[0] ?? null;
  }

  // Banor utan boss blir klara direkt. Övriga när bossen är klar.
  function handleQuizFinish(passed) {
    const newPassed = [...new Set([...passedTrackIds, ...passed])];
    setPassedTrackIds(newPassed);
    celebrate(
      newlyCompletedTracks(completedIds, newPassed),
      completedIds,
      newPassed,
    );
  }

  // Efter ett godkänt test hoppar man till banans boss, om man valde det,
  // eller till banan efter den sista man klarat.
  function handleQuizClose(passed, choice) {
    setActiveQuiz(null);
    if (!passed?.length) return;
    if (choice === 'boss') {
      const boss = lessons.find(
        item =>
          item.track === passed.at(-1) &&
          item.isBoss &&
          !completedIds.includes(item.id),
      );
      const bossIndex = lessons.indexOf(boss);
      if (bossIndex !== -1) selectLesson(bossIndex);
      return;
    }
    const lastIndex = tracks.findIndex(item => item.id === passed.at(-1));
    const nextTrack = tracks[lastIndex + 1];
    if (!nextTrack) return;
    const firstIndex = lessons.findIndex(item => item.track === nextTrack.id);
    if (firstIndex !== -1) selectLesson(firstIndex);
  }

  const allCompleted = lessons.every(item => completedIds.includes(item.id));
  return (
    <>
      <header className="app-header">
        <h1>
          <span aria-hidden="true">⚛️</span> JS / React Academy
        </h1>
        <nav className="header-nav" aria-label="Verktyg">
          <button
            type="button"
            onClick={() => openPlayground()}
            aria-current={showPlayground ? 'page' : undefined}
          >
            🧪 Lekplats
          </button>
          <button type="button" onClick={() => setShowHelp(true)}>
            ❓ Hjälp
          </button>
        </nav>
        <p className="header-stats">
          <Avatar stage={growth.stage} size={28} />
          <span>{growth.stage.title}</span>
          <span className="chip chip-xp">⭐ {totalXp} XP</span>
        </p>
      </header>
      <main>
        <div className="academy-layout">
          <aside aria-label="Banor och progression">
            <AccountPanel account={account} onSignOut={handleSignOut} />
            <HeroCard
              growth={growth}
              totalXp={totalXp}
              completedCount={
                lessons.filter(item => completedIds.includes(item.id)).length
              }
              lessonCount={lessons.length}
            />
            <button
              className="primary-button continue-button"
              type="button"
              onClick={handleContinue}
              disabled={nextUncompletedIndex === -1}
            >
              Fortsätt träna →
            </button>
            <button
              className="quiz-start"
              type="button"
              onClick={() => setActiveQuiz({})}
            >
              🎯 Kan du redan lite? Gör nivåtestet och hoppa fram
            </button>
            <Collection
              tracks={tracks}
              completedTrackIds={completedTrackIds}
              testedOutTrackIds={testedOutTrackIds}
              projects={projects}
              completedIds={completedIds}
            />
            <TrackList
              title="Dina banor"
              tracks={tracks}
              lessons={lessons}
              completedIds={completedIds}
              isTrackUnlocked={isTrackUnlocked}
              handleSelectTrack={handleSelectTrack}
              activeTrackId={lesson.track}
              onSelectLesson={handleSelectLesson}
              activeLessonId={lesson.id}
              drafts={drafts}
              trackStatusById={trackStatusById}
              passedTrackIds={passedTrackIds}
              projects={projects}
              projectSteps={projectSteps}
              onSelectProject={handleSelectProject}
              canBuildFreely={canBuildFreely}
              onOpenIdeas={handleOpenIdeas}
            />
            {allCompleted && (
              <p className="feedback-success">
                Alla övningar är klara! Du kan fortfarande repetera dem.
              </p>
            )}
          </aside>
          {showPlayground ? (
            <Playground
              ideas={ideasWithStatus}
              ideaId={playgroundIdeaId}
              onSelectIdea={setPlaygroundIdeaId}
              onBack={() => setShowPlayground(false)}
            />
          ) : (
            <LessonPanel
              freeBuildIdeas={
                project && canBuildFreely(project.track)
                  ? ideas.filter(idea => idea.track === project.track)
                  : []
              }
              onOpenIdea={openPlayground}
              resources={resources[lesson.track] ?? []}
              onBreakDown={() => {
                copyToPlayground(code, lesson.title);
                openPlayground(PLAYGROUND_COPY);
              }}
              code={code}
              onCodeChange={handleEditCode}
              onCheck={handleCheck}
              isChecking={isChecking}
              onResetCode={handleResetCode}
              canTestOut={canTestOut(lesson.track)}
              onTestOut={() => setActiveQuiz({ trackId: lesson.track })}
              bossLeft={bossLeftIn(lesson.track)}
              onGoToBoss={boss => handleSelectLesson(boss.id)}
              canUndoReset={undoCode !== null}
              onUndoReset={handleUndoReset}
              showSolution={showSolution}
              onShowSolution={handleShowSolution}
              feedback={feedback}
              lesson={lesson}
              project={project}
              projectMode={projectMode}
              onChooseProjectMode={handleChooseProjectMode}
              noHintsBonusXp={project ? noHintsBonusXp(project) : 0}
              isCompleted={completedIds.includes(lesson.id)}
              failedAttempts={failedAttempts}
              trackTitle={track.title}
              docs={track.docs}
              completedInTrack={completedInTrack}
              trackLessonCount={trackLessons.length}
              lessonNumber={lessonIndex + 1}
              lessonCount={lessons.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
              canPrevious={neighbour(-1) !== null}
              canNext={neighbour(1) !== null}
            />
          )}
        </div>
      </main>
      {activeQuiz && (
        <Quiz
          tracks={tracks}
          trackId={activeQuiz.trackId}
          hasBoss={
            Boolean(activeQuiz.trackId) &&
            trackStatusById[activeQuiz.trackId].bossesLeft.length > 0
          }
          onFinish={handleQuizFinish}
          onClose={handleQuizClose}
        />
      )}
      {showHelp && <HelpDialog onClose={handleCloseHelp} />}
      {celebration && !activeQuiz && (
        <LevelUp
          celebration={celebration}
          onClose={() => setCelebration(null)}
        />
      )}
    </>
  );
}

export default App;
