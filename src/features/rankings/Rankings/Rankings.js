import './Rankings.scss'
import { useState } from 'react'
import { FaAngleUp, FaAngleDown, FaInfoCircle } from 'react-icons/fa'
import { Tooltip } from '@mui/material'
import { useCreateNewCustomRankingsMutation } from '../../customRankings/customRankingsApiSlice'

const Rankings = ({ players }) => {
  const [sortColumn, setSortColumn] = useState("Rank")
  const [sortAsc, setSortAsc] = useState(true)
  const [createNewCustomRankings] = useCreateNewCustomRankingsMutation()

  // need to wait until this executes then navigate to the edit page
  const createNewLineup = async (title, template) => {
    await createNewCustomRankings({
      "title": title,
      "template": template,
      "user": "6449a041b0bbf7e173737793"
    })
  }

  const toggleSort = (col) => {
    if (sortColumn === col) {
      setSortAsc(!sortAsc)
    } else {
      setSortColumn(col)
      setSortAsc(true)
    }
  }

  const getSortIcon = (col) => {
    if (sortColumn === col) {
      if (sortAsc === true) {
        return <FaAngleDown className='angle-icon' />
      }
      return <FaAngleUp className='angle-icon' />
    }
  }

  return (
    <table className="rankings-table">
      <thead>
        <tr>
          {["Rank", "Name", "Pos", "Team", "Bye"].map(col =>
            <th onClick={() => toggleSort(col)}
              className={col === "Name" ? "name-header" : ""}>{getSortIcon(col)} {col}
              {col === "Rank" ? <Tooltip title="Expert Consensus"><FaInfoCircle className='info-icon' /></Tooltip> : ""}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {players.rankings.map(player =>
          <tr>
            <td>{player.rank}</td>
            <td className='name'>{player.name}</td>
            <td>{player.position}</td>
            <td>{player.team}</td>
            <td>{player.bye}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default Rankings