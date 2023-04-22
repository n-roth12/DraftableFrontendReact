import Nav from "../../components/Nav/Nav"
import Rankings from "../../components/Rankings/Rankings"
import PositionFilter from "../../components/PositionFilter/PositionFilter"

const RankingsPage = () => {
  return (
    <div className="rankings-page">
      <Nav />
      <PositionFilter positions={["QB", "RB", "WR", "TE", "DST"]} />
      <Rankings />
    </div>
  )
}

export default RankingsPage