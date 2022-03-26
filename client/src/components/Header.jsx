import React from 'react'

import { HeaderWrapper, HeaderLink } from '../assets/styles'

const Header = () => (
    <HeaderWrapper>
        <HeaderLink to="/">Forum</HeaderLink>
        <HeaderLink to="/login">Login</HeaderLink>
        <HeaderLink to="/create">Create Account</HeaderLink>
    </HeaderWrapper>
)

export default Header
