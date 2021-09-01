import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../interfaces/ISpecificationRepository";


class SpecificationsRepository implements ISpecificationRepository {

    private specifications: Specification[];

    private static INSTANCE: SpecificationsRepository;

    constructor() {
        this.specifications = [];
    }

    public static getInstance(): SpecificationsRepository {

        if (!SpecificationsRepository.INSTANCE) {
            SpecificationsRepository.INSTANCE = new SpecificationsRepository();
        }

        return SpecificationsRepository.INSTANCE;
    }

    findByName(name: string): Specification | undefined {
        return this.specifications.find((s) => s.name === name);
    }
    async list(): Promise<Specification[]> {
        return this.specifications;
    }
    create({ name, description }: ICreateSpecificationDTO): void {

        const specification = new Specification(name, description);

        this.specifications.push(specification);
    }


}

export { SpecificationsRepository };