import './RankingsPage.scss'
import Nav from "../../components/Nav/Nav"
import Rankings from "../../components/Rankings/Rankings"
import PositionFilter from "../../components/PositionFilter/PositionFilter"
import SelectFilter from "../../components/SelectFilter/SelectFilter"
import Search from '../../components/Search/Search'
import EditButton from '../../components/EditButton/EditButton'
import { useGetCurrentRankingQuery } from '../../features/rankings/rankingsApiSlice'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const RankingsPage = () => {
  const [format, setFormat] = useState("Standard")
  const navigate = useNavigate()

  const handleFormatChange = (e) => {
    setFormat(e.target.value)
  }
  
  const {
    data: rankings,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetCurrentRankingQuery(format)

  let content
  if (isLoading) {
    content = <p>"Loading..."</p>
  } else if (isSuccess) {
    content = <Rankings players={rankings} />
  } else if (isError) {
    content  = <p>{JSON.stringify(error)}</p>
  }

  return (
    <div className="rankings-page">
      <Nav />
      <div className="content">
        <h1>Draft Rankings</h1>
        <div className="options-wrapper">
          <div className='filters-wrapper'>
            <SelectFilter handleChange={handleFormatChange}/>
            <Search />
          </div>
          <EditButton title={"Customize"} onClick={() => navigate("/rankings/1")} />
        </div>
        <PositionFilter positions={["QB", "RB", "WR", "TE", "DST"]} />
        {content}
      </div>
    </div>
  )
}

export default RankingsPage