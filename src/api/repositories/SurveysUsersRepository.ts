import SurveysUsers from '../models/SurveysUsers'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(SurveysUsers)
export default class SurveysUsersRepository extends Repository<SurveysUsers> {}
