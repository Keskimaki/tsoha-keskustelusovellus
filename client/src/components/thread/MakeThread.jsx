import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Formik, Form } from 'formik'

import { Title, TextField, Button } from '../../assets/styles'
import { getThreads, makeThread } from '../../services/threads'
import { UserContext } from '../UserProvider'

const MakeThread = ({ setThreads }) => {
  const [user] = useContext(UserContext)
  const { boardName } = useParams()

  const handleThreadCreation = async ({ name, content }) => {
    await makeThread(user.token, user.id, boardName, name, content)

    const data = await getThreads(boardName)
    setThreads(data)
  }

  return (
    <div>
      <Title>Make thread</Title>
      <Formik
        initialValues={{ name: '', content: '' }}
        onSubmit={handleThreadCreation}>
        <Form>
          <TextField name="name" type="text" /> <br />
          <TextField name="content" type="text" /> <br />
          <Button primary type="submit">Make thread</Button>
        </Form>
      </Formik>
    </div>
  )
}

export default MakeThread
