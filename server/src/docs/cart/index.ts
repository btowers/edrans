import deleteProductCart from './deleteProductCart'
import getProductCart from './getProductCart'
import buyProductCart from './buyProductCart'
import updateProductCart from './updateProductCart'

export default {
  '/cart/': {
    ...getProductCart,
  },
  '/cart/add': {
    ...updateProductCart,
  },
  '/cart/delete': {
    ...deleteProductCart,
  },
  '/cart/submit': {
    ...buyProductCart,
  },
}
