import { Request } from 'express'
import { NewUserI } from '../interfaces/userInterface'
import config from '../config'
import passport from 'passport'
import { Strategy as LocalStrategy, IStrategyOptionsWithRequest } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { cartS } from '../api/cartService'
import { userS } from '../api/userService'
import { UserJoiSchema, UserCredentialsJoiSchema } from '../interfaces/userInterface'

const localStrategyOptions: IStrategyOptionsWithRequest = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}

const jwtStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET_KEY,
}

const FacebookStrategyOptions = {
  clientID: config.FACEBOOK_APP_ID,
  clientSecret: config.FACEBOOK_APP_SECRET,
  callbackURL: 'https://edranschallenge.herokuapp.com/api/user/facebook/redirect',
  profileFields: ['displayName', 'email'],
}

const jwtFunc = async (jwtPayload: any, done: any): Promise<any> => {
  try {
    const user = await userS.getUserById(jwtPayload.sub)
    if (user) return done(null, user)
    else return done(null, false)
  } catch (error) {
    return done(error, false)
  }
}

const loginFunc = async (
  _req: Request,
  username: string,
  password: string,
  done: any
): Promise<any> => {
  try {
    await UserCredentialsJoiSchema.validateAsync({ email: username, password: password })
    const user = await userS.getUser(username)
    if (!user || !(await userS.isValidPassword(user, password))) {
      return done(null, false, 'Invalid username or password.')
    } else return done(null, user)
  } catch (error) {
    return done(error, false)
  }
}

const signUpFunc = async (
  req: Request,
  _username: string,
  _password: string,
  done: any
): Promise<any> => {
  try {
    const newUser: NewUserI = req.body
    await UserJoiSchema.validateAsync(newUser)
    if (newUser.password !== newUser.confirmPassword) {
      return done(null, false, 'Passwords do not match.')
    }
    const user = await userS.getUser(newUser.email)
    if (user) return done(null, false, `User ${user.email} already exists`)
    const savedUser = await userS.createUser(newUser)
    await cartS.createCart(savedUser)
    return done(null, savedUser)
  } catch (error) {
    return done(error, false)
  }
}

const facebookLoginFunc = async (
  _accessToken: string,
  _refreshToken: string,
  profile: any,
  cb: any
): Promise<any> => {
  try {
    console.log(profile.emails[0].value)
    const user = await userS.getUser(profile.emails[0].value)
    if (!user) {
      const newUser: NewUserI = {
        nombre: profile.displayName,
        direccion: {
          calle: 'facebook',
          altura: '234',
          cp: '234',
          piso: '24',
          departamento: '1234',
        },
        identificador: profile.id,
        email: profile.emails[0].value,
        password: 'Brianbrako2!',
        confirmPassword: 'Brianbrako2!',
        admin: false,
      }
      const savedUser = await userS.createUser(newUser)
      await cartS.createCart(savedUser)
    }
    return cb(null, user)
  } catch {
    return cb(null, false)
  }
}

passport.use('jwt', new JwtStrategy(jwtStrategyOptions, jwtFunc))
passport.use('login', new LocalStrategy(localStrategyOptions, loginFunc))
passport.use('signup', new LocalStrategy(localStrategyOptions, signUpFunc))
passport.use('facebook', new FacebookStrategy(FacebookStrategyOptions, facebookLoginFunc))

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id: string, done) {
  userS.getUserById(id).then((user: any) => {
    done(null, user)
  })
})

export default passport
