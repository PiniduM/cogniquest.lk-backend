import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import authRouter from "./routes/authentication/authRouter.js";
import organizationMemberRouter from "./routes/organization_member/organizationMemberRouter.js";
import path from "path";
import moduleAlias from "module-alias";
import managementRouter from "./routes/management/managementRouter.js";

//dev setup
// const srcDirectoryRoot = __dirname;
// moduleAlias.addAlias('@',srcDirectoryRoot);

// server setup
dotenv.config();

const server = express();

const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN,
  methods: ["POST"],
};
server.use(cors(corsOptions));

server.use(json());

//routes
server.use("/authentication", authRouter);
server.use("/organization_member", organizationMemberRouter);
server.use("/management", managementRouter);

server.listen(process.env.PORT, () => {
  console.log(`listening to port ${process.env.PORT}`);
});
