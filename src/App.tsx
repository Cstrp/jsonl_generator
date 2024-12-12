import { useEffect, useState } from 'react';
import { RootStore } from './stores/RootStore';
import { StoreProvider } from './stores/StoreContext';
import './styles.css';
import { AppDescription } from './view/components/AppDescription/AppDescription';
import { Form } from './view/components/Form/Form';
import { Upload } from './view/components/Upload/Upload';

const rootStore = new RootStore();

export const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [formValues, setFormValues] = useState<{
    prompt: string;
    inputs: { req: string; res: string }[];
  }>({ prompt: '', inputs: [] });

  console.log(formValues);

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    setTheme(prefersDarkScheme ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleFormSubmit = (values: {
    prompt: string;
    inputs: { req: string; res: string }[];
  }) => {
    setFormValues(values);
  };

  const handleFormChange = (values: {
    prompt: string;
    inputs: { req: string; res: string }[];
  }) => {
    setFormValues(values);
  };

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

          <Form onChange={handleFormChange} onSubmit={handleFormSubmit} />
        </main>
      </div>
    </StoreProvider>
  );
};
