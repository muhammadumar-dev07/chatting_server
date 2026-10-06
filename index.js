import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dns from "node:dns/promises";
import { connectDB } from "./Utils/DB.js";
import http from "http";
import {Server} from "socket.io";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config();
const app = express();
app.use(express.json());


const server = http.createServer(app);

const io = new Server(server, {
cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}
});

io.on("connection", (socket) => {
    console.log("User connected", socket.id);
    socket.on("join", (roomId)=>{
        socket.join(roomId);
    })
});

socket.on("leave", (roomId)=>{
    socket.leave(roomId);
});

// Broadcast to Room:
socket.on("send",(message)=>{
    console.log(message)
    socket.to(message.room).emit("message",message);
});

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
