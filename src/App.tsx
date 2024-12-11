import styled from '@emotion/styled';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { FloatingPreview } from './view/components/FloatingPreview/FloatingPreview';
import { DynamicForm } from './view/components/Form/Form';

const AppWrapper = styled(motion.div)`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--background);
  padding: 2rem;
`;

const Container = styled(motion.div)`
  width: 100%;
  max-width: 1000px;
  margin: 2rem auto;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const AppContent = () => {
  const [formValues, setFormValues] = useState<{
    prompt: string;
    inputs: { req: string; res: string }[];
  }>({ prompt: '', inputs: [] });
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    AOS.init({
      duration: 1000,
      once: true,
    });
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
    <AppWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ThemeToggle />
      <Container
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <DynamicForm onChange={handleFormChange} onSubmit={handleFormSubmit} />
        <FloatingPreview
          prompt={formValues.prompt}
          inputs={formValues.inputs}
        />
      </Container>
    </AppWrapper>
  );
};

export const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};
