import React, { useContext } from 'react'

import { HeaderWrapper, HeaderLink } from '../assets/styles'
import { logoutUser } from '../services/login'
import { UserContext } from './UserProvider'

const Header = () => {
  const [user, setUser] = useContext(UserContext)

  return (
    <HeaderWrapper>
      {user
        ? <>
          <HeaderLink to="/" onClick={() => logoutUser(setUser)}>
            Logout
          </HeaderLink>
          <HeaderLink to="/user">{user.username}</HeaderLink>
        </>
        : <>
          <HeaderLink to="/create">Create Account</HeaderLink>
          <HeaderLink to="/login">Login</HeaderLink>
        </>
      }
      <HeaderLink to="/">Forum</HeaderLink>
    </HeaderWrapper>
  )
}

export default Header
