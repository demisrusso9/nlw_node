import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import UsersRepository from '../repositories/UsersRepository'

class UserController {
  async show (req: Request, res: Response) {
    const repository = getCustomRepository(UsersRepository)
    const allusers = await repository.find()
    return res.json(allusers)
  }

  async create (req: Request, res: Response) {
    const repository = getCustomRepository(UsersRepository)

    const { name, email } = req.body

    const emailExists = await repository.findOne({ email })

    if (emailExists) { return res.status(400).json({ error: 'This E-mail already exists' }) }

    const user = repository.create({ name, email })
    await repository.save(user)

    return res.status(201).json({
      response: {
        message: 'User created successfully',
        user: user.email
      }
    })
  }

  async remove (req: Request, res: Response) {
    const repository = getCustomRepository(UsersRepository)
    const { email } = req.params

    const userExists = await repository.findOne({ email })

    if (!userExists) { return res.status(400).json({ error: 'User with this e-mail not found' }) }

    await repository.remove(userExists)

    return res.json({ message: 'User removed successfully' })
  }
}

export default new UserController()
