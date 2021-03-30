import nodemailer, { Transporter } from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'

class SendMailService {
  private client: Transporter

  constructor () {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      })

      this.client = transporter
    })
  }

  async execute (to: string, subject: string, variables: object, path: string) {
    // Read the file in src/api/views/emails/npsEmail.hbs
    const templateFileContent = fs.readFileSync(path).toString('utf-8')

    const mailTemplateParse = handlebars.compile(templateFileContent)

    // Inside of npsEmail.hbs has variables, and we just fill them with the parameters
    const html = mailTemplateParse(variables)

    const message = await this.client.sendMail({
      from: 'NPS <noreplay@nps.com.br>',
      to,
      subject,
      html: html
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}

export default new SendMailService()
