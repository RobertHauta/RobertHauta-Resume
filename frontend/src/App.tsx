import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Landing } from './pages';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';

const theme = createTheme({
  colors: {
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5c5f66',
      '#373A40',
      '#2C2E33',
      '#25262b',
      '#1A1B1E',
      '#141517',
      '#101113',
    ],
    red: [
      '#ffe9e9',
      '#ffd1d1',
      '#fba0a1',
      '#f76d6d',
      '#f34141',
      '#f22625',
      '#f21616',
      '#d8080b',
      '#c10008',
      '#a90003',
    ],
  },
  primaryColor: 'red',
  defaultRadius: 'md',
  fontFamily: 'Inter, sans-serif',
  headings: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: '700',
  },
});

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications />
      <Router basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
