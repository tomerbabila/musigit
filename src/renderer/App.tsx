import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import { CustomProvider } from 'rsuite';
import { Home } from './pages';

export default function App() {
  return (
    <CustomProvider theme="dark">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </CustomProvider>
  );
}
