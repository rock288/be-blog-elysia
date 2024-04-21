import { createElysia } from "@utils/createElysia";

import { CategoryController } from "./category/category.controller";
import { PokemonController } from "./pokemon/pokemon.controller";

export const apiRoutes = createElysia();

apiRoutes.use(CategoryController);
apiRoutes.use(PokemonController);
