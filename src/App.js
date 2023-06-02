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
import AccountPage from './features/acount/AccountPage/AccountPage'
import ContactPage from './features/contact/ContactPage/ContactPage'
import FourOFourPage from './components/FourOFourPage/FourOFourPage'
import { ScrollToTop } from './ScrollToTop'

function App() {
  return (
    <div className="App App-light">
      <ScrollToTop />
      <Routes>
        <Route element={<PersistLogin />}>

          <Route path="/" element={<Layout />} >
            <Route index element={<RankingsPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="rankings" element={<RankingsPage />} />
            <Route path="contact" element={<ContactPage />} />

            <Route element={<RequireAuth />}>
              <Route path="custom">
                <Route index element={<CustomRankingsPage />} />
                <Route path=":rankingId" element={<EditRankingPage />} />
              </Route>
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
