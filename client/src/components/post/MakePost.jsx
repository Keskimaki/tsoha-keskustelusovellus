import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Formik, Form } from 'formik'

import { Title, TextField, Button } from '../../assets/styles'
import { makePost } from '../../services/posts'
import { UserContext } from '../UserProvider'

const MakePost = () => {
  const [user] = useContext(UserContext)
  const { threadName } = useParams()

  const handlePost = async values => {
    const { content } = values
    console.log(user)
    const data = await makePost(user.token, user.id, threadName, content)
    console.log(data)
  }

  return (
    <div>
      <Title>Make Post</Title>
      <Formik
        initialValues={{ content: '' }}
        onSubmit={handlePost}>
        <Form>
          <TextField name="content" type="text" /> <br />
          <Button primary type="submit">Post</Button>
        </Form>
      </Formik>
    </div>
  )
}

export default MakePost
