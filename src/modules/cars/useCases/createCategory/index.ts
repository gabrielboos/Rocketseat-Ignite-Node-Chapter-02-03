import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

interface CreateCategoryExport {
    categoriesRepository : CategoriesRepository,
    createCategoryUseCase: CreateCategoryUseCase,
    createCategoryController: CreateCategoryController
}

export default (): CreateCategoryExport => {
    const categoriesRepository = new CategoriesRepository();
    const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
    const createCategoryController = new CreateCategoryController(createCategoryUseCase);

    return { categoriesRepository, createCategoryUseCase, createCategoryController };
}
