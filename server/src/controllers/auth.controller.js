import createHttpError from 'http-errors'
import catchAsync from '../utils/catchAsync'
import { tranSuccess } from '../_lang/en'
import config from '../config/config'
import { userService, authService, tokenService } from '../services'

/**
 * Register user
 * @POST api/auth/register
 * @access public
 */
const register = catchAsync(async (req, res, next) => {
  const user = await userService.createUser(req.body)
  const { ac_token, rf_token } = await tokenService.getTokens(user)

  // store refresh token
  res.cookie('_apprftoken', rf_token, config.cookie)

  res.send({ ac_token })
})

/**
 * Login user
 * @POST api/auth/login
 * @access public
 */
const login = catchAsync(async (req, res) => {
  // Get cred
  const { email, password } = req.body

  // Login
  const { ac_token, rf_token } = await authService.loginWithEmailAndPassword(
    email,
    password
  )

  // store refresh token
  res.cookie('_apprftoken', rf_token, config.cookie)

  res.send({ ac_token })
})

/**
 * Get access token
 * @GET api/auth/access-token
 * @access private
 */
const refreshToken = catchAsync(async (req, res, next) => {
  //  rf_token
  const refresh_token = req.signedCookies['_apprftoken']
  if (!refresh_token) return next(createHttpError.BadRequest('Please sign in.'))

  // verify token
  const {
    sub: userId,
    name,
    role,
  } = await tokenService.verifyRefreshToken(refresh_token)

  // create access token
  const { ac_token, rf_token } = await tokenService.getTokens({
    id: userId,
    name,
    role,
  })

  // store refresh token
  res.cookie('_apprftoken', rf_token, config.cookie)

  // access success
  return res.send({ ac_token })
})

/**
 * Logout user
 * @GET api/auth/sign-out
 * @access private
 */
const logout = catchAsync(async (req, res) => {
  // clear cookie
  res.clearCookie('_apprftoken')
  // success
  res.send({ message: tranSuccess.logout_success })
})

export default {
  register,
  login,
  refreshToken,
  logout,
}
