import getOrders from './getOrders'
import getOrder from './getOrder'
import completeOrder from './completeOrder'

export default {
  '/orders': {
    ...getOrders,
  },
  '/orders/{id}': {
    ...getOrder,
  },
  '/orders/complete': {
    ...completeOrder,
  },
}
