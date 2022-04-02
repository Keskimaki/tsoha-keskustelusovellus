import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Formik, Form } from 'formik'

import { FormWrapper, Title, TextField, Button } from '../../assets/styles'
import { makePost } from '../../services/posts'
import { UserContext } from '../user/UserProvider'

const MakePost = ({ updatePosts }) => {
  const [user] = useContext(UserContext)
  const { threadName } = useParams()

  const handlePostCreation = async ({ content }, { resetForm }) => {
    await makePost(user.token, user.id, threadName, content)
    await updatePosts()

    resetForm()
  }

  if (!user) {
    return null
  }

  return (
    <FormWrapper>
      <Title>Make Post</Title>
      <Formik
        initialValues={{ content: '' }}
        onSubmit={handlePostCreation}>
        <Form>
          <TextField name="content" placeholder="content" type="text" /> <br />
          <Button primary type="submit">Post</Button>
        </Form>
      </Formik>
    </FormWrapper>
  )
}

export default MakePost
