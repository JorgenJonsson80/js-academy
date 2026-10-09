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
  canTestOut,
  onTestOut,
}) {
  return (
    <>
      <h2 className="card-title">{title}</h2>
      <ul className="track-list">
        {tracks.map(item => {
          const items = lessons.filter(lesson => lesson.track === item.id);
          const completed = items.filter(lesson =>
            completedIds.includes(lesson.id),
          ).length;
          const isTrackCompleted =
            items.length > 0 && completed === items.length;
          const isUnlocked = isTrackUnlocked(item.id);
          const isActive = item.id === activeTrackId;
          return (
            <li
              key={item.id}
              className={isActive ? 'track-card active' : 'track-card'}
            >
              <button
                className="track-button"
                type="button"
                disabled={!isUnlocked}
                onClick={() => handleSelectTrack(item.id)}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="track-icon" aria-hidden="true">
                  {isTrackCompleted
                    ? item.reward.emoji
                    : isUnlocked
                      ? '▶'
                      : '🔒'}
                </span>
                <span className="track-title">{item.title}</span>
                <span className="track-count">
                  {completed}/{items.length}
                  <span className="visually-hidden">
                    {' '}
                    klarade{isUnlocked ? '' : ', låst'}
                  </span>
                </span>
              </button>
              <progress
                value={completed}
                max={items.length}
                aria-label={item.title}
              />
              {canTestOut(item.id) && (
                <button
                  className="test-out-button"
                  type="button"
                  onClick={() => onTestOut(item.id)}
                >
                  ⚡ Kan du redan detta? Testa dig förbi
                </button>
              )}
              {isActive && (
                <ol className="lesson-list">
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
                        <span aria-hidden="true">
                          {completedIds.includes(lesson.id)
                            ? '✓'
                            : lesson.isBoss
                              ? '👑'
                              : '○'}
                        </span>{' '}
                        {lesson.title}
                        {completedIds.includes(lesson.id) && (
                          <span className="visually-hidden"> (klar)</span>
                        )}
                        {!completedIds.includes(lesson.id) &&
                          typeof drafts[lesson.id] === 'string' &&
                          drafts[lesson.id] !== lesson.starterCode && (
                            <span className="draft"> · utkast</span>
                          )}
                      </button>
                    </li>
                  ))}
                </ol>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
