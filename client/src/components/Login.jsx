import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'

import { loginUser } from '../services/login'
import { Title, Button, TextField } from '../assets/styles'

const Login = () => {
  const navigate = useNavigate()

  const handleLogin = async values => {
    const { username, password } = values
    const data = await loginUser(username, password)

    window.localStorage.setItem('tsohaUser', JSON.stringify(data))
    navigate('/')
  }

  return (
    <div>
      <Title>Login</Title>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={handleLogin}>
        <Form>
          <TextField name="username" type="text" /> <br />
          <TextField name="password" type="password" /> <br />
          <Button primary type="submit">Login</Button>
        </Form>
      </Formik>
    </div>
  )
}

export default Login
