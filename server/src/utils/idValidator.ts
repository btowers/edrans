import { isValidObjectId } from 'mongoose';

/**
 *
 * @param {any} value
 * @param {any} helper
 * @return {any}
 */
export function ObjectIdValidator(value: any, helper: any) {
  if (isValidObjectId(value)) {
    return true;
  } else {
    return helper.error('id.error');
  }
}
