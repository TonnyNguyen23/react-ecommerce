import { Router } from 'express'
import upload from '../middlewares/upload'
import uploadStorage from '../middlewares/uploadStorage'
import auth from '../middlewares/auth'
import { uploadController } from '../controllers'

const router = new Router()

router.post(
  '/avatar',
  auth(),
  uploadStorage.single('avatar'),
  upload,
  uploadController.uploadAvatar
)

router.post(
  '/productImage',
  auth(),
  uploadStorage.single('productImage'),
  upload,
  uploadController.uploadProductImage
)

export default router