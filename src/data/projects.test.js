import { describe, expect, it } from 'vitest';
import { evaluate } from '../runner/evaluate';
import { findMissingSemicolons } from '../runner/style';
import { isProjectComplete, projects, projectSteps } from './projects';
import { lessons } from './lesson';
import { tracks } from './tracks';

async function check(step, code) {
  const { error, results } = await evaluate(code, step.tests, step.sourceChecks);
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

  it.each(projectSteps)('$id har tester och tre ledtrådar', step => {
    expect(step.tests.length).toBeGreaterThan(0);
    expect(step.hints).toHaveLength(3);
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
];

describe('andra svar', () => {
  it.each(otherAnswers)('%s: %j blir godkänt = %s', async (id, code, ok) => {
    const step = projectSteps.find(item => item.id === id);
    expect((await check(step, code)).passed).toBe(ok);
  });
});
