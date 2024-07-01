import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className='nav-main'>
      <div>WEB-CHALLENGE</div>
      <div className='nav-link'>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
      </div>
    </nav>
  )
}
