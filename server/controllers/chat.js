
import Chat from "../models/chat.js";
import { User } from "../models/user.js";
import { tryCatch } from "../utils/tryCatch.js";


export const createChat = tryCatch(async (req, res) => {
    const userId = req.user.id;

    if (!userId) {
        res.status(400).json({
            message: "Please login"
        })
    }
    const { text } = req.body;

    const user = await User.findById(userId);

    if (!user) {
        res.status(400).json({
            message: "User not found"
        })
    }

    // CREATE A NEW CHAT
    const newChat = new Chat({
        user: userId,
        history: [{ role: "user", parts: [{ text }] }],
    });

    const savedChat = await newChat.save();


    // CHECK IF THE USERCHATS EXISTS
    if (!user.chats.includes(savedChat._id.toString())) {
        user.chats.push(
            {
                chat: savedChat._id,
                title: text.substring(0, 40),
            },
        )

        await user.save();
    } else {
        const index = user.chats.indexOf(savedChat._id);

        user.chats[index] = {
            chat: savedChat._id,
            title: text.substring(0, 40),
        }

        await user.save();
    }

    return res.status(201).send(savedChat._id);
})



export const getChatList = tryCatch(async (req, res) => {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
        res.status(400).json({
            message: "User not found"
        })
    }

    return res.status(200).send(user.chats);

})


export const getChats = tryCatch(async (req, res) => {
    const userId = req.user.id;

    if (!userId) {
        res.status(400).json({
            message: "Login Please"
        })
    }


    const chat = await Chat.findById(req.params.id);


    res.status(200).json(chat);

})



export const addChats = tryCatch(async (req, res) => {
    const userId = req.user.id;

    if (!userId) {
        res.status(400).json({
            message: "Login Please"
        })
    }

    const { question, answer, img } = req.body;

    const newItems = [
        ...(question
            ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
            : []),
        ...(answer
            ? [{ role: "model", parts: [{ text: answer }] }] : [])
    ];

    const updatedChat = await Chat.findOneAndUpdate(
        { _id: req.params.id, user: userId },
        {
            $push: {
                history: {
                    $each: newItems,
                },
            },
        },
        { new: true }
    )

    return res.status(200).send(updatedChat);

})