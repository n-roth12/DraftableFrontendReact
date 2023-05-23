import './App.scss'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './features/auth/LoginPage/LoginPage'
import RegisterPage from './features/auth/RegisterPage/RegisterPage'
import RankingsPage from './features/rankings/RankingsPage/RankingsPage'
import CustomRankingsPage from './features/customRankings/CustomRankingsPage/CustomRankingsPage'
import EditRankingPage from './features/customRankings/EditRankingPage/EditRankingPage'
import RequireAuth from './features/auth/RequireAuth'
import Layout from './components/Layout'
import PersistLogin from './features/auth/PersistLogin'

function App() {
  return (
    <div className="App App-light">
      <Routes>

        <Route path="/" element={<Layout />} >
          <Route index element={<RankingsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="rankings" element={<RankingsPage />} />

          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="custom">
                <Route index element={<CustomRankingsPage />} />
                <Route path=":rankingId" element={<EditRankingPage />} />
              </Route>
            </Route>
          </Route>

        </Route>
      </Routes>
    </div>
  )
}
export default App
