import { Specification } from "../../entities/Specification";
import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";


class ListSpecificationsUseCase {

    constructor(private specificationsRepository: SpecificationsRepository) { }

    execute(): Specification[] {
        return this.specificationsRepository.list();
    }

}

export { ListSpecificationsUseCase };