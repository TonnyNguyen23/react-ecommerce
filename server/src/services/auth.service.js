import createError from 'http-errors'
import { tokenService } from '.'
import { transErrors } from '../_lang/en'
import userService from './user.service'

/**
 * Login user with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email)
  if (!user || !(await user.isPasswordMatch(password)))
    throw new createError.Unauthorized(transErrors.login_failed)

  // refresh token
  const tokens = await tokenService.getTokens(user)
  return tokens
}

export default { loginWithEmailAndPassword }
