import basicInfo from './basicInfo'
import cart from './cart'
import components from './components'
import orders from './orders'
import products from './products'
import servers from './servers'
import tags from './tags'
import users from './users'

export default {
  ...basicInfo,
  ...servers,
  ...tags,
  ...components,
  paths: {
    ...products,
    ...cart,
    ...users,
    ...orders,
  },
}
