import './CustomRankingsPage.scss'
import Nav from "../../components/Nav/Nav"
import RankingsList from "../../components/RankingsList/RankingsList"
import Search from "../../components/Search/Search"
import EditButton from '../../components/EditButton/EditButton'
import NewRankingsDialog from '../../components/Dialogs/NewRankingsDialog/NewRankingsDialog'
import { useState } from 'react'

const CustomRankingsPage = () => {
  const [showNewRankingsDialog, setShowRankingsDialog] = useState(false)

  return (
    <div className="custom-rankings-page">
      <NewRankingsDialog open={showNewRankingsDialog} onClose={() => setShowRankingsDialog(false)} />
      <Nav />
      <div className='content'>
        <h1>Custom Rankings</h1>
        <div className='rankings-options'>
          <Search />
          <EditButton title={"New"} onClick={() => setShowRankingsDialog(true)} />
        </div>
        <RankingsList />
      </div>
    </div>
  )
}

export default CustomRankingsPage