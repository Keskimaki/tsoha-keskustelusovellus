import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { AppWrapper } from './assets/styles'
import Header from './components/Header'
import Boards from './components/boards'
import Threads from './components/threads'
import Posts from './components/posts'
import Search from './components/Search'
import User from './components/user'
import MakeUser from './components/user/MakeUser'
import Login from './components/Login'
import Footer from './components/Footer'
import UserProvider from './components/user/UserProvider'

const App = () => (
    <AppWrapper>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Boards />} />
          <Route path="/:boardName" element={<Threads />} />
          <Route path="/:boardName/:threadName" element={<Posts />} />
          <Route path="/search" element={<Search />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/create" element={<MakeUser />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </UserProvider>
    </AppWrapper>
)

export default App
