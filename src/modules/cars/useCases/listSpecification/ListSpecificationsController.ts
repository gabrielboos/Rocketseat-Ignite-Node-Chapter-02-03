import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";
import { Response, Request } from "express";

class ListSpecificationsController {

    constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) { }

    handle(request: Request, response: Response) {
        const all = this.listSpecificationsUseCase.execute();
        return response.status(201).json(all);
    }

}

export { ListSpecificationsController };