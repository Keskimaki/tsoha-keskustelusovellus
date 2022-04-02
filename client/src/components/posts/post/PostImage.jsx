import React, { useState } from 'react'

import { Image, LargeImage } from '../../../assets/styles'
import { BASE_URI } from '../../../config'

const PostImage = ({ postId }) => {
  const [imageFocus, setImageFocus] = useState(false)

  return (
    <div>
      {imageFocus
        ? <LargeImage
          onClick={() => setImageFocus(!imageFocus)}
          src={`${BASE_URI}/images/${postId}`} />
        : <Image
          onClick={() => setImageFocus(!imageFocus)}
          src={`${BASE_URI}/images/${postId}`} />}
    </div>
  )
}

export default PostImage
