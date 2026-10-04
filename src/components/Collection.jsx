// Hyllan med föremål. Varje bana ger ett föremål när den är klar.
export default function Collection({ tracks, completedTrackIds }) {
  const count = tracks.filter(track =>
    completedTrackIds.includes(track.id),
  ).length;

  return (
    <section className="card" aria-labelledby="collection-title">
      <h2 id="collection-title" className="card-title">
        Samling{' '}
        <span className="muted">
          {count} av {tracks.length}
        </span>
      </h2>
      <ul className="collection">
        {tracks.map(track => {
          const isEarned = completedTrackIds.includes(track.id);
          return (
            <li
              key={track.id}
              className={
                isEarned ? 'collection-item earned' : 'collection-item'
              }
              title={
                isEarned
                  ? `${track.reward.name} – från ${track.title}`
                  : `Klara ${track.title}`
              }
            >
              <span aria-hidden="true">
                {isEarned ? track.reward.emoji : '?'}
              </span>
              <span className="visually-hidden">
                {isEarned
                  ? `${track.reward.name}, från ${track.title}`
                  : `Låst: klara ${track.title}`}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
