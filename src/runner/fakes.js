// Låtsasversioner av det webbläsaren har, för övningarna om effekter.
// De skapas på nytt för varje test, så att inget följer med mellan dem.

export function createStorage() {
  const items = new Map();
  return {
    getItem: key => (items.has(String(key)) ? items.get(String(key)) : null),
    setItem(key, value) {
      this.writes += 1;
      items.set(String(key), String(value));
    },
    removeItem: key => items.delete(String(key)),
    clear: () => items.clear(),
    // Hur många gånger setItem anropats, så att testerna kan se hur
    // ofta en effekt körts.
    writes: 0,
  };
}

// En klocka som bara går när testet säger till: clock.tick(3000)
// kör allt som skulle ha hänt under tre sekunder.
export function createClock() {
  const timers = new Map();
  let now = 0;
  let nextId = 1;

  function add(callback, ms, repeat) {
    const id = nextId++;
    const delay = Math.max(Number(ms) || 0, repeat ? 1 : 0);
    timers.set(id, { callback, at: now + delay, delay, repeat });
    return id;
  }

  return {
    setTimeout: (callback, ms) => add(callback, ms, false),
    setInterval: (callback, ms) => add(callback, ms, true),
    clearTimeout: id => timers.delete(id),
    clearInterval: id => timers.delete(id),

    // run låter mount köra varje anrop så att React hinner rita om
    // mellan dem, precis som i webbläsaren.
    tick(ms, run = callback => callback()) {
      const end = now + ms;
      for (;;) {
        const due = [...timers.entries()]
          .filter(([, timer]) => timer.at <= end)
          .sort((a, b) => a[1].at - b[1].at)[0];
        if (!due) break;
        const [id, timer] = due;
        now = timer.at;
        if (timer.repeat) timer.at += timer.delay;
        else timers.delete(id);
        run(timer.callback);
      }
      now = end;
    },

    // Antal timers som fortfarande är igång.
    active: () => timers.size,
  };
}
