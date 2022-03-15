import * as yup from 'yup'
import config from './config.validation'

const createOrder = {
  orderItems: yup
    .array()
    .of(
      yup.object().shape({
        title: yup.string(),
        qty: yup.number(),
        price: yup.number(),
        product: yup.string().matches(config.regexObjectId).required(),
      })
    )
    .min(1)
    .required(),
  shipping: yup.object().shape({
    address: yup.string().required(),
    phone: yup.string().required(),
    name: yup.string().required(),
  }),
  paymentMethod: yup.string().required().default('Thanh Toán Khi Nhận Hàng.'),

  taxPrice: yup.number().required().default(0.0),
  shippingPrice: yup.number().required().default(0.0),
  totalPrice: yup.number().required().default(0.0),
  isPaid: yup.boolean().required().default(false),
  isDelivered: yup.boolean().required().default(false),
  itemsPrice: yup.number(),
}

const getOrders = {
  page: yup.number().integer(),
  limit: yup.number().integer(),
  sortBy: yup.string(),
  select: yup.string(),
}

const getOrder = {
  orderId: yup.string().matches(config.regexObjectId).required(),
}

const updateOrder = {
  orderId: yup.string().matches(config.regexObjectId).required(),
  paymentResult: yup.object().shape({
    id: yup.string(),
    status: yup.string(),
    update_time: yup.string(),
    email_address: yup.string(),
  }),
}

const deleteOrder = {
  orderId: yup.string().matches(config.regexObjectId).required(),
}

export default {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
}
