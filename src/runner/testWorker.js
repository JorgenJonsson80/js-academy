// Körs i en egen tråd så att elevens kod inte kan frysa sidan.
import { evaluate } from './evaluate';

self.onmessage = event => {
  const { code, tests, sourceChecks, modules } = event.data;
  self.postMessage(evaluate(code, tests, sourceChecks, modules));
};
