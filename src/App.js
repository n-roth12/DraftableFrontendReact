// import './App.css';
// import { useState, useEffect, useRef } from "react"

// function App() {

//   const dragItem = useRef()
//   const dragOverItem = useRef()
//   const [list, setList] = useState(["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"])

//   const dragStart = (e, position) => {
//     dragItem.current = position
//     console.log(e.target.innerHTML)
//   }

//   const dragEnter = (e, position) => {
//     dragOverItem.current = position
//     console.log(e.target.innerHTML)
//   }

//   const drop = (e) => {
//     const copyListItems = [...list]
//     const dragItemContent = copyListItems[dragItem.current]
//     copyListItems.splice(dragItem.current, 1)
//     copyListItems.splice(dragOverItem.current, 0, dragItemContent)
//     dragItem.current = null
//     dragOverItem.current = null
//     setList(copyListItems)
//   }

//   return (
//     <div className="App">
//       {list && list.map((item, index) => (
//         <div key={index} 
//           draggable 
//           onDragStart={(e) => dragStart(e, index)}
//           onDragEnter={(e) => dragEnter(e, index)}
//           onDragEnd={drop}>
//           {item}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;

import './App.scss'
import Example from './Example'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import RankingsPage from './Pages/RankingsPage/RankingsPage'
import CustomRankingsPage from './Pages/CustomRankingsPage/CustomRankingsPage'
import EditRankingPage from './Pages/EditRankingPage/EditRankingPage'
import RequireAuth from './components/Auth/RequireAuth'
import Welcome from './components/Auth/Welcome'
import Layout from './components/Layout'
import Public from './components/Public'
import RankingsList from './Pages/RankingsList/RankingsList'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`App ${isDarkMode ? "App-dark" : "App-light"}`}>
      <Routes>
        <Route path="/" element={<Layout />} >
          {/* public routes */}
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="rankings" element={<RankingsPage />} />

          {/* protected routes  */}
          <Route element={<RequireAuth />}>
            <Route path="welcome" element={<Welcome />} />
            <Route path="custom" element={<CustomRankingsPage />} />
          </Route>

        </Route>
        {/* <Route path="login" element={
          <Login isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        } />
        <Route path="register" element={
          <Register isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        } />
        <Route path="rankings">
          <Route index element={<RankingsPage />} />
          <Route path="/rankings/:rankingsId" element={<EditRankingPage />} />
        </Route>
        <Route path="custom" element={
          <CustomRankingsPage />
        } /> */}
      </Routes>
    </div>
  )
}
export default App
