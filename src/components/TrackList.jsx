export default function TrackList({
  title,
  tracks,
  lessons,
  completedIds,
  isTrackUnlocked,
  handleSelectTrack,
  activeTrackId,
  onSelectLesson,
  activeLessonId,
  drafts,
}) {
  return (
    <>
      <h2>{title}</h2>
      <ul className="track-list">
        {tracks.map(item => {
          const items = lessons.filter(lesson => lesson.track === item.id);
          const completed = items.filter(lesson =>
            completedIds.includes(lesson.id),
          ).length;
          const isTrackCompleted =
            items.length > 0 && completed === items.length;
          return (
            <li key={item.id}>
              <button
                type="button"
                disabled={!isTrackUnlocked(item.id)}
                onClick={() => handleSelectTrack(item.id)}
                aria-current={item.id === activeTrackId ? 'true' : undefined}
              >
                {item.title}
              </button>
              <span>
                {' '}
                {completed} av {items.length} klarade
              </span>
              <progress
                value={completed}
                max={items.length}
                aria-label={item.title}
              />
              <span>{isTrackUnlocked(item.id) ? 'Upplåst' : 'Låst'}</span>
              {isTrackCompleted && (
                <p className="feedback-success">Banan är klar</p>
              )}
              <ol>
                {items.map(lesson => (
                  <li key={lesson.id}>
                    <button
                      type="button"
                      disabled={!isTrackUnlocked(lesson.track)}
                      onClick={() => onSelectLesson(lesson.id)}
                      aria-current={
                        lesson.id === activeLessonId ? 'true' : undefined
                      }
                    >
                      {lesson.title}
                      {completedIds.includes(lesson.id) && ' ✓'}
                      {!completedIds.includes(lesson.id) &&
                        typeof drafts[lesson.id] === 'string' &&
                        drafts[lesson.id] !== lesson.starterCode && (
                          <span> — Utkast</span>
                        )}
                    </button>
                  </li>
                ))}
              </ol>
            </li>
          );
        })}
      </ul>
    </>
  );
}
