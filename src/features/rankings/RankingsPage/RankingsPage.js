import './RankingsPage.scss'
import Nav from "../../../components/Nav/Nav"
import Footer from '../../../components/Footer/Footer'
import Rankings from "../Rankings/Rankings"
import SelectFilter from "../../../components/SelectFilter/SelectFilter"
import { useNavigate } from 'react-router-dom'
import { useGetCurrentRankingTemplatesQuery } from '../rankingsApiSlice'
import { useGetRankingByIdQuery } from '../rankingsApiSlice'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useCreateNewCustomRankingsMutation } from '../../customRankings/customRankingsApiSlice'
import { FaAngleRight } from 'react-icons/fa'
import { selectCurrentToken } from '../../auth/authSlice'
import PositionFilter from '../../../components/PositionFilter/PositionFilter'
import Helmet from 'react-helmet'
import LoadingBlock from '../../../components/Loading/LoadingBlock/LoadingBlock'

const RankingsPage = () => {
  const token = useSelector(selectCurrentToken)
  const [selectedTemplate, setSelectedTemplate] = useState()
  const [positions, setPositions] = useState([])
  const [selectedPosition, setSelectedPosition] = useState("ALL")
  const navigate = useNavigate()
  const [createNewCustomRankings] = useCreateNewCustomRankingsMutation()

  const {
    data: rankingsTemplates,
    isLoading: isTemplatesLoading,
    isSuccess: isTemplatesSuccess,
    isError: isTemplatesError,
    error: templatesError
  } = useGetCurrentRankingTemplatesQuery()

  const {
    data: rankings,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetRankingByIdQuery(selectedTemplate ? selectedTemplate : skipToken)

  useEffect(() => {
    setSelectedTemplate(rankingsTemplates && rankingsTemplates.length > 0 && rankingsTemplates[0]._id)
  }, [rankingsTemplates])

  useEffect(() => {
    setPositions(Array.from(getPositions(rankings?.rankings)))
  }, [rankings])

  const handleFormatChange = (e) => {
    setSelectedTemplate(e.target.value)
  }

  const filterPlayers = (players) => {
    if (selectedPosition === "ALL") {
      return players
    }
    return players.filter(player =>
      player?.position === selectedPosition
    )
  }

  let content
  if (isLoading) {
    content = <LoadingBlock />
  } else if (isSuccess) {
    content = <Rankings players={filterPlayers(rankings?.rankings)} />
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

  const getPositions = (players) => {
    let positions = new Set()
    players?.forEach(player => {
      if (player?.position && !positions.has(player?.position)) {
        positions.add(player?.position)
      }
    })
    return positions
  }

  return (
    <div className="rankings-page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>NFL Fantasy Rankings | Draftabl</title>
        <meta name='description' content="Customize your own FREE fantasy football draft rankings with Draftabl's 
        easy to use drag-and-drop interface. Create tiers for each position, as well as overall ranking." />
      </Helmet>
      <Nav />
      <main>
        <h1>2023 NFL Fantasy Draft Rankings</h1>
        <p className='description'>Select Customize to edit these rankings.</p>
        <div className="options-wrapper">
          {rankingsTemplates && rankingsTemplates.length > 0 &&
            <SelectFilter
              templates={rankingsTemplates}
              defaultTemplate={rankingsTemplates[0]._id}
              handleChange={handleFormatChange}
              selectedTemplate={selectedTemplate}
            />
          }
          <div className='options-row'>
            <PositionFilter 
              positions={positions} 
              selectedPos={selectedPosition} 
              onChange={setSelectedPosition} />
            <button
              className='edit-button'
              onClick={customizeRanking}>
              Customize <FaAngleRight />
            </button>
          </div>
        </div>
        {content}
      </main>
      <Footer />
    </div>
  )
}

export default RankingsPage