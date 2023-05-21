import './CustomRankingsPage.scss'
import Nav from "../../components/Nav/Nav"
import CustomRankingsList from "../../components/CustomRankingsList/CustomRankingsList"
import Search from "../../components/Search/Search"
import EditButton from '../../components/EditButton/EditButton'
import NewRankingsDialog from '../../components/Dialogs/NewRankingsDialog/NewRankingsDialog'
import { useGetUserCustomRankingsQuery, 
  useCreateNewCustomRankingsMutation } from '../../features/rankings/customRankingsApiSlice'
import { useState } from 'react'
import { useGetCurrentRankingTemplatesQuery } from '../../features/rankings/rankingsApiSlice'
import { FaAngleRight } from 'react-icons/fa'

const CustomRankingsPage = () => {
  const [showNewRankingsDialog, setShowRankingsDialog] = useState(false)
  const [createNewCustomRankings] = useCreateNewCustomRankingsMutation()

  const createNewLineup = (title, template) => {
    createNewCustomRankings({
      "title": title,
      "template": template,
      "user": "6449a041b0bbf7e173737793"
    })
  }

  const {
    data: customRankings,
    isLoading: isRankingsLoading,
    isSuccess: isRankingsSuccess,
    isError: isRankingsError,
    error: rankingsError
  } = useGetUserCustomRankingsQuery("6449a041b0bbf7e173737793")

  const {
    data: rankingsTemplates,
    isLoading: isTemplatesLoading,
    isSuccess: isTemplatesSuccess,
    isError: isTemplatesError,
    error: templatesError
  } = useGetCurrentRankingTemplatesQuery()

  let rankingsContent
  if (isRankingsLoading) {
    rankingsContent = <p>"Loading..."</p>
  } else if (isRankingsSuccess) {
    rankingsContent = <CustomRankingsList rankings={customRankings} />
  } else if (isRankingsError) {
    rankingsContent = <p>{JSON.stringify(rankingsError)}</p>
  }

  let templatesContent
  if (isTemplatesSuccess) {
    templatesContent = <NewRankingsDialog
      open={showNewRankingsDialog}
      onClose={() => setShowRankingsDialog(false)}
      templates={rankingsTemplates}
      defaultTitle={`Custom Ranking ${customRankings ? customRankings.length + 1 : ""}`}
      onSubmit={createNewLineup}
    />
  } else {
    templatesContent = null
  }

  return (
    <div className="custom-rankings-page">
      <Nav />
      {templatesContent}
      <div className='content'>
        <h1>Custom Rankings</h1>
        <p className='description'>Create and customize your own tiered draft rankings.</p>
        <div className='rankings-options'>
          <button 
            className='edit-button'
            onClick={() => setShowRankingsDialog(true)}>Create Ranking <FaAngleRight /></button>
        </div>
        {rankingsContent}
      </div>
    </div>
  )
}

export default CustomRankingsPage