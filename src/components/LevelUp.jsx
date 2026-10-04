import { useEffect, useRef } from 'react';
import Avatar from './Avatar';

// Firar när en bana blir klar: figuren har vuxit och samlingen fått
// ett nytt föremål.
export default function LevelUp({ celebration, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const { track, stage, hasGrown } = celebration;

  return (
    <dialog
      ref={dialogRef}
      className="level-up"
      onClose={onClose}
      aria-labelledby="level-up-title"
    >
      <p className="level-up-confetti" aria-hidden="true">
        🎉
      </p>
      <h2 id="level-up-title">{track.title} är klar!</h2>
      <div className="level-up-avatar">
        <Avatar stage={stage} size={140} />
      </div>
      {hasGrown && (
        <p>
          Du har vuxit! Nu är du <strong>{stage.title}</strong>.
        </p>
      )}
      <p className="level-up-reward">
        <span aria-hidden="true">{track.reward.emoji}</span> Ny pryl i
        samlingen: <strong>{track.reward.name}</strong>
      </p>
      <form method="dialog">
        <button className="primary-button" type="submit" autoFocus>
          Fortsätt
        </button>
      </form>
    </dialog>
  );
}
