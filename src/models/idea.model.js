const mongoose = require("mongoose");
const { Schema } = mongoose;

const IdeaSchema = new Schema({
  idea: { type: String, required: true },
  description: { type: String },
  upvotes: [{ type: Boolean }],
  downvotes: [{ type: Boolean }],
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
    //para que cada vez que busque una idea traiga consigo la propiedades de su autor
    autopopulate: true
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comment",
      required: true,
      autopopulate: true
    }
  ]
});
//esto es para el autopopulate de comment
IdeaSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("idea", IdeaSchema);
