import Elysia, { t } from "elysia";
import { isAuthenticated } from "@auth/guards/authenticated.guard";
import { APIResponse } from "@typesDef/api";
import { ICategory } from "@typesDef/category";

import {
  CategoryDocumentServices,
  CategoryServices,
} from "./category.services";

const _categoryServices: CategoryDocumentServices = new CategoryServices();

export const CategoryController = new Elysia({ prefix: "/category" }).guard(
  {
    beforeHandle: isAuthenticated,
  },
  (app) =>
    app
      .get("/", async (): Promise<APIResponse<ICategory[]>> => {
        console.log("@GET /pokemon");
        const categories = await _categoryServices.getAll();

        return {
          success: true,
          data: categories,
        };
      })

      .post(
        "/",
        async ({ body }): Promise<APIResponse<ICategory>> => {
          const { name, description } = body;

          const newCategory = await _categoryServices.create({
            name,
            description,
          });

          return {
            success: true,
            data: newCategory,
          };
        },
        {
          body: t.Object({
            name: t.String(),
            type: t.String(),
            description: t.String(),
            level: t.Number(),
          }),
        },
      )

      .put(
        "/:id",
        async ({ params: { id }, body }): Promise<APIResponse<ICategory>> => {
          if (!id) throw new Error("Id is required");

          const updatedCategory = await _categoryServices.update(id, body);

          return {
            success: true,
            data: updatedCategory,
          };
        },
        {
          body: t.Object({
            name: t.Optional(t.String()),
            type: t.Optional(t.String()),
            description: t.Optional(t.String()),
            level: t.Optional(t.Number()),
          }),
        },
      )

      .delete(
        "/:id",
        async ({ params: { id } }): Promise<APIResponse<ICategory>> => {
          const deletedCategory = await _categoryServices.delete(id);

          return {
            success: true,
            data: deletedCategory,
          };
        },
      ),
);
