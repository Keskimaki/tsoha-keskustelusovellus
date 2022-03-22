import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Field, Form } from 'formik'

import { createUser } from '../services/user'

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

    window.localStorage.setItem('tsohaUser', JSON.stringify(data))
    navigate('/')
  }

  return (
    <div>
      <h1>Create Account</h1>
      <Formik
        initialValues={{ username: '', password: '', repeatPassword: '' }}
        onSubmit={handleAccountCreation}>
          <Form>
            <Field name="username" type="text" />
            <Field name="password" type="password" />
            <Field name="repeatPassword" type="password" />
            <button type="submit">Create Account</button>
          </Form>
      </Formik>
    </div>
  )
}

export default User
