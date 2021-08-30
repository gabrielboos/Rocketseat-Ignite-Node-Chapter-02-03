import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import createCategory from "../createCategory";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const categoriesRepository = createCategory().categoriesRepository;
const listCategoryUseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoryController = new ListCategoriesController(listCategoryUseCase);

export { listCategoryController };