import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import ImageKit from "imagekit";
import { addChats, createChat, getChatList, getChats } from "./controllers/chat.js";
import { google, login, logout, myProfile, register, sendotp } from "./controllers/user.js";
import { connect } from "./utils/dbConnect.js";
import { verifyToken } from "./middlewares/authMiddleware.js";
import cookieParser from "cookie-parser"

const port = process.env.PORT || 3000;
const app = express();

dotenv.config();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ['POST', 'GET', 'PUT', 'DELETE'],
        credentials: true,
        optionSuccessStatus: 200
    })
);
app.use(express.json());
app.use(cookieParser());

const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});


//routes
app.get("/api/upload", (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
});


app.post("/api/sendotp", sendotp);
app.post("/api/register", register);
app.post("/api/login", login);
app.post("/api/google", google);
app.get("/api/logout", logout);
app.get("/api/chats/:id", verifyToken, getChats);
app.put("/api/chats/:id", verifyToken, addChats);
app.post("/api/chats", verifyToken, createChat);
app.get("/api/all-chats", verifyToken, getChatList);
app.get("/api/user", verifyToken, myProfile);


app.listen(port, () => {
    connect();
    console.log("Server running on 3000");
});