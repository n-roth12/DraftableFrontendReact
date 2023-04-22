import './Rankings.scss'

const Rankings = () => {
  return (
    <table className="rankings-table">
      <thead>
        <tr>
          <th>ECR</th>
          <th>Name</th>
          <th>Pos</th>
          <th>Team</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td className='name'>Christian McCaffery</td>
          <td>RB</td>
          <td>SF</td>
        </tr>
        <tr>
          <td>2</td>
          <td className='name'>Justin Jefferson</td>
          <td>WR</td>
          <td>MIN</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Rankings