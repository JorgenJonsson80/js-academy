// Körs i en egen tråd så att elevens kod inte kan frysa sidan.
import { evaluate } from './evaluate';

self.onmessage = async event => {
  const { code, tests, sourceChecks, options } = event.data;
  self.postMessage(await evaluate(code, tests, sourceChecks, options));
};
