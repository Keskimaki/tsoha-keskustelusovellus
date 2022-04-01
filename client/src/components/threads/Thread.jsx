import React from 'react'

import { Wrapper, Text, SecondaryText } from '../../assets/styles'

const Thread = ({ thread }) => (
  <Wrapper>
    <strong>{thread.username}</strong> <SecondaryText>{thread.time}</SecondaryText>
    <Text>{thread.name}</Text>
  </Wrapper>
)

export default Thread
