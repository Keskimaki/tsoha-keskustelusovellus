import React, { useContext } from 'react'

import { HeaderWrapper, HeaderLink } from '../assets/styles'
import { logoutUser } from '../services/login'
import { UserContext } from './user/UserProvider'

const Header = () => {
  const [user, setUser] = useContext(UserContext)

  return (
    <HeaderWrapper>
      <HeaderLink to="/">Boards</HeaderLink>
      {user
        ? <>
          <HeaderLink to={`/user/${user.id}`}>{user.username}</HeaderLink>
          <HeaderLink to="/" onClick={() => logoutUser(setUser)}>
            Logout
          </HeaderLink>
        </>
        : <>
          <HeaderLink to="/login">Login</HeaderLink>
          <HeaderLink to="/create">Create Account</HeaderLink>
        </>
      }
    </HeaderWrapper>
  )
}

export default Header
