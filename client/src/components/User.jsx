import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'

import { createUser, updateUser } from '../services/user'
import { Title, Button, TextField } from '../assets/styles'

const User = () => {
  const navigate = useNavigate()

  const handleAccountCreation = async values => {
    const { username, password, repeatPassword } = values

    // TODO username length and password quality checks, maybe move to backend?
    if (password !== repeatPassword) {
      console.log('Password and and repeat must match')
      return
    }

    const data = await createUser(username, password)

    updateUser(data)
    navigate('/')
  }

  return (
    <div>
      <Title>Create Account</Title>
      <Formik
        initialValues={{ username: '', password: '', repeatPassword: '' }}
        onSubmit={handleAccountCreation}>
          <Form>
            <TextField name="username" type="text" /> <br />
            <TextField name="password" type="password" /> <br />
            <TextField name="repeatPassword" type="password" /> <br />
            <Button type="submit">Create Account</Button>
          </Form>
      </Formik>
    </div>
  )
}

export default User
