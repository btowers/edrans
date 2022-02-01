import getUser from './getUser'
import updateUser from './updateUser'
import signup from './signup'
import login from './login'

export default {
  '/user': {
    ...getUser,
  },
  '/user/{id}': {
    ...updateUser,
  },
  '/user/signup': {
    ...signup,
  },
  '/user/login': {
    ...login,
  },
}
