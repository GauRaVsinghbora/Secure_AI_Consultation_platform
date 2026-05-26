import mongoose from "mongoose";

const searchSchema = new mongoose.Schema({
    query: {
        type: String,
        required: true,
        index: true
    },
    count: {
        type: Number,
        default: 1
    }
}, { timestamps: true });



export const Search = mongoose.model("Search", searchSchema);