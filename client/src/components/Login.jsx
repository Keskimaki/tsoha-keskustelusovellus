import React, { useState } from 'react'
import { Formik, Field, Form } from 'formik'

import { loginUser } from '../services/login'

const Login = () => {
  const [token, setToken] = useState('')

  const handleLogin = async values => {
    const { username, password } = values
    const data = await loginUser(username, password)

    setToken(data.access_token)
  }

  console.log(token)

  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={handleLogin}>
        <Form>
          <Field name="username" type="text" />
          <Field name="password" type="password" />
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Login
