import deleteCartItem from './deleteCartItem'
import getCartItem from './getCartItem'
import buyCartItem from './buyCartItem'
import updateCartItem from './updateCartItem'

export default {
  '/cart/': {
    ...getCartItem,
  },
  '/cart/add': {
    ...updateCartItem,
  },
  '/cart/delete': {
    ...deleteCartItem,
  },
  '/cart/submit': {
    ...buyCartItem,
  },
}
