function Preview({ html }) {
  return (
    <iframe
      className="preview"
      srcDoc={html}
      sandbox=""
      title="Förhandsvisning"
    ></iframe>
  );
}

export default Preview;
