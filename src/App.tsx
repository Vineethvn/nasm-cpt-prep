import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { ModuleListPage } from './pages/ModuleListPage'
import { ModulePage } from './pages/ModulePage'
import { WeakSpotsPage } from './pages/WeakSpotsPage'
import { SettingsPage } from './pages/SettingsPage'
import { TrainersHubPage } from './pages/TrainersHubPage'
import { MuscleImbalanceTrainerPage } from './pages/trainers/MuscleImbalanceTrainerPage'
import { AcuteVariablesGridPage } from './pages/trainers/AcuteVariablesGridPage'
import { VTZoneLabPage } from './pages/trainers/VTZoneLabPage'
import { StagesOfChangePage } from './pages/trainers/StagesOfChangePage'
import { CommunicationSorterPage } from './pages/trainers/CommunicationSorterPage'
import { NumbersVaultPage } from './pages/trainers/NumbersVaultPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="modules" element={<ModuleListPage />} />
          <Route path="modules/:moduleId" element={<ModulePage />} />
          <Route path="trainers" element={<TrainersHubPage />} />
          <Route path="trainers/muscle-imbalance" element={<MuscleImbalanceTrainerPage />} />
          <Route path="trainers/acute-variables" element={<AcuteVariablesGridPage />} />
          <Route path="trainers/vt-zone-lab" element={<VTZoneLabPage />} />
          <Route path="trainers/stages-of-change" element={<StagesOfChangePage />} />
          <Route path="trainers/communication-sorter" element={<CommunicationSorterPage />} />
          <Route path="trainers/numbers-vault" element={<NumbersVaultPage />} />
          <Route path="weak-spots" element={<WeakSpotsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
