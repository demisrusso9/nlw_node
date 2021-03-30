import { EntityRepository, Repository } from 'typeorm'
import Surveys from '../models/Surveys'

@EntityRepository(Surveys)
export default class SurveysRepository extends Repository<Surveys> {}
