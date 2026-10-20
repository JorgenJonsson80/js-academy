// En fråga att klistra in hos valfri AI när man kört fast. AI:n ombeds
// vara handledare, inte ge lösningen, och bara använda det eleven lärt
// sig hittills – annars försvinner lärandet.

function whatHappened(feedback) {
  if (!feedback) return 'Jag har inte kört koden än.';
  const lines = [];
  if (feedback.error) lines.push(`Felmeddelande:\n${feedback.error}`);
  const failed = (feedback.results ?? []).filter(result => !result.passed);
  if (failed.length > 0) {
    lines.push(
      'Tester som inte gick igenom:\n' +
        failed
          .map(result => {
            if (result.consoleActual) {
              return `- ${result.description} (konsolen visade: ${result.consoleActual.join(' / ') || 'ingenting'})`;
            }
            return result.actual === undefined
              ? `- ${result.description}`
              : `- ${result.description} (fick ${result.actual}, förväntat ${result.expected})`;
          })
          .join('\n'),
    );
  }
  if (feedback.output?.length > 0) {
    lines.push(`Konsolen visade:\n${feedback.output.join('\n')}`);
  }
  return lines.length > 0 ? lines.join('\n\n') : 'Koden körde utan fel.';
}

// learnedTracks: namnen på banorna fram till och med den här.
export function buildAiPrompt({ lesson, code, feedback, learnedTracks }) {
  const task = (lesson.task ?? lesson.description ?? '')
    .replace(/^Uppgift:\s*/, '')
    .replace(/`/g, '');
  const language = learnedTracks.some(title => title.startsWith('React'))
    ? 'JavaScript och React'
    : 'JavaScript';

  return `Hej! Jag lär mig ${language} och har kört fast på en övning. Jag är nybörjare.

Ge mig INTE hela lösningen – jag vill lära mig själv. Hjälp mig så här:
1. Förklara på enkel svenska vad som är fel eller vad jag missar.
2. Ge en ledtråd, eller ställ en fråga som leder mig rätt.
3. Om jag ber om mer hjälp, ge lite mer i taget.

Jag har bara lärt mig det här än så länge: ${learnedTracks.join(', ')}. Använd inget mer avancerat än så.

Övning: ${lesson.title}
Uppgift:
${task.trim()}

Min kod:
\`\`\`${lesson.fileName?.endsWith('.jsx') || language.includes('React') ? 'jsx' : 'js'}
${code.trim()}
\`\`\`

Det här hände när jag körde koden:
${whatHappened(feedback)}`;
}
