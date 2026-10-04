// Kör elevens komponent på riktigt i förhandsvisningen, så att man kan
// klicka och skriva i den. Rättningen sker fortfarande i workern; hit
// kommer bara kod som inte fastnade i en oändlig loop där.
//
// localStorage, document.title och fetch är låtsasversioner, så att
// elevens kod aldrig kan röra appens egen sparade progress.
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createFetch, createStorage } from './fakes';
import { transformJsx } from './jsx';
import { createModuleSystem } from './modules';

class ErrorCatcher extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (!this.state.error) return this.props.children;
    return React.createElement(
      'pre',
      { className: 'preview-error' },
      `${this.state.error.name}: ${this.state.error.message}`,
    );
  }
}

function showError(container, error) {
  const pre = container.ownerDocument.createElement('pre');
  pre.className = 'preview-error';
  pre.textContent = `${error.name}: ${error.message}`;
  container.replaceChildren(pre);
}

// Startar förhandsvisningen i container och returnerar en funktion som
// stänger den: komponenten tas bort och elevens timers stoppas.
export function startLivePreview(
  container,
  { code, fileName, files, preview },
) {
  const timers = new Set();
  const runtime = {
    packages: { react: { ...React, default: React } },
    globals: {
      __React: React,
      localStorage: createStorage(),
      document: { title: '' },
      fetch: createFetch({ delay: 600 }),
      setTimeout: (callback, ms) => {
        const id = setTimeout(callback, ms);
        timers.add(id);
        return id;
      },
      setInterval: (callback, ms) => {
        const id = setInterval(callback, ms);
        timers.add(id);
        return id;
      },
      clearTimeout: id => clearTimeout(id),
      clearInterval: id => clearInterval(id),
    },
  };

  let root = null;
  try {
    const modules = createModuleSystem(
      { ...files, [fileName ?? 'main.js']: code },
      runtime,
    );
    const element = modules.runFile(
      fileName ?? 'main.js',
      code,
      `return ${transformJsx(`(${preview})`)};`,
    );
    root = createRoot(container);
    root.render(React.createElement(ErrorCatcher, null, element));
  } catch (error) {
    showError(container, error);
  }

  return () => {
    root?.unmount();
    for (const id of timers) {
      clearTimeout(id);
      clearInterval(id);
    }
  };
}
