import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
    <header>
        <Link to="/">Forum</Link>
        <Link to="/login">Login</Link>
        <Link to="/create">Create Account</Link>
    </header>
)

export default Header
