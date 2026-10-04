const TIMEOUT_MS = 2000;

// Startar en ny worker för varje körning. Fastnar koden i en
// oändlig loop kan vi då bara avsluta workern efter TIMEOUT_MS.
export function runTests(code, tests, sourceChecks, options) {
  return new Promise(resolve => {
    const worker = new Worker(new URL('./testWorker.js', import.meta.url), {
      type: 'module',
    });

    function finish(result) {
      clearTimeout(timer);
      worker.terminate();
      resolve(result);
    }

    const timer = setTimeout(() => {
      finish({
        error:
          'Koden tog för lång tid att köra. Har du skrivit en oändlig loop?',
        results: [],
      });
    }, TIMEOUT_MS);

    worker.onmessage = event => finish(event.data);
    worker.onerror = event => finish({ error: event.message, results: [] });

    worker.postMessage({ code, tests, sourceChecks, options });
  });
}
