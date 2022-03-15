import * as yup from 'yup'
import config from './config.validation'

const createProduct = {
  title: yup.string().required(),
  category: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required().default(0),
  countInStock: yup.number().required().default(0),
}

const getProducts = {
  title: yup.string(),
  category: yup.string(),
  price: yup.number(),

  page: yup.number().integer(),
  limit: yup.number().integer(),
  sortBy: yup.string(),
  select: yup.string(),
}

const getProduct = {
  productId: yup.string().matches(config.regexObjectId).required(),
}

const updateProduct = {
  productId: yup.string().matches(config.regexObjectId).required(),
  title: yup.string(),
  category: yup.string(),
  description: yup.string(),
  price: yup.number(),
  countInStock: yup.number(),
  rating: yup.mixed(),
}

const deleteProduct = {
  productId: yup.string().matches(config.regexObjectId).required(),
}

export default {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
}
