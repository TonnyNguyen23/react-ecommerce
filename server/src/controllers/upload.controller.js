import catchAsync from '../utils/catchAsync'
import { uploadService } from '../services'

/**
 * Upload avatar
 * @POST api/uploadAvatar
 * @access private
 */
const uploadAvatar = catchAsync(async (req, res) => {
  const url = await uploadService.uploadAvatar(req.file.path)
  return res.send({ url })
})

/**
 * Upload avatar
 * @POST api/uploadAvatar
 * @access private
 */
const uploadProductImage = catchAsync(async (req, res) => {
  const url = await uploadService.uploadAvatar(req.file.path)
  return res.send({ url })
})

export default { uploadAvatar, uploadProductImage }
