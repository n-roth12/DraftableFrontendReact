import DefaultNav from "./DefaultNav/DefaultNav"
import MobileNav from "./MobileNav/MobileNav"
import "./Nav.scss"

const Nav = () => {
  return (
    <>
      <DefaultNav />
      <MobileNav />
    </>
  )
}

export default Nav