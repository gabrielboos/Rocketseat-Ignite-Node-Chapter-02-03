import { Response, Request } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { container } from "tsyringe"

class CreateCategoryController {

    async handle(request: Request, response: Response) {
        const { name, description } = request.body;
        const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
        try {
            await createCategoryUseCase.execute({ name, description });
            return response.status(201).send();
        } catch (err) {
            return response.status(400).send();
        }
    }

}

export { CreateCategoryController };