const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
    body: String,
});

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: String,
    url: { type: String, required: true },
    likes: Number,
    comments: [commentsSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

commentsSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("Blog", blogSchema);
