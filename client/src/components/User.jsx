import React from 'react'
import { Formik, Field, Form } from 'formik'

import { createUser } from '../services/user' 

const User = () => {
  const handleAccountCreation = async values => {
    const { username, password, repeatPassword } = values

    // TODO username length and password quality checks, maybe move to backend?
    if (password !== repeatPassword) {
      console.log('Password and and repeat must match')
      return
    }

    const data = await createUser(username, password)

    return data.access_token
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
            <Field name="repeat_password" type="password" />
            <button type="submit">Create Account</button>
          </Form>
      </Formik>
    </div>
  )
}

export default User
