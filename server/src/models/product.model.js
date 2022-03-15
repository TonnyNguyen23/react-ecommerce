import mongoose from 'mongoose'
import toJSON from './plugins/toJson'
import paginate from './plugins/paginate'

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      index: true,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      rate: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
productSchema.plugin(toJSON)
productSchema.plugin(paginate)

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema)

export default Product
