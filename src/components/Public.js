import React from 'react'
import { Link } from 'react-router-dom'

const Public = () => {
  return (
    <div className='public'>
        <h1>Hello, welcome to Drafatbl!</h1>
        <p>This is an intro page blah blah blah</p>
        <Link to={"/login"}>Login to create rankings</Link>
    </div>
  )
}

export default Public
