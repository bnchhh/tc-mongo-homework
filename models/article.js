const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      minlength: 5,
      maxlength: 400,
      required: true,
      index: true,
    },
    subtitle: { type: String, minlength: 5 },
    description: { type: String, minlength: 5, maxlength: 5000, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    category: { type: String, enum: ["sport", "games", "history"], required: true },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Article", ProductSchema);
