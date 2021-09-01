import csvParse from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "../../repositories/interfaces/ICategoriesRepository";

interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {

    constructor(@inject("CategoriesRepository") private categoriesRepository: ICategoriesRepository) { }

    async loadCategories(file: Express.Multer.File | undefined): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            console.log(file);

            const categories: IImportCategory[] = [];

            if (!file)
                return categories;

            const stream = fs.createReadStream(file.path);
            const parseFile = csvParse();

            stream.pipe(parseFile);

            parseFile.on("data", async (line) => {
                const category: IImportCategory = { name: line[0], description: line[1] };
                categories.push(category);
            }).on("end", () => {
                fs.promises.unlink(file.path);
                resolve(categories);
            }).on("error", (err) => {
                reject(err);
            });
        });
    }

    async execute(file: Express.Multer.File | undefined): Promise<void> {
        const categories = await this.loadCategories(file);

        if (!categories) {
            return;
        }

        categories.forEach(async (category) => {

            const { name, description } = category;

            const categoryAlreadyExists = await this.categoriesRepository.findByName(
                name
            );

            if (categoryAlreadyExists) {
                return;
            }

            await this.categoriesRepository.create({
                name,
                description,
            });
        })
    }

}

export { ImportCategoryUseCase };
