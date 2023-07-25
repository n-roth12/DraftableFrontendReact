import React from "react"

const PrintableRanking = () => {
  return (
    <>
      <div id="print_component">
        <ReactToPrint
          trigger={() => <Button>Print this out!</Button>}
          content={() => componentRef}
        />

        <div style={{ display: "none" }}>
          <ComponentToPrint ref={(el) => (componentRef = el)} />
        </div>
      </div>
    </>
  )
}

class ComponentToPrint extends React.Component {
  render() {
    return (
      <div>
        <h2 style={{ color: "green" }}>Attendance</h2>
        <table>
          <thead>
            <th>Rank</th>
            <th>Name</th>
            <th>Pos</th>
            <th>Team</th>
            <th>Bye</th>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Justin Jefferson</td>
              <td>WR</td>
              <td>MIN</td>
              <td>7</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Austin Ekeler</td>
              <td>RB</td>
              <td>LAC</td>
              <td>9</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default PrintableRanking
