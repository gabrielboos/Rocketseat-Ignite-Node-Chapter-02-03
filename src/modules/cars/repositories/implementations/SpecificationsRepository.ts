import { getRepository, Repository } from "typeorm";
import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../interfaces/ISpecificationRepository";


class SpecificationsRepository implements ISpecificationRepository {

    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async findByName(name: string): Promise<Specification | undefined> {
        return await this.repository.findOne({ name });
    }

    async list(): Promise<Specification[]> {
        return await this.repository.find();
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification: Specification = this.repository.create(
            {
                name,
                description
            }
        )
        await this.repository.save(specification);
    }
}

export { SpecificationsRepository };