import getUser from './getUser'
import signup from './signup'
import login from './login'

export default {
  '/user/{id}': {
    ...getUser,
  },
  '/user/signup': {
    ...signup,
  },
  '/user/login': {
    ...login,
  },
}
