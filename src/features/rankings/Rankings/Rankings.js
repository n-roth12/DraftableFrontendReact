import './Rankings.scss'
import { useState } from 'react'
import { FaAngleUp, FaAngleDown, FaInfoCircle } from 'react-icons/fa'
import { Tooltip } from '@mui/material'

const Rankings = ({ players }) => {
  const [sortColumn, setSortColumn] = useState("Rank")
  const [sortAsc, setSortAsc] = useState(true)

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
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {players.map(player =>
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