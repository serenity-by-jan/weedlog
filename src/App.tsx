import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import FontSampler from './components/FontSampler';
import Onboarding from './components/Onboarding';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/design" element={<FontSampler />} />
    </Routes>
  );
}
