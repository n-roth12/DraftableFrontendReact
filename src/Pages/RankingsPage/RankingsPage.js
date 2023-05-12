import './RankingsPage.scss'
import Nav from "../../components/Nav/Nav"
import Rankings from "../../components/Rankings/Rankings"
import PositionFilter from "../../components/PositionFilter/PositionFilter"
import SelectFilter from "../../components/SelectFilter/SelectFilter"
import Search from '../../components/Search/Search'
import EditButton from '../../components/EditButton/EditButton'
import { useGetCurrentRankingQuery } from '../../features/rankings/rankingsApiSlice'
import { useNavigate } from 'react-router-dom'
import NewRankingsDialog from '../../components/Dialogs/NewRankingsDialog/NewRankingsDialog'
import { useGetCurrentRankingTemplatesQuery } from '../../features/rankings/rankingsApiSlice'
import { useGetRankingByIdQuery } from '../../features/rankings/rankingsApiSlice'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useCreateNewCustomRankingsMutation } from '../../features/rankings/customRankingsApiSlice'

const RankingsPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState()

  const {
    data: rankingsTemplates,
    isLoading: isTemplatesLoading,
    isSuccess: isTemplatesSuccess,
    isError: isTemplatesError,
    error: templatesError
  } = useGetCurrentRankingTemplatesQuery()

  useEffect(() => {
    setSelectedTemplate(rankingsTemplates && rankingsTemplates.length > 0 && rankingsTemplates[0]._id)
  }, [rankingsTemplates])

  const {
    data: rankings,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetRankingByIdQuery(selectedTemplate ? selectedTemplate : skipToken)

  const [createNewCustomRankings] = useCreateNewCustomRankingsMutation()
  const navigate = useNavigate()

  const handleFormatChange = (e) => {
    setSelectedTemplate(e.target.value)
  }

  const createNewLineup = (title, template) => {
    createNewCustomRankings({
      "title": title,
      "template": template,
      "user": "6449a041b0bbf7e173737793"
    })
  }

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
            {rankingsTemplates && rankingsTemplates.length > 0 &&
              <SelectFilter 
                templates={rankingsTemplates} 
                defaultTemplate={rankingsTemplates[0]._id}
                handleChange={handleFormatChange} 
                selectedTemplate={selectedTemplate} 
              />
            }
            <Search />
          </div>
          <EditButton title={"Customize"} />
        </div>
        <PositionFilter positions={["QB", "RB", "WR", "TE", "DST"]} />
        {content}
      </div>
    </div>
  )
}

export default RankingsPage