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

    content: String,

    specialist: {
        type: String
    },

    doctors: [
        {
            name: String,
            address: String,
            rating: Number,
            location: {
                lat: Number,
                lng: Number
            }
        }
    ]

}, { timestamps: true });

export const Message =
    mongoose.model("Message", messageSchema);