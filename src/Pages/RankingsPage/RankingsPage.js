import './RankingsPage.scss'
import Nav from "../../components/Nav/Nav"
import Rankings from "../../components/Rankings/Rankings"
import PositionFilter from "../../components/PositionFilter/PositionFilter"
import SelectFilter from "../../components/SelectFilter/SelectFilter"
import Search from '../../components/Search/Search'
import EditButton from '../../components/EditButton/EditButton'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAllDraftables } from '../../features/draftables/draftablesSlice'

const RankingsPage = () => {
  const navigate = useNavigate()
  const draftables = useSelector(selectAllDraftables)

  return (
    <div className="rankings-page">
      <Nav />
      <div className="content">
        <h1>Draft Rankings</h1>
        <div className="options-wrapper">
          <div className='filters-wrapper'>
            <SelectFilter />
            <Search />
          </div>
          <EditButton title={"Customize"} onClick={() => navigate("/rankings/1")} />
        </div>
        <PositionFilter positions={["QB", "RB", "WR", "TE", "DST"]} />
        <Rankings />
        {draftables}
      </div>
    </div>
  )
}

export default RankingsPage