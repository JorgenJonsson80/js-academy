// Figurens åldrar. Figuren växer ett steg för varje bana som är klar.
// head, body och leg är storlekar i SVG:n, extras är saker figuren bär.
export const stages = [
  {
    title: 'Bebis',
    head: 22,
    body: 22,
    leg: 10,
    shirt: '#fde68a',
    pants: '#fde68a',
    hair: 'tuft',
    extras: ['pacifier'],
  },
  {
    title: 'Småbarn',
    head: 22,
    body: 26,
    leg: 16,
    shirt: '#86efac',
    pants: '#3b82f6',
    hair: 'tuft',
    extras: ['teddy'],
  },
  {
    title: 'Skolbarn',
    head: 21,
    body: 30,
    leg: 24,
    shirt: '#f87171',
    pants: '#1e40af',
    hair: 'short',
    extras: ['backpack', 'cap'],
  },
  {
    title: 'Tonåring',
    head: 20,
    body: 36,
    leg: 32,
    shirt: '#64748b',
    pants: '#475569',
    hair: 'spiky',
    extras: ['headphones'],
  },
  {
    title: 'Student',
    head: 19,
    body: 40,
    leg: 38,
    shirt: '#a78bfa',
    pants: '#334155',
    hair: 'short',
    extras: ['backpack', 'mug'],
  },
  {
    title: 'Praktikant',
    head: 19,
    body: 40,
    leg: 38,
    shirt: '#38bdf8',
    pants: '#334155',
    hair: 'short',
    extras: ['lanyard'],
  },
  {
    title: 'Juniorutvecklare',
    head: 19,
    body: 40,
    leg: 38,
    shirt: '#34d399',
    pants: '#475569',
    hair: 'spiky',
    extras: ['laptop'],
  },
  {
    title: 'Utvecklare',
    head: 19,
    body: 40,
    leg: 38,
    shirt: '#f472b6',
    pants: '#475569',
    hair: 'short',
    extras: ['headphones', 'laptop'],
  },
  {
    title: 'Seniorutvecklare',
    head: 19,
    body: 40,
    leg: 38,
    shirt: '#fb923c',
    pants: '#475569',
    hair: 'short',
    hairColor: '#57534e',
    extras: ['glasses', 'mug'],
  },
  {
    title: 'Tech lead',
    head: 19,
    body: 40,
    leg: 38,
    shirt: '#e2e8f0',
    pants: '#475569',
    hair: 'short',
    hairColor: '#9ca3af',
    extras: ['glasses', 'tie'],
  },
  {
    title: 'Mästare',
    head: 19,
    body: 40,
    leg: 38,
    shirt: '#7c3aed',
    pants: '#4c1d95',
    hair: 'short',
    hairColor: '#e5e7eb',
    extras: ['beard', 'glasses', 'wizardHat'],
  },
];

// Räknar ut var eleven är: ålder, nästa ålder och hur långt det är kvar.
export function getGrowth(tracks, lessons, completedIds) {
  const trackStatus = tracks.map(track => {
    const items = lessons.filter(lesson => lesson.track === track.id);
    const done = items.filter(lesson => completedIds.includes(lesson.id));
    return {
      track,
      done: done.length,
      total: items.length,
      isComplete: items.length > 0 && done.length === items.length,
    };
  });

  const completedTracks = trackStatus.filter(status => status.isComplete);
  const stageIndex = Math.min(completedTracks.length, stages.length - 1);
  const currentTrack = trackStatus.find(status => !status.isComplete) ?? null;

  return {
    stage: stages[stageIndex],
    stageIndex,
    nextStage: stages[stageIndex + 1] ?? null,
    currentTrack,
    rewards: completedTracks.map(status => status.track.reward),
  };
}
