import { ICategory } from "@typesDef/category";
import { Document, model, Schema } from "mongoose";

export type CategoryDocument = ICategory & Document;

const schema = new Schema<CategoryDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// schema.pre("save", function (next) {
//   console.log("pre save", this.name);
//   this.slug = this.name.toLowerCase().replace(/ /g, "-");
//   next();
// });

export default model<CategoryDocument>("category", schema);
