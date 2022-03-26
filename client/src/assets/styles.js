import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Field } from 'formik'

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  height: 100vh;
  margin: 0;
`

export const HeaderWrapper = styled.header`
  display: flex;
  gap: 0.5em;
  
  background-color: #24292e;
  padding: 1em;
`

export const HeaderLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 1.5em;
  font-weight: bold;
`

export const Title = styled.h1`
  color: #24292e;
  margin: 0.5em;
`

export const Button = styled.button`
  background: dodgerblue;
  color: white;
  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 2px solid dodgerblue;
  border-radius: 3px;
`

export const TextField = styled(Field)`
  border: 0.2em solid #24292e;
  border-radius: 0.3em;
  padding: 0.5em;
  margin: 0.5em;
`

export const FooterWrapper = styled.footer`
  margin-top: auto;
  background-color: #24292e;
  color: white;
  text-align: center;
  padding: 1em;
`
