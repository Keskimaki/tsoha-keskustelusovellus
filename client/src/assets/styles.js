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
  justify-content: center;
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

export const Text = styled.p`
  color: white;
  margin: 0em;
`

export const SecondaryText = styled.span`
  font-size: 0.8em;
  color: #828282;
  margin: 0em;
`

export const SecondaryTextRight = styled(SecondaryText)`
  position: absolute;
  right: 10vw;
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

export const SmallButton = styled.button`
  background: dodgerblue;
  color: white;
  margin: 0.5em 0.5em 0.5em 0em;
  border: 2px solid dodgerblue;
  border-radius: 0.5em;
`

export const FormWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const TextField = styled(Field)`
  color: white;
  font-size: 1em;
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
export const Image = styled.img`
  width: 40%;
  height: auto;
`

export const LargeImage = styled.img`
  width: 100%;
  height: auto;
`
