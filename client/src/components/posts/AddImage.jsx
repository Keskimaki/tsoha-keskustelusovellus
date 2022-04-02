import React from 'react'

import { SmallButton } from '../../assets/styles'
import { BASE_URI } from '../../config'

const AddImage = ({ postId }) => {
  return (
    <div>
      <iframe name="dummy" id="dummy" style={{ display: 'none' }}></iframe>
      <form target="dummy" action={`${BASE_URI}/images/${postId}`} method="POST" encType="multipart/form-data" >
        <SmallButton type="submit">Upload</SmallButton>
        <input type="file" name="file" />
      </form>
    </div>
  )
}

export default AddImage
