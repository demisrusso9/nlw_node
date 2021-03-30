import { Router } from 'express'
import SurveysController from './api/controllers/SurveysController'
import UserController from './api/controllers/UsersController'
import SendMailController from './api/controllers/SendMailController'

const routes = Router()

// Users
routes.get('/users', UserController.show)
routes.post('/users', UserController.create)
routes.delete('/users/:email', UserController.remove)

// Surveys
routes.get('/surveys', SurveysController.show)
routes.post('/surveys', SurveysController.create)

// Send email
routes.post('/send-email', SendMailController.execute)

export default routes
