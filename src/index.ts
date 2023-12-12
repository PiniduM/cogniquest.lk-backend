import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import authRouter from "./routes/authentication/authRouter.js";
import organizationMemberRouter from "./routes/organization_member/organizationMemberRouter.js";
import path from "path";
import moduleAlias from "module-alias";
import managementRouter from "./routes/management/managementRouter.js";
import generalRouter from "./routes/general/generalRouter.js";
import candidateRouter from "./routes/candidate/candidateRouter.js";
import organizationRouter from "./routes/organization/organizationRouter.js";
import uploadRouter from "./routes/upload/uploadRouter.js";

//dev setup
// const srcDirectoryRoot = __dirname;
// moduleAlias.addAlias('@',srcDirectoryRoot);

// server setup
dotenv.config();

const server = express();

//config cors options in production

const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN,
  methods: ["POST"],
};
server.use(cors());

server.use(json());

//routes
server.use("/general", generalRouter);
server.use("/authentication", authRouter);
server.use("/candidate", candidateRouter);
server.use("/organization_member", organizationMemberRouter);
server.use("/organization", organizationRouter);
server.use("/management", managementRouter);
server.use("/upload",uploadRouter)

server.listen(process.env.PORT, () => {
  console.log(`listening to port ${process.env.PORT}`);
});
