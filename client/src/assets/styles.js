import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import { Field } from 'formik'

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #262626;
  height: 100vh;
  margin: 0;
`

export const HeaderWrapper = styled.header`
  width: 100vw;
  display: flex;
  flex-direction: row-reverse;
  background-color: black;
  padding: 1em 0em;
`

export const HeaderLink = styled(RouterLink)`
  text-decoration: none;
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  margin-right: 0.5em;
`

export const Wrapper = styled.div`
  width: 80vw; 
  color: white;
  background-color: #4d4d4d;
  font-size: 1.5em;
  margin: 0.5em 1em;
  border-radius: 0.5em;
  padding: 1em;
`

export const Link = styled(RouterLink)`
  text-decoration: none;
  color: #24292e;
`

export const Title = styled.h1`
  color: white;
  margin: 0.5em;
`

export const Button = styled.button`
  background: dodgerblue;
  color: white;
  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 2px solid dodgerblue;
  border-radius: 0.5em;
`

export const TextField = styled(Field)`
  color: white;
  background-color: #4d4d4d;
  border: 0.2em solid #24292e;
  border-radius: 0.3em;
  padding: 0.5em;
  margin: 0.5em;
`

export const FooterWrapper = styled.footer`
  width: 100vw;
  margin-top: auto;
  background-color: black;
  color: white;
  text-align: center;
  padding: 1em 0em;
`
