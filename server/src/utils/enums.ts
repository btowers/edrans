/* eslint-disable no-unused-vars */
enum Presistence {
  Memory = 1,
  FileSystem,
  MySQLLocal,
  MySQLSaaS,
  SQLite3,
  MongoDBLocal,
  MongoDBSaaS,
  Firebase,
}

enum ErrorCode {
  CartNotFound = 'Cart not found',
  ProductsNotFound = 'Product not found',
  ImageNotFound = 'Image not found',
  UserNotFound = 'User not found',
  OrderNotFound = 'Order Not Found',
  MongoNotConnected = 'Could not connect to MongoDB',
  Unauthorized = 'Unauthorized User',
  BadRequest = 'Bad Request',
  NotAuthenticated = 'Not authenticated',
  AlreadyAuthenticated = 'User already authenticated',
  NotEnoughStock = 'Not enough stock',
  CartEmpty = 'Cart is empty',
  InvalidPassword = 'Password must be at least 8 characters long and contain at least one number, one uppercase letter and one special character',
}

export { Presistence, ErrorCode };
