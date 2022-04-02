import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'

import { loginUser } from '../services/login'
import { updateUser } from '../services/user'
import { FormWrapper, Title, TextField, Button } from '../assets/styles'
import { UserContext } from './user/UserProvider'

const Login = () => {
  const context = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogin = async ({ username, password }) => {
    const data = await loginUser(username, password)

    updateUser(context, data)
    navigate('/')
  }

  return (
    <FormWrapper>
      <Title>Login</Title>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={handleLogin}>
        <Form>
          <TextField name="username" placeholder="username" type="text" /> <br />
          <TextField name="password" placeholder="password" type="password" /> <br />
          <Button primary type="submit">Login</Button>
        </Form>
      </Formik>
    </FormWrapper>
  )
}

export default Login
