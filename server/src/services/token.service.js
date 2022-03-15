import jwt from 'jsonwebtoken'
import httpError from 'http-errors'
import config from '../config/config'

/**
 * private function generateToken
 * @param {object} payload
 * @param {string} secretSignature
 * @param {number|string(date)} tokenLife
 * @returns
 */
const generateToken = (payload, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secretSignature,
      { expiresIn: tokenLife },
      (error, token) => {
        if (error) {
          return reject(httpError.Unauthorized(error.message))
        }
        resolve(token)
      }
    )
  })
}
/**
 * This module used for verify jwt token
 * @param {string} token
 * @param {string} secretKey
 * @returns {Promsie<decoded>}
 */
const verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(httpError.Unauthorized(error.message))
      }
      resolve(decoded)
    })
  })
}

/**
 * Generate refresh token
 * @param {object} user
 * @returns {Promise<token>}
 */
const generateRefreshToken = async user => {
  return generateToken(
    { sub: user.id, name: user.name, role: user.role },
    config.jwt.refreshSecret,
    config.jwt.refreshExpiration
  )
}

/**
 * Generate access token
 * @param {object} user
 * @returns {Promise<token>}
 */
const generateAccessToken = async user => {
  return generateToken(
    { sub: user.id, name: user.name, role: user.role },
    config.jwt.accessSecret,
    config.jwt.accessExpiration
  )
}

const getTokens = async user => {
  const [ac_token, rf_token] = await Promise.all([
    generateAccessToken(user),
    generateRefreshToken(user),
  ])
  return {
    ac_token,
    rf_token,
  }
}

/**
 *  Verify activation token
 * @param {string} userId
 * @returns {Promise<sub>}
 */
const verifyRefreshToken = async token => {
  return await verifyToken(token, config.jwt.refreshSecret)
}

export default {
  generateToken,
  verifyToken,
  generateRefreshToken,
  generateAccessToken,
  verifyRefreshToken,
  getTokens,
}
