import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { AppWrapper } from './assets/styles'
import Header from './components/Header'
import Boards from './components/Boards'
import Threads from './components/thread/Threads'
import Posts from './components/post/Posts'
import User from './components/User'
import Login from './components/Login'
import Footer from './components/Footer'

import UserProvider from './components/UserProvider'

const App = () => (
    <AppWrapper>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Boards />} />
          <Route path="/:boardName" element={<Threads />} />
          <Route path="/:boardName/:threadName" element={<Posts />} />
          <Route path="/create" element={<User />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </UserProvider>
    </AppWrapper>
)

export default App
