import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);
//The Note model is then created by calling the mongoose.model function with the name of the collection ("Note") and the schema (noteSchema).
// This model can then be used to create, read, update, and delete documents in the Note collection.
export default Note;
