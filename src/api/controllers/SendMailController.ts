import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { resolve } from 'path'
import SurveysRepository from '../repositories/SurveysRepository'
import SurveysUsersRepository from '../repositories/SurveysUsersRepository'
import UsersRepository from '../repositories/UsersRepository'
import SendMailService from '../services/SendMailService'

class SendMailController {
  async execute (req: Request, res: Response) {
    const { email, survey_id } = req.body

    // Repository
    const usersRepository = getCustomRepository(UsersRepository)
    const surveysRepository = getCustomRepository(SurveysRepository)
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    // Find user and survey
    const user = await usersRepository.findOne({ email })
    const survey = await surveysRepository.findOne({ id: survey_id })

    if (!user) return res.status(400).json({ error: 'User does not exist' })
    if (!survey) return res.status(400).json({ error: 'Survey does not exist' })

    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: [
        { user_id: user.id },
        { value: null }
      ],
      relations: ['user', 'survey']
    })

    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsEmail.hbs')

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      user_id: user.id,
      link: process.env.URL_MAIL
    }

    if (surveyUserAlreadyExists) {
      // Send email
      await SendMailService.execute(email, survey.title, variables, npsPath)
      return res.json(surveyUserAlreadyExists)
    }

    // Create and save surveyUser
    const surveyUser = await surveysUsersRepository.create({
      user_id: user.id,
      survey_id
    })

    await surveysUsersRepository.save(surveyUser)

    // Send email
    await SendMailService.execute(email, survey.title, variables, npsPath)

    return res.status(201).json(surveyUser)
  }
}

export default new SendMailController()
