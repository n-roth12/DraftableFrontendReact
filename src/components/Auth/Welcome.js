import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";

const Welcome = () => {
  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentToken)

  const welcome = user ? `Welcome user ${user}!` : 'Welcome'
  const tokenAbbr = `${token.slice(0, 9)}...`

  const content = (
    <section>
      <h1>{welcome}</h1>
      <p>Token: {tokenAbbr}</p>
      <p><Link to="/rankingslist">Go to the custom rankings</Link></p>
    </section>
  )
  return content
}

export default Welcome