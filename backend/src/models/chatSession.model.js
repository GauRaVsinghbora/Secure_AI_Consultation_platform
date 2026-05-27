import mongoose from "mongoose";

const chatSessionSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        default: "New Chat"
    }

}, { timestamps: true });

export const ChatSession =
    mongoose.model("ChatSession", chatSessionSchema);