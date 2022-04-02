import React from 'react'

import { SmallButton } from '../../assets/styles'
import { BASE_URI } from '../../config'

const AddImage = ({ postId, updatePosts, setImageFocus }) => {
  const handleImageAddition = async () => {
    setTimeout(async () => {
      await updatePosts()
      setImageFocus(false)
    }, 1000)
  }

  return (
    <div>
      <iframe name="dummy" id="dummy" style={{ display: 'none' }}></iframe>
      <form
        target="dummy"
        action={`${BASE_URI}/images/${postId}`}
        method="POST"
        encType="multipart/form-data" >
        <SmallButton
          onClick={handleImageAddition}
          type="submit">
          Upload
        </SmallButton>
        <input type="file" name="file" />
      </form>
    </div>
  )
}

export default AddImage
