import React, { useEffect } from 'react'
import { Image } from 'react-bootstrap'

export const PreviewImage = React.memo(({ image, ...rest }) => {
  image.preview = URL.createObjectURL(image)

  useEffect(() => {
    return () => {
      image?.preview && URL.revokeObjectURL(image.preview)
    }
  }, [image?.preview])

  return <Image src={image.preview} {...rest} />
})
