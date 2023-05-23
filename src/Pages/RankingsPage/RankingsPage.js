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
import { FaAngleRight } from 'react-icons/fa'
import { selectCurrentToken } from '../../features/auth/authSlice'

const RankingsPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState()
  const token = useSelector(selectCurrentToken)
  const navigate = useNavigate()

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

  const handleFormatChange = (e) => {
    setSelectedTemplate(e.target.value)
  }

  let content
  if (isLoading) {
    content = <p>"Loading..."</p>
  } else if (isSuccess) {
    content = <Rankings players={rankings} />
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>
  }

  const customizeRanking = () => {
    if (!token) {
      return navigate('/login')
    }
    createNewCustomRankings({
      title: "Custom Ranking",
      template: selectedTemplate
    }).unwrap().then(fulfilled => 
      navigate(`/custom/${fulfilled._id}`))
      .catch(rejected => navigate('/login'))
  }

  return (
    <div className="rankings-page">
      <Nav />
      <main>
        <h1>2023 NFL Draft Rankings</h1>
        <p className='description'>Select Customize to edit these rankings.</p>
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
          </div>
          <button
            className='edit-button'
            onClick={customizeRanking}>
            Customize <FaAngleRight />
          </button>
        </div>
        {content}
      </main>
    </div>
  )
}

export default RankingsPage