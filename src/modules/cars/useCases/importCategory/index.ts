import createCategory from "../createCategory";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const importCategoryUseCase = new ImportCategoryUseCase(createCategory().createCategoryUseCase);
const importCategoryController = new ImportCategoryController(importCategoryUseCase);

export { importCategoryController };