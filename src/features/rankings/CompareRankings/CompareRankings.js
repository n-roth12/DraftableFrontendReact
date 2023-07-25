import { useEffect, useState } from 'react'

const CompareRankings = ({ rankings1, rankings2 }) => {
  const [comparison, setComparison] = useState()

  useEffect(() => {
    let comparisonTemp = {}
    rankings1.forEach(p1 => {
      comparisonTemp[p1.name] = [p1.rank]
    })
    rankings2.forEach(p2 => {
      if (comparisonTemp.includes(p2.name)) {
        comparisonTemp[p1.name].push(p2.rank)
      }
    })
    setComparison(comparisonTemp)
  }, [])

  return (
    <div>
      {rankings1.map(player1 => 
        <p>{player1.name} {comparison[0]} - {comparison[0] - comparison[1]}</p>
      )}
      {rankings2.map(player2 => 
        <p>{player2.name} {comparison[1]} - {comparison[1] - comparison[0]}</p>
      )}
    </div>
  )
}

export default CompareRankings