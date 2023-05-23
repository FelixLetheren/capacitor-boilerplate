import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { Routing } from './routing';

async function render() {
  const rootElementId = 'root';
  const container = document.getElementById(rootElementId);
  if (!container) {
    throw new Error(`Root element ${rootElementId} not found in page`);
  }
  const root = createRoot(container);
  root.render(
    <HashRouter>
      <Routing />
    </HashRouter>
  );
}

render();
