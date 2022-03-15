import { Router } from 'express'
import { authController } from '../controllers'
import auth from '../middlewares/auth'
import validate from '../middlewares/validate'
import { authValidation, userValidation } from '../validations'

const router = new Router()

router.post(
  '/register',
  validate(userValidation.createUser),
  authController.register
)
router.post('/login', validate(authValidation.login), authController.login)
router.get('/refresh', authController.refreshToken)
router.post('/logout', auth(), authController.logout)

export default router
