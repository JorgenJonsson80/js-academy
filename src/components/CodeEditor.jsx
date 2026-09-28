export default function CodeEditor({ code, onCodeChange }) {
  return (
    <>
      <label htmlFor="code">Din kod</label>
      <textarea
        id="code"
        rows={8}
        value={code}
        onChange={event => onCodeChange(event.target.value)}
      />
    </>
  );
}
