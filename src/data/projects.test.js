import { describe, expect, it } from 'vitest';
import { evaluate } from '../runner/evaluate';
import { findMissingSemicolons } from '../runner/style';
import {
  isProjectComplete,
  noHintsBonusXp,
  projects,
  projectSteps,
} from './projects';
import { lessons } from './lesson';
import { tracks } from './tracks';

async function check(step, code) {
  const { error, results } = await evaluate(
    code,
    step.tests,
    step.sourceChecks,
  );
  const failed = results.filter(result => !result.passed);
  return {
    passed: !error && failed.length === 0,
    reason: error ?? failed.map(result => result.description).join(', '),
  };
}

describe('projektdata', () => {
  it('har id:n som inte krockar med övningarna', () => {
    const ids = [...lessons, ...projectSteps].map(item => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(projects)('$id tillhör en bana som finns', project => {
    expect(tracks.map(track => track.id)).toContain(project.track);
  });

  it.each(projects)('$id har ett pris till samlingen', project => {
    expect(project.reward.emoji).toBeTruthy();
    expect(project.reward.name).toBeTruthy();
  });

  it.each(projects)('$id har 3–4 steg', project => {
    expect(project.steps.length).toBeGreaterThanOrEqual(3);
    expect(project.steps.length).toBeLessThanOrEqual(4);
  });

  it.each(projectSteps)('$id har tester och 2–3 ledtrådar', step => {
    expect(step.tests.length).toBeGreaterThan(0);
    expect(step.hints.length).toBeGreaterThanOrEqual(2);
    expect(step.hints.length).toBeLessThanOrEqual(3);
  });

  it('ger hälften av projektets XP i bonus utan ledtrådar', () => {
    const project = projects.find(item => item.id === 'proj-checkout');
    expect(noHintsBonusXp(project)).toBe(35);
  });

  it('räknar ett projekt som klart först när alla steg är klara', () => {
    const [project] = projects;
    const ids = projectSteps
      .filter(step => step.project === project.id)
      .map(step => step.id);
    expect(isProjectComplete(project, ids.slice(0, -1))).toBe(false);
    expect(isProjectComplete(project, ids)).toBe(true);
  });
});

describe('rättning av projekten', () => {
  it.each(projectSteps)('$id godkänner sin egen lösning', async step => {
    expect(await check(step, step.solution)).toEqual({
      passed: true,
      reason: '',
    });
  });

  it.each(projectSteps)('$id underkänner startkoden', async step => {
    expect((await check(step, step.starterCode)).passed).toBe(false);
  });

  it.each(projectSteps)('$id har ; efter varje sats i lösningen', step => {
    expect(findMissingSemicolons(step.solution)).toEqual([]);
  });
});

const otherAnswers = [
  [
    'proj-checkout-2',
    'const bread = 35;\nconst cheese = 89;\nconst coffee = 96;\nlet total = 0;\ntotal = total + bread;\ntotal = total + cheese;\ntotal = total + coffee;',
    true,
  ],
  [
    'proj-checkout-2',
    'const bread = 35;\nconst cheese = 89;\nconst coffee = 96;\nlet total = 0;\ntotal = 35 + 89 + 96;',
    false,
  ],
  [
    'proj-thermostat-2',
    "let temp = 14;\nconsole.log('För kallt');\ntemp = 20;\nconsole.log('Temp:', 16);\nconsole.log('Temp:', 18);\nconsole.log('Temp:', temp);",
    false,
  ],
  [
    'proj-workout-1',
    'let totalMinutes = 0;\nfor (let day = 1; day <= 7; day++) {\n  totalMinutes = totalMinutes + 15 + day * 5;\n}',
    true,
  ],
  [
    'proj-playlist-3',
    "const songs = [\n  { title: 'Dancing Queen', artist: 'ABBA', seconds: 231 },\n  { title: 'Levitating', artist: 'Dua Lipa', seconds: 203 },\n  { title: 'Bohemian Rhapsody', artist: 'Queen', seconds: 355 },\n];\nsongs.push({ title: 'Kort', artist: 'Jag', seconds: 60 });\nlet longest = songs[0];\nfor (let i = 0; i < songs.length; i++) {\n  if (songs[i].seconds > longest.seconds) {\n    longest = songs[i];\n  }\n}\nconsole.log('Längst:', longest.title, 'av', longest.artist);",
    true,
  ],
  [
    'proj-leaderboard-3',
    "const players = [\n  { name: 'Ada', score: 42 },\n  { name: 'Linus', score: 35 },\n  { name: 'Grace', score: 51 },\n  { name: 'Alan', score: 28 },\n];\nplayers.push({ name: 'Kim', score: 51 });\nconst average = 41.4;\nlet winner = players[0];\nlet aboveAverage = 0;\nfor (let i = 0; i < players.length; i++) {\n  if (players[i].score >= winner.score) {\n    winner = players[i];\n  }\n  if (players[i].score > average) {\n    aboveAverage = aboveAverage + 1;\n  }\n}\nconsole.log('Vinnare:', winner.name);\nconsole.log('Över snittet:', aboveAverage);",
    false,
  ],
  [
    'proj-packing-1',
    "const packList = ['tandborste', 'laddare', 'bok', 'solkräm', 'badbyxor'];",
    false,
  ],
  [
    'proj-change-3',
    "const coinsOf = (amount, coin) => Math.floor(amount / coin);\nconst makeChange = amount => ({\n  twenties: coinsOf(amount, 20),\n  tens: coinsOf(amount % 20, 10),\n  fives: coinsOf(amount % 10, 5),\n  ones: amount % 5,\n});\nconst pay = (price, paid) => {\n  if (paid === price) return 'Jämnt!';\n  if (paid > price) return makeChange(paid - price);\n  return 'Det fattas ' + (price - paid) + ' kr';\n};",
    true,
  ],
  [
    'proj-weather-2',
    "function warmest(temps) {\n  let max = 0;\n  for (let i = 0; i < temps.length; i++) {\n    if (temps[i] > max) max = temps[i];\n  }\n  return max;\n}\nfunction describe(temp) {\n  if (temp < 10) return 'kallt';\n  if (temp > 20) return 'varmt';\n  return 'lagom';\n}",
    false,
  ],
  [
    'proj-dice-2',
    'function sumDice(dice) {\n  return dice[0] + dice[1] + dice[2] + dice[3] + dice[4];\n}\nfunction hasYatzy(dice) {\n  for (let i = 1; i < dice.length; i++) {\n    if (dice[i] !== dice[0]) return false;\n  }\n  return true;\n}',
    true,
  ],
];

describe('andra svar', () => {
  it.each(otherAnswers)('%s: %j blir godkänt = %s', async (id, code, ok) => {
    const step = projectSteps.find(item => item.id === id);
    expect((await check(step, code)).passed).toBe(ok);
  });
});
