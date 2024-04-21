import { CategoryDTO } from "@typesDef/category";
import { Model } from "mongoose";

import Category, { CategoryDocument } from "./category.schema";

export class CategoryServices {
  private readonly _categorySchema: Model<CategoryDocument>;

  constructor() {
    this._categorySchema = Category;
  }

  async get(id: string): Promise<CategoryDocument> {
    const category = await this._categorySchema.findById(id);
    if (!category) throw new Error(`Category not found with id ${id}`);

    return category;
  }

  async getAll(): Promise<CategoryDocument[]> {
    const categorys = await this._categorySchema.find();

    return categorys;
  }

  async create(data: CategoryDTO): Promise<CategoryDocument> {
    console.log("@POST: /category", data);

    const newCategory = new this._categorySchema(data);
    newCategory.name = data.name;
    newCategory.description = data.description;

    const returnedCategory = await newCategory.save();

    return returnedCategory;
  }

  async update(
    id: string,
    data: Partial<CategoryDTO>,
  ): Promise<CategoryDocument> {
    console.log("@PUT: /category");

    const updateCategory = await this._categorySchema.findById(id);

    if (!updateCategory) throw new Error(`Category not found with id ${id}`);

    console.log("updateCategory", updateCategory);

    data.name ? (updateCategory.name = data.name) : null;
    data.description ? (updateCategory.description = data.description) : null;

    const returnedCategory = await updateCategory.save();

    return returnedCategory;
  }

  async delete(id: string): Promise<CategoryDocument> {
    console.log("@DELETE: /category");

    const deletedCategory = await this._categorySchema.findByIdAndDelete(id);

    if (!deletedCategory) throw new Error(`Category not found with id ${id}`);

    return deletedCategory;
  }
}

export type CategoryDocumentServices = CategoryServices;
