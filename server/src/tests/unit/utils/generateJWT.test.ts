import { generateJWT } from '../../../../src/utils/generateJWT'
import { UserJWTPayloadI } from '../../../interfaces/userInterface'

describe('JWT generator', () => {
  it('should return a token', () => {
    const user: UserJWTPayloadI = {
      id: '61f7466235eb57ce9bab0ab1',
      admin: true,
    }
    const token = generateJWT(user)
    expect(token).toBeTruthy()
  })
})
