import './RankingsPage.scss'
import Nav from "../../components/Nav/Nav"
import Rankings from "../../components/Rankings/Rankings"
import PositionFilter from "../../components/PositionFilter/PositionFilter"
import SelectFilter from "../../components/SelectFilter/SelectFilter"
import Search from '../../components/Search/Search'

const RankingsPage = () => {
  return (
    <div className="rankings-page">
      <Nav />
      <div className="content">
        <h1>Draft Rankings</h1>
        <div className="filters-wrapper">
          <SelectFilter />
          <Search />
        </div>
        <PositionFilter positions={["QB", "RB", "WR", "TE", "DST"]} />
        <Rankings />
      </div>
    </div>
  )
}

export default RankingsPage