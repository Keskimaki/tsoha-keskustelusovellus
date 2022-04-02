import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'

import { createUser, updateUser } from '../../services/user'
import { FormWrapper, Title, Button, TextField } from '../../assets/styles'
import { UserContext } from './UserProvider'

const MakeUser = () => {
  const context = useContext(UserContext)
  const navigate = useNavigate()

  const handleAccountCreation = async ({ username, password, repeatPassword }) => {
    // TODO username length and password quality checks, maybe move to backend?
    if (password !== repeatPassword) {
      console.log('Password and and repeat must match')
      return
    }

    const data = await createUser(username, password)

    updateUser(context, data)
    navigate('/')
  }

  return (
    <FormWrapper>
      <Title>Create Account</Title>
      <Formik
        initialValues={{ username: '', password: '', repeatPassword: '' }}
        onSubmit={handleAccountCreation}>
          <Form>
            <TextField name="username" placeholder="username" type="text" /> <br />
            <TextField name="password" placeholder="password" type="password" /> <br />
            <TextField name="repeatPassword" placeholder="repeat password" type="password" /> <br />
            <Button type="submit">Create Account</Button>
          </Form>
      </Formik>
    </FormWrapper>
  )
}

export default MakeUser
