function HintPanel({ hints, failedAttempts, isBoss }) {
  return (
    <>
      <p className="muted">Felaktiga försök: {failedAttempts}</p>
      {!isBoss && failedAttempts >= 2 && <p className="hint">{hints[0]}</p>}
      {!isBoss && failedAttempts >= 3 && <p className="hint">{hints[1]}</p>}
      {!isBoss && failedAttempts >= 4 && <p className="hint">{hints[2]}</p>}
    </>
  );
}

export default HintPanel;
