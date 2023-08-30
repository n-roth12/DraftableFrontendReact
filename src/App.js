import './App.scss'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import RankingsPage from './pages/RankingsPage/RankingsPage'
import CustomRankingsPage from './pages/CustomRankingsPage/CustomRankingsPage'
import EditRankingPage from './pages/EditRankingPage/EditRankingPage'
import EditUserRankingPage from './pages/EditRankingPage/EditUserRankingPage'
import RequireAuth from './features/auth/RequireAuth'
import Layout from './components/Layout'
import PersistLogin from './features/auth/PersistLogin'
import AccountPage from './pages/AccountPage/AccountPage'
import ContactPage from './pages/ContactPage/ContactPage'
import FourOFourPage from './pages/FourOFourPage/FourOFourPage'
import WelcomePage from './pages/WelcomePage/WelcomePage'
import { ScrollToTop } from './utilities/ScrollToTop'
import DraftPage from './pages/DraftPage/DraftPage'
import CreateDraftPage from './pages/CreateDraftPage/CreateDraftPage'

function App() {
  return (
    <div className="App App-light">
      <ScrollToTop />
      <Routes>
        <Route element={<PersistLogin />}>

          <Route path="/" element={<Layout />} >
            <Route index element={<WelcomePage />} />
            <Route path="rankings" element={<RankingsPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="rankings" element={<RankingsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="edit/:templateId" element={<EditRankingPage />} />
            <Route path="draft">
              <Route index element={<CreateDraftPage />} />
              <Route path=":draftId" element={<DraftPage />} />
            </Route>
            <Route path="draft/:draftId" element={<DraftPage />} />
            <Route path="custom">
              <Route index element={<CustomRankingsPage />} />
              <Route path=":rankingId" element={<EditUserRankingPage />} /> 
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="account">
                <Route index element={<AccountPage />} />
              </Route>
            </Route>

          </Route>
          <Route path="*" element={<FourOFourPage />} />
        </Route>
      </Routes>
    </div>
  )
}
export default App
