import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'

const Dashboard = lazy(() => import('./pages/Dashboard').then((m) => ({ default: m.Dashboard })))
const ModuleListPage = lazy(() => import('./pages/ModuleListPage').then((m) => ({ default: m.ModuleListPage })))
const ModulePage = lazy(() => import('./pages/ModulePage').then((m) => ({ default: m.ModulePage })))
const SamplePaperPage = lazy(() => import('./pages/SamplePaperPage').then((m) => ({ default: m.SamplePaperPage })))
const WeakSpotsPage = lazy(() => import('./pages/WeakSpotsPage').then((m) => ({ default: m.WeakSpotsPage })))
const SettingsPage = lazy(() => import('./pages/SettingsPage').then((m) => ({ default: m.SettingsPage })))
const TrainersHubPage = lazy(() => import('./pages/TrainersHubPage').then((m) => ({ default: m.TrainersHubPage })))
const MuscleImbalanceTrainerPage = lazy(() =>
  import('./pages/trainers/MuscleImbalanceTrainerPage').then((m) => ({ default: m.MuscleImbalanceTrainerPage })),
)
const AcuteVariablesGridPage = lazy(() =>
  import('./pages/trainers/AcuteVariablesGridPage').then((m) => ({ default: m.AcuteVariablesGridPage })),
)
const VTZoneLabPage = lazy(() => import('./pages/trainers/VTZoneLabPage').then((m) => ({ default: m.VTZoneLabPage })))
const StagesOfChangePage = lazy(() =>
  import('./pages/trainers/StagesOfChangePage').then((m) => ({ default: m.StagesOfChangePage })),
)
const CommunicationSorterPage = lazy(() =>
  import('./pages/trainers/CommunicationSorterPage').then((m) => ({ default: m.CommunicationSorterPage })),
)
const NumbersVaultPage = lazy(() =>
  import('./pages/trainers/NumbersVaultPage').then((m) => ({ default: m.NumbersVaultPage })),
)
const MockExamPage = lazy(() => import('./pages/MockExamPage').then((m) => ({ default: m.MockExamPage })))
const MyQuestionsPage = lazy(() => import('./pages/MyQuestionsPage').then((m) => ({ default: m.MyQuestionsPage })))
const SearchPage = lazy(() => import('./pages/SearchPage').then((m) => ({ default: m.SearchPage })))

function PageFallback() {
  return <div className="p-6 text-sm text-(--color-text-muted)">Loading…</div>
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="modules" element={<ModuleListPage />} />
            <Route path="modules/:moduleId" element={<ModulePage />} />
            <Route path="sample-paper" element={<SamplePaperPage />} />
            <Route path="mock-exam" element={<MockExamPage />} />
            <Route path="my-questions" element={<MyQuestionsPage />} />
            <Route path="search" element={<SearchPage />} />
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
      </Suspense>
    </BrowserRouter>
  )
}
