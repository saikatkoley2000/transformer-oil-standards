import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import MasterMatrix from './pages/MasterMatrix';
import StandardsLibrary from './pages/StandardsLibrary';
import CrossReference from './pages/CrossReference';
import { TestMethods, SpecStandards, MaintenanceSampling, InternalSpecs, HistoricalLegacy } from './pages/FilteredPages';
import QuickReference from './pages/QuickReference';
import TdsList from './pages/TdsList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="matrix" element={<MasterMatrix />} />
          <Route path="library" element={<StandardsLibrary />} />
          <Route path="cross-reference" element={<CrossReference />} />
          <Route path="test-methods" element={<TestMethods />} />
          <Route path="specs" element={<SpecStandards />} />
          <Route path="maintenance" element={<MaintenanceSampling />} />
          <Route path="internal" element={<InternalSpecs />} />
          <Route path="historical" element={<HistoricalLegacy />} />
          <Route path="quick-ref" element={<QuickReference />} />
          <Route path="tds" element={<TdsList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
