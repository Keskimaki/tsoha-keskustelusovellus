import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Formik, Form } from 'formik'

import { Title, TextField, Button } from '../../assets/styles'
import { getPosts, makePost } from '../../services/posts'
import { UserContext } from '../UserProvider'

const MakePost = ({ setPosts }) => {
  const [user] = useContext(UserContext)
  const { threadName } = useParams()

  const handlePostCreation = async ({ content }) => {
    await makePost(user.token, user.id, threadName, content)

    const data = await getPosts(threadName)
    setPosts(data)
  }

  return (
    <div>
      <Title>Make Post</Title>
      <Formik
        initialValues={{ content: '' }}
        onSubmit={handlePostCreation}>
        <Form>
          <TextField name="content" type="text" /> <br />
          <Button primary type="submit">Post</Button>
        </Form>
      </Formik>
    </div>
  )
}

export default MakePost
