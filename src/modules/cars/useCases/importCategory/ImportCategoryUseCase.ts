import fs from "fs";
import csvParse from "csv-parse"
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {

    constructor(private createCategoryUseCase: CreateCategoryUseCase) {

    }

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

        categories.forEach((category) => {

            if(this.createCategoryUseCase.categoryExists(category.name)) {
                return;
            }

            this.createCategoryUseCase.execute(category);
        })
    }

}

export { ImportCategoryUseCase };