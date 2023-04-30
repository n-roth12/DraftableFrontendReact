import './CustomRankingsPage.scss'
import Nav from "../../components/Nav/Nav"
import CustomRankingsList from "../../components/CustomRankingsList/CustomRankingsList"
import Search from "../../components/Search/Search"
import EditButton from '../../components/EditButton/EditButton'
import NewRankingsDialog from '../../components/Dialogs/NewRankingsDialog/NewRankingsDialog'
import { useGetUserCustomRankingsQuery } from '../../features/rankings/customRankingsApiSlice'
import { useState } from 'react'
import { useGetCurrentRankingTemplatesQuery } from '../../features/rankings/rankingsApiSlice'

const CustomRankingsPage = () => {
  const [showNewRankingsDialog, setShowRankingsDialog] = useState(false)

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
    console.log(customRankings)
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
        <div className='rankings-options'>
          <Search />
          <EditButton title={"New"} onClick={() => setShowRankingsDialog(true)} />
        </div>
        {rankingsContent}
      </div>
    </div>
  )
}

export default CustomRankingsPage