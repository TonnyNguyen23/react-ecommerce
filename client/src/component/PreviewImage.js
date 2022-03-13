import React, { useEffect } from 'react'
import { Image } from 'react-bootstrap'

export const PreviewImage = React.memo(({ image, ...rest }) => {
  image.preview = URL.createObjectURL(image)
  console.log({ image })

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(image.preview)
    }
  }, [image])

  return <Image src={image.preview} {...rest} />
})
