import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SurveysRepository from "../repositories/SurveysRepository";

class SurveysController {
  async create(req: Request, res: Response) {
    const repository = getCustomRepository(SurveysRepository);

    const { title, description } = req.body;

    const survey = repository.create({ title, description });

    await repository.save(survey);

    return res.status(201).json(survey);
  }

  async show(req: Request, res: Response) {
    const repository = getCustomRepository(SurveysRepository);

    const all = await repository.find();
    return res.json(all);
  }
}

export default new SurveysController();
