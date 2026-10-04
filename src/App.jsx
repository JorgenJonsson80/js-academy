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
import { getGrowth } from './data/stages';
import { runTests } from './runner/runTests';

function App() {
  const [lessonIndex, setLessonIndex] = useState(0);

  const lesson = lessons[lessonIndex];
  const track = tracks.find(track => track.id === lesson.track);
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

  const totalXp = lessons
    .filter(lesson => completedIds.includes(lesson.id))
    .reduce((sum, lesson) => sum + lesson.xp, 0);

  const growth = getGrowth(tracks, lessons, completedIds);
  const completedTrackIds = tracks
    .filter(item => {
      const items = lessons.filter(lesson => lesson.track === item.id);
      return items.every(lesson => completedIds.includes(lesson.id));
    })
    .map(item => item.id);

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
    const previousLessons = lessons.filter(
      item => item.track === previousTrack.id,
    );

    return (
      previousLessons.length > 0 &&
      previousLessons.every(item => completedIds.includes(item.id))
    );
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
      setCompletedIds(newIds);

      // Blev banan klar nu? Då firar vi och visar hur figuren växt.
      const isTrackDone = trackLessons.every(item => newIds.includes(item.id));
      if (isTrackDone) {
        const newGrowth = getGrowth(tracks, lessons, newIds);
        setCelebration({
          track,
          stage: newGrowth.stage,
          hasGrown: newGrowth.stageIndex > growth.stageIndex,
        });
      }
    }
  }
  function selectLesson(index) {
    checkIdRef.current += 1;
    setIsChecking(false);
    setLessonIndex(index);
    setCode(drafts[lessons[index].id] ?? lessons[index].starterCode);
    setFeedback(null);
    setFailedAttempts(0);
    setShowSolution(false);
  }

  function handleNext() {
    const nextIndex = lessonIndex + 1;
    if (nextIndex >= lessons.length) return;
    if (!isTrackUnlocked(lessons[nextIndex].track)) return;

    selectLesson(nextIndex);
  }

  function handlePrevious() {
    const previousIndex = lessonIndex - 1;
    if (previousIndex < 0) return;

    selectLesson(previousIndex);
  }

  function handleSelectLesson(lessonId) {
    const index = lessons.findIndex(item => item.id === lessonId);
    if (index === -1) return;
    if (!isTrackUnlocked(lessons[index].track)) return;

    selectLesson(index);
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

  function handleResetCode() {
    handleCodeChange(lesson.starterCode);
  }

  const allCompleted = lessons.every(item => completedIds.includes(item.id));
  return (
    <>
      <header className="app-header">
        <h1>
          <span aria-hidden="true">⚛️</span> JS / React Academy
        </h1>
        <p className="header-stats">
          <Avatar stage={growth.stage} size={28} />
          <span>{growth.stage.title}</span>
          <span className="chip chip-xp">⭐ {totalXp} XP</span>
        </p>
      </header>
      <main>
        <div className="academy-layout">
          <aside aria-label="Banor och progression">
            <HeroCard
              growth={growth}
              totalXp={totalXp}
              completedCount={completedIds.length}
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
            <Collection tracks={tracks} completedTrackIds={completedTrackIds} />
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
            />
            {allCompleted && (
              <p className="feedback-success">
                Alla övningar är klara! Du kan fortfarande repetera dem.
              </p>
            )}
          </aside>
          <LessonPanel
            code={code}
            onCodeChange={handleCodeChange}
            onCheck={handleCheck}
            isChecking={isChecking}
            onResetCode={handleResetCode}
            showSolution={showSolution}
            onShowSolution={() => setShowSolution(true)}
            feedback={feedback}
            lesson={lesson}
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
            canPrevious={lessonIndex > 0}
            canNext={
              lessonIndex < lessons.length - 1 &&
              isTrackUnlocked(lessons[lessonIndex + 1].track)
            }
          />
        </div>
      </main>
      {celebration && (
        <LevelUp
          celebration={celebration}
          onClose={() => setCelebration(null)}
        />
      )}
    </>
  );
}

export default App;
