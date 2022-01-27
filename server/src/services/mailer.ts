import nodemailer from 'nodemailer'
import htmlToText from 'nodemailer-html-to-text'
import config from '../config'
import { CartI } from '../interfaces/cartInterface'
import { UserI } from '../interfaces/userInterface'
import { loggerS } from './logger'

class Mailer {
  private recipient: string = config.mailer.adminMail
  private sender: string = config.mailer.from

  async send(user: UserI, cart: CartI) {
    loggerS.info(`Sending email to: ${user.email}`)
    const subject = 'Confirmación de pedido'
    const body = `<h2>Pedido#: ${cart.id}</h2>
     <hr/> <h2>Direccion de entrega:</h2><p>${cart.direccionEntrega.calle} ${
      cart.direccionEntrega.altura
    }</p> <p>${cart.direccionEntrega.cp}</p>
    <hr/> <h2>Productos:</h2><p>${cart.products
      .map((item: any) => `${item.qty}x ${item.product.nombre} - $${item.product.precio}`)
      .join('<br>')}</p>`
    const mailOptions = {
      from: this.sender,
      to: user.email,
      subject: subject,
      html: body,
    }

    let transporter
    if (config.mailer.transport == 'smtp') {
      transporter = nodemailer.createTransport(config.mailer.smtp)
    } else if (config.mailer.transport == 'sendgrid') {
      const sgTransport = require('nodemailer-sendgrid-transport')
      transporter = nodemailer.createTransport(
        sgTransport({
          auth: {
            api_key: config.mailer.sendgrid.apiKey,
          },
        })
      )
    }

    if (transporter) {
      transporter.use('compile', htmlToText.htmlToText())
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          loggerS.warn('Unable to send email: ', err)
          return Error('Unable to send email')
        } else {
          loggerS.info('Email notification sent.', info.response)
          return info
        }
      })
    } else
      return new Error('Unable to send email! Invalid mailer transport: ' + config.mailer.transport)
  }
}
export const mailerS = new Mailer()
