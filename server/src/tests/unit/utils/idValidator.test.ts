import { ObjectIdValidator } from '../../../utils/idValidator'

const helper = {
  error: jest.fn((error: string) => {
    return `invalid ObjectId`
  }),
}

describe('MongoDB Object ID validator', () => {
  it('should return true if id is valid', () => {
    const id = '61f7466235eb57ce9bab0ab1'
    expect(ObjectIdValidator(id, helper)).toBe(true)
  })

  it('should return false if id is invalid', () => {
    const id = '12345678'
    expect(ObjectIdValidator(id, helper)).toBe(`invalid ObjectId`)
  })
})
