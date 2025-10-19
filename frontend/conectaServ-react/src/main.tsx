import './styles/utilities/reset.css' /*RESETEO*/
import './styles/utilities/utilities.css' /*UTILITIES*/
import './styles/utilities/base.css' /*BASE*/
import './index.css' //==> ESTE NO DEBE EXISTIR MAS
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
);
