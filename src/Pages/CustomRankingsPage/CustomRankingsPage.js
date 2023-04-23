import './CustomRankingsPage.scss'
import Nav from "../../components/Nav/Nav"
import RankingsList from "../../components/RankingsList/RankingsList"
import Search from "../../components/Search/Search"
import EditButton from '../../components/EditButton/EditButton'

const CustomRankingsPage = () => {
  return (
    <div className="custom-rankings-page">
        <Nav />
        <div className='content'>
          <h1>Custom Rankings</h1>
          <div className='rankings-options'>
            <Search />
            <EditButton title={"New"} />
          </div>
          <RankingsList />
        </div>
    </div>
  )
}

export default CustomRankingsPage