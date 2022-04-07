import React, { useState, useEffect } from 'react'

import { Wrapper, Title, TextField } from '../assets/styles'
import { getAllPosts } from '../services/posts'
import Post from './posts/post'

const Search = () => {
  const [search, setSearch] = useState('')
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllPosts()
      setPosts(data.sort((a, b) => b.id - a.id))
    }
    fetchData()
  }, [])

  return (
    <div>
      <Wrapper>
        <Title>Search</Title>
        <TextField
          as="input"
          type="text"
          placeholder="Search by content"
          value={search}
          onChange={({ target }) => setSearch(target.value.toLowerCase())} />
      </Wrapper>
      {search.length > 3 && posts.filter(post => post.content.toLowerCase().includes(search)).map(post =>
        <Post key={post.id} post={post} />
      )}
    </div>
  )
}

export default Search
