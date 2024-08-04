import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        img: {
            type: String
        },
        googleSignIn: {
            type: Boolean,
            default: false
        },
        chats: [
            {
                chat: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Chat",
                },
                title: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now()
                },
            },
        ],
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);