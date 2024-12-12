import { useEffect, useState } from 'react';
import { RootStore } from './stores/RootStore';
import { StoreProvider } from './stores/StoreContext';
import './styles.css';
import { AppDescription } from './view/components/AppDescription/AppDescription';
import { Upload } from './view/components/Upload/Upload';

const rootStore = new RootStore();

export const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    setTheme(prefersDarkScheme ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <StoreProvider store={rootStore}>
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">JSONL File Generator</h1>

          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </header>
        <main className="app-content">
          <AppDescription />
          <Upload />
        </main>
      </div>
    </StoreProvider>
  );
};
