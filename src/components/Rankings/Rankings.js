import './Rankings.scss'
import { useState } from 'react'
import { FaAngleUp, FaAngleDown, FaInfoCircle } from 'react-icons/fa'
import { Tooltip } from '@mui/material'

const Rankings = () => {
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
        return <FaAngleDown className='angle-icon'/>
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
              {col === "Rank" ? <Tooltip title="Expert Consensus"><FaInfoCircle className='info-icon'/></Tooltip> : ""}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td className='name'>Christian McCaffery</td>
          <td>RB</td>
          <td>SF</td>
          <td>8</td>
        </tr>
        <tr>
          <td>2</td>
          <td className='name'>Justin Jefferson</td>
          <td>WR</td>
          <td>MIN</td>
          <td>12</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Rankings