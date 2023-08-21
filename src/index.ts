import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import authRouter from "./authentication/authRouter.js";


//setup
dotenv.config();

const server = express();


const corsOptions = {
    origin: process.env.ALLOWED_ORIGIN,
    methods: ["POST"],
  };
server.use(cors(corsOptions));

server.use(json());

//routes
server.use("/authentication",authRouter)




server.listen(process.env.PORT,() => {
    console.log(`listening to port ${process.env.PORT}`)
});