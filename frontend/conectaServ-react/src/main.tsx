import './styles/utilities/reset.css'; /*RESETEO*/
import './styles/utilities/utilities.css'; /*UTILITIES*/
import './styles/utilities/base.css'; /*BASE*/
import './index.css'; //==> ESTE NO DEBE EXISTIR MAS
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import GlobalModalProvider from './context/modal/GlobalModalProvider.tsx';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary> {/* ATRAPAR ERRORES DE REACT */}
        <GlobalModalProvider> {/* PARA QUE CUALQUIER MODAL INFORMATIVO TENGA ACCESO GLOBALMENTE */}
          <App />
        </GlobalModalProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
);
