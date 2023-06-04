import { Outlet, Link, Navigate, useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useRefreshMutation } from "./authApiSlice"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./authSlice"
import LoadingScreen from "../../components/Loading/LoadingScreen/LoadingScreen"

const PersistLogin = () => {
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef(false)
  const location = useLocation()
  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, {
    isUninitialized,
    isLoading,
    isSuccess,
    isError,
    error
  }] = useRefreshMutation()

  useEffect(() => {
    console.log(process.env.NODE_ENV, effectRan.current)
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        try {
          await refresh()
          setTrueSuccess(true)
        }
        catch (err) {
          console.error(err)
        }
      }
      if (!token) verifyRefreshToken()
    }

    return () => effectRan.current = true

    // eslint-disable-next-line
  }, [])

  let content
  console.log("isSuccess", isSuccess)
  console.log("token", token)
  console.log("trueSucces", trueSuccess)
  console.log("isuninit", isUninitialized)
  console.log("isLoading", isLoading)
  console.log("isError", isError)
  if (token) { //persist: yes, token: no
    content = <Outlet />
  } else if (isLoading) {
    content = <LoadingScreen />
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />
  } else if (token && isUninitialized) {
    content = <Outlet />
  } else if (isError) {
    content = <Outlet />
  }

  return content
}

export default PersistLogin
