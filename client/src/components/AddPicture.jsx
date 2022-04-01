import React from 'react'

import { Title, Button } from '../assets/styles'
import { BASE_URI } from '../config'

const AddPicture = () => {
  return (
    <div>
      <Title>Add Picture</Title>
      <iframe name="dummy" id="dummy" style={{ display: 'none' }}></iframe>
      <form target="dummy" action={`${BASE_URI}/images/1`} method="POST" encType="multipart/form-data" >
        <input type="file" name="file" />
        <Button type="submit">Upload</Button>
      </form>
    </div>
  )
}

export default AddPicture
