import React, { useState, useEffect } from 'react'

import { Title, TextInput } from '../assets/styles'
import { getAllPosts } from '../services/posts'
import Post from './posts/post'

const Search = () => {
  const [search, setSearch] = useState('')
  const [posts, setPosts] = useState([])

  useEffect(async () => {
    const data = await getAllPosts()
    setPosts(data.sort((a, b) => b.id - a.id))
  }, [])

  return (
    <div>
      <Title>Search</Title>
      <TextInput
        as="input"
        type="text"
        placeholder="Search by content"
        value={search}
        onChange={({ target }) => setSearch(target.value.toLowerCase())} />
      {search.length > 3 && posts.filter(post => post.content.toLowerCase().includes(search)).map(post =>
        <Post key={post.id} post={post} />
      )}
    </div>
  )
}

export default Search
