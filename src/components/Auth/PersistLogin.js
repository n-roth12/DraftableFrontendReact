import { Outlet, Link, Navigate, useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useRefreshMutation } from "../../features/auth/authApiSlice"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "../../features/auth/authSlice"

const PersistLogin = () => {
  const location = useLocation()
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef(false)
  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, {
    isUninitialized,
    isLoading,
    isSuccess,
    isError,
    error
  }] = useRefreshMutation()

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        try {
          //const response = 
          await refresh()
          //const { accessToken } = response.data
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
  if (isLoading) { //persist: yes, token: no
    console.log('loading')
    content = "Loading"
  } else if (isError) { //persist: yes, token: no
    console.log('error')
    content = <Navigate to="/login" state={{ from: location }} replace />
  } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
    console.log('success')
    content = <Outlet />
  } else if (token && isUninitialized) { //persist: yes, token: yes
    console.log('token and uninit')
    console.log(isUninitialized)
    content = <Outlet />
  }

  return content
}

export default PersistLogin
