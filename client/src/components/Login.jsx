import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Field, Form } from 'formik'

import { loginUser } from '../services/login'
import { Button } from '../assets/styles'

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
      <h1>Login</h1>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={handleLogin}>
        <Form>
          <Field name="username" type="text" />
          <Field name="password" type="password" />
          <Button primary type="submit">Login</Button>
        </Form>
      </Formik>
    </div>
  )
}

export default Login
