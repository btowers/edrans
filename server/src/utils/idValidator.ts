import { isValidObjectId } from 'mongoose'

export function ObjectIdValidator(value: any, helper: any) {
  if (isValidObjectId(value)) {
    return true
  } else {
    return helper.error('id.error')
  }
}
