export enum Presistence {
  Memory = 1,
  FileSystem,
  MySQLLocal,
  MySQLSaaS,
  SQLite3,
  MongoDBLocal,
  MongoDBSaaS,
  Firebase,
}

export enum ErrorCode {
  NotFound = 'Not found',
  MongoNotConnected = 'Could not connect to MongoDB',
  Unauthorized = 'Unauthorized User',
  BadRequest = 'Bad Request',
  NotAuthenticated = 'Not authenticated',
  AlreadyAuthenticated = 'User already authenticated',
  NotEnoughStock = 'Not enough stock',
  CartEmpty = 'Cart is empty',
  InvalidPassword = 'Password must be at least 8 characters long and contain at least one number, one uppercase letter and one special character',
  UserValidation = 'User validation error',
  UserNotExists = 'User not exists',
  UserAlreadyExists = 'User already exists',
  ProductValidation = 'Product validation error',
}
