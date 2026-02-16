import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import FontSampler from './components/FontSampler';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/design" element={<FontSampler />} />
    </Routes>
  );
}
