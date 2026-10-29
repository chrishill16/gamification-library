import { Route, Routes } from 'react-router-dom'

import { Header } from './components/Header'
import { BehaviourDetail } from './pages/BehaviourDetail'
import { BehaviourExplorer } from './pages/BehaviourExplorer'
import { ExamplesGallery } from './pages/ExamplesGallery'
import { Home } from './pages/Home'
import { ImplementationDetail } from './pages/ImplementationDetail'
import { MechanicsExplorer } from './pages/MechanicsExplorer'
import { PatternDetail } from './pages/PatternDetail'

export function App() {
  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main id="main" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/behaviours" element={<BehaviourExplorer />} />
          <Route path="/behaviours/:behaviourId" element={<BehaviourDetail />} />
          <Route path="/mechanics" element={<MechanicsExplorer />} />
          <Route path="/mechanics/:patternId" element={<PatternDetail />} />
          <Route path="/examples" element={<ExamplesGallery />} />
          <Route path="/examples/:implementationId" element={<ImplementationDetail />} />
        </Routes>
      </main>
    </div>
  )
}
