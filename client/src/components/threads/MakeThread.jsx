import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'

import { FormWrapper, Title, TextField, Button } from '../../assets/styles'
import { getThreads, makeThread } from '../../services/threads'
import { UserContext } from '../user/UserProvider'

const MakeThread = ({ setThreads }) => {
  const navigate = useNavigate()
  const [user] = useContext(UserContext)
  const { boardName } = useParams()

  const handleThreadCreation = async ({ name, content }) => {
    await makeThread(user.token, user.id, boardName, name, content)

    const data = await getThreads(boardName)
    setThreads(data)

    navigate(`/${boardName}/${name}`)
  }

  if (!user) {
    return null
  }

  return (
    <FormWrapper>
      <Title>Make thread</Title>
      <Formik
        initialValues={{ name: '', content: '' }}
        onSubmit={handleThreadCreation}>
        <Form>
          <TextField name="name" placeholder="title" type="text" required /> <br />
          <TextField name="content" placeholder="content" type="text" required /> <br />
          <Button primary type="submit">Make thread</Button>
        </Form>
      </Formik>
    </FormWrapper>
  )
}

export default MakeThread
