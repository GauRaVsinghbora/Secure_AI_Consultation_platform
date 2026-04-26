import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatSession"
    },

    role: {
        type: String,
        enum: ["user", "assistant"]
    },

    content: {
        type: String
    }

}, { timestamps: true });

export const Message =
    mongoose.model("Message", messageSchema);