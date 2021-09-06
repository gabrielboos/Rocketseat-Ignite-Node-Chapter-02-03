import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";
import { Response, Request } from "express";
import { container } from "tsyringe";

class ListSpecificationsController {

    async handle(request: Request, response: Response) {
        const listSpecificationsUseCase = container.resolve(ListSpecificationsUseCase);
        const all = await listSpecificationsUseCase.execute();
        return response.status(201).json(all);
    }

}

export { ListSpecificationsController };