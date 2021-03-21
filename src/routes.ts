import { Router } from 'express'
import SurveysController from './api/controllers/SurveysController'
import UserController from './api/controllers/UsersController'

const routes = Router()

// Users
routes.post('/users', UserController.create)
routes.delete('/users/:email', UserController.remove)

// Surveys
routes.get('/surveys', SurveysController.show)
routes.post('/surveys', SurveysController.create)

export default routes
