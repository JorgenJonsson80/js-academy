export default function CodeEditor({ code, onCodeChange, fileName }) {
  return (
    <>
      <label htmlFor="code">Din kod{fileName && ` (${fileName})`}</label>
      <textarea
        id="code"
        rows={8}
        value={code}
        onChange={event => onCodeChange(event.target.value)}
      />
    </>
  );
}
