/* eslint-disable no-unused-vars */
import { UserI } from "../../src/interfaces/userInterface";

declare global {
  namespace Express {
    interface User extends UserI {}
  }
}
