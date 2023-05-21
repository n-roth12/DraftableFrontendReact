import './App.scss'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import RankingsPage from './Pages/RankingsPage/RankingsPage'
import CustomRankingsPage from './Pages/CustomRankingsPage/CustomRankingsPage'
import EditRankingPage from './Pages/EditRankingPage/EditRankingPage'
import RequireAuth from './components/Auth/RequireAuth'
import Layout from './components/Layout'
import PersistLogin from './components/Auth/PersistLogin'

function App() {
  return (
    <div className="App App-light">
      <Routes>

        <Route path="/" element={<Layout />} >
          <Route index element={<RankingsPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
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
