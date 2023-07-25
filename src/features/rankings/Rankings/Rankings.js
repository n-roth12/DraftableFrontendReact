import './Rankings.scss'
import { useEffect, useState } from 'react'
import { FaAngleUp, FaAngleDown, FaInfoCircle } from 'react-icons/fa'
import { Tooltip } from '@mui/material'

const Rankings = ({ players }) => {
  const [sortColumn, setSortColumn] = useState("Rank")
  const [sortDesc, setSortDesc] = useState(true)
  const [playersList, setPlayersList] = useState([])

  useEffect(() => {
    if (players?.length) {
      setPlayersList([...players])
    }
  }, [players])

  const toggleSort = (col) => {
    if (sortColumn === col) {
      setSortDesc(!sortDesc)
    } else {
      setSortColumn(col)
      setSortDesc(true)
    }
  }

  const getSortIcon = (col) => {
    if (sortColumn === col) {
      if (sortDesc === true) {
        return <FaAngleDown className='angle-icon' />
      }
      return <FaAngleUp className='angle-icon' />
    }
  }

  const sortFunction = (a, b) => {
    if (sortColumn === "Rank") {
      if (sortDesc) {
        return a.rank - b.rank
      } else {
        return b.rank - a.rank
      }
    } else if (sortColumn === "Name") {
      if (sortDesc) {
        return a.name.localeCompare(b.name)
      } else {
        return b.name.localeCompare(a.name)
      }
    } else if (sortColumn === "Pos") {
      if (sortDesc) {
        return a.position.localeCompare(b.position)
      } else {
        return b.position.localeCompare(a.position)
      }
    } else if (sortColumn === "Team") {
      if (sortDesc) {
        if (!a.team) {
          return 1000
        }
        return a.team?.localeCompare(b.team)
      } else {
        if (!b.team) {
          return -1000
        }
        return b.team?.localeCompare(a.team)
      }
    } else if (sortColumn === "Bye") {
      if (sortDesc) {
        if (!a.bye) {
          return 1000
        }
        return a.bye - b.bye
      } else {
        if (!b.bye) {
          return -1000
        }
        return b.bye - a.bye
      }
    }
  }

  return (
    <table className="rankings-table">
      <thead>
        <tr>
          {["Rank", "Name", "Pos", "Team", "Bye"].map(col =>
            <th key={col} onClick={() => toggleSort(col)}
              className={col === "Name" ? "name-header" : ""}>{getSortIcon(col)} {col}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {playersList
          ?.sort(sortFunction)
          .map((player, index) =>
          <tr key={index}>
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