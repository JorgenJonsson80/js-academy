function ProgressPanel({ completedCount, lessonCount, totalXp }) {
  return (
    <>
      <p>
        Klarade övningar: {completedCount} av {lessonCount}
      </p>
      <p>XP: {totalXp}</p>
      <label htmlFor="total-progress">Total progression</label>
      <progress id="total-progress" value={completedCount} max={lessonCount} />
    </>
  );
}

export default ProgressPanel;
