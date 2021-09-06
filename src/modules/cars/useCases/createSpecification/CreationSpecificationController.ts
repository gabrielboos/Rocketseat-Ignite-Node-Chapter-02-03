import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";


class CreateSpecificationController {

    async handle(request: Request, response: Response) {
        const { name, description } = request.body;
        const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);

        try {
            await createSpecificationUseCase.execute({ name, description });
            return response.status(201).send();
        } catch (err) {
            return response.status(400).send();
        }
    }

}

export { CreateSpecificationController };
