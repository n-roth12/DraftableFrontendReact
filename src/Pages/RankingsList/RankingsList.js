import { useGetCurrentRankingQuery } from "../../features/rankings/rankingsApiSlice"
import { Link } from "react-router-dom"

const RankingsList = () => {
  const {
    data: rankings,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetCurrentRankingQuery("PPR")

  let content
  if (isLoading) {
    content = <p>"Loading..."</p>
  } else if (isSuccess) {
    content = (
      <section>
        <h1>Rankings list</h1>
        <ul>
          {/* {rankings.map((ranking, i) => {
            return <li key={i}>{ranking.scoring}</li>
          })} */}
        </ul>
        <Link to="/welcome">Back to welcome</Link>
      </section>
    )
  } else if (isError) {
    content  = <p>{JSON.stringify(error)}</p>
  }
  return content
}

export default RankingsList