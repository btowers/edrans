import deleteProductFromCart from './deleteProductFromCart'
import getCart from './getCart'
import buyCart from './buyCart'
import addProductToCart from './addProductToCart'

export default {
  '/cart': {
    ...getCart,
  },
  '/cart/add': {
    ...addProductToCart,
  },
  '/cart/delete': {
    ...deleteProductFromCart,
  },
  '/cart/submit': {
    ...buyCart,
  },
}
