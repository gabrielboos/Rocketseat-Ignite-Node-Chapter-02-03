import { inject, injectable } from "tsyringe";
import { Specification } from "../../entities/Specification";
import { ISpecificationRepository } from "../../repositories/interfaces/ISpecificationRepository";

@injectable()
class ListSpecificationsUseCase {

    constructor(@inject("SpecificationsRepository") private specificationsRepository: ISpecificationRepository) { }

    async execute(): Promise<Specification[]> {
        return await this.specificationsRepository.list();
    }

}

export { ListSpecificationsUseCase };
