import { ICategoriesRepository } from "../../repositories/interfaces/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesRepository) { }

    async categoryExists(name: string): Promise<boolean> {
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);
        return categoryAlreadyExists != null;
    }

    async execute({ name, description }: IRequest) {
        console.log("test");
        if (this.categoryExists(name)) {
            throw new Error("Category already exists");
        }
        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
