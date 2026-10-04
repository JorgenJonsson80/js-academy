import { useEffect, useRef, useState } from 'react';

// En egen liten sida i iframen, så att appens CSS inte påverkar
// elevens komponent.
const PREVIEW_PAGE = `<!doctype html>
<html>
  <head>
    <style>
      body { margin: 12px; font-family: system-ui, sans-serif; color: #111827; }
      button, input, textarea { font: inherit; margin: 2px; }
      .preview-error { color: #b91c1c; white-space: pre-wrap; }
    </style>
  </head>
  <body><div id="root"></div></body>
</html>`;

// Visar elevens komponent på riktigt, så att man kan klicka och skriva.
// source är { code, fileName, files, preview } från senaste kontrollen.
function Preview({ source }) {
  const iframeRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    let stop = null;
    let isCancelled = false;

    // Kompilatorn behövs bara här, så den laddas först när den används.
    import('../runner/livePreview').then(({ startLivePreview }) => {
      if (isCancelled) return;
      const container =
        iframeRef.current.contentDocument.getElementById('root');
      stop = startLivePreview(container, source);
    });

    return () => {
      isCancelled = true;
      stop?.();
    };
  }, [isLoaded, source]);

  return (
    <iframe
      ref={iframeRef}
      className="preview"
      srcDoc={PREVIEW_PAGE}
      title="Förhandsvisning"
      onLoad={() => setIsLoaded(true)}
    ></iframe>
  );
}

export default Preview;
