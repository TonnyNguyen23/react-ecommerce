import * as yup from 'yup'
import { transValidations } from '../_lang/en'
import config from './config.validation'

const createUser = {
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup
    .string()
    .matches(config.regexPassword, transValidations.password_incorrect)
    .required(),
}

const getUsers = {
  name: yup.string(),
  email: yup.string().email(),
  role: yup.string(),
  page: yup.number().integer(),
  limit: yup.number().integer(),
  sortBy: yup.string(),
  select: yup.string(),
}

const getUser = {
  userId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const updateUser = {
  userId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
  name: yup.string(),
  phone: yup.string(),
  email: yup.string().email(),
  birthday: yup.date(),
  role: yup.mixed().oneOf(['admin', 'user']).default('user'),
  checkbox_selection: yup
    .string()
    .when(['name', 'email', 'birthday', 'role', 'phone'], {
      is: (name, birthday, role, email, phone) =>
        !name && !email && !birthday && !role && !phone,
      then: yup.string().required(),
    }),
}

const deleteUser = {
  userId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const updateProfile = {
  name: yup.string(),
  phone: yup.string(),
  email: yup.string().email(),
  birthday: yup.date(),
  role: yup.mixed().oneOf(['admin', 'user']).default('user'),
  checkbox_selection: yup
    .string()
    .when(['name', 'email', 'birthday', 'role', 'phone'], {
      is: (name, birthday, role, email, phone) =>
        !name && !email && !birthday && !role && !phone,
      then: yup.string().required(),
    }),
}

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateProfile,
}
