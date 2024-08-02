import mongoose from "mongoose"

const chatSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    history: [
        {
            role: {
                typr: String,
                enum: ["user", "model"],
                required: true
            },
            parts: [
                {
                    text: {
                        type: String,
                        required: true
                    }
                }
            ],
            img: {
                type: String,
                required: true
            }
        }
    ]
}, { timestamps: true })

export default mongoose.model.chat || mongoose.model("chat", chatSchema);