import createError from 'http-errors'
import pick from '../utils/pick'
import catchAsync from '../utils/catchAsync'
import { productService, uploadService } from '../services'

/**
 * Create a product
 * @POST api/products/
 * @access private
 */
const createProduct = catchAsync(async (req, res) => {
  // Upload image to cloudinary
  const url = await uploadService.uploadProductImage(req.file.path)

  // create product item
  const productItem = {
    ...req.body,
    image: url,
    user: req.user.id,
  }

  // Save new product to database
  const product = await productService.createProduct(productItem)

  // create success
  res.status(201).json(product)
})

/**
 * Get all products
 * @GET api/products
 * @access public
 */
const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['category', 'title'])

  const options = pick(req.query, ['select', 'sortBy', 'limit', 'page'])
  const result = await productService.queryProducts(filter, options)
  res.send(result)
})

/**
 * Get a product by product id
 * @GET api/products/:productId
 * @access public
 */
const getProduct = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.productId)
  if (!product) {
    throw createError.NotFound()
  }
  res.send(product)
})

/**
 * Update a product by productId
 * @PATCH api/products/:productId
 * @access private
 */
const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProductById(
    req.params.productId,
    req.body
  )
  res.send(product)
})

/**
 * Delete product by productId
 * @DELETE api/products/:productId
 * @access private
 */
const deleteProduct = catchAsync(async (req, res) => {
  const product = await productService.deleteProductById(req.params.productId)
  res.send(product)
})

export default {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
}
