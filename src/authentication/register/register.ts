import { Request, Response } from "express";
import registerCandidate from "./functions/registerCandidate.js";
import registerHost from "./functions/registerHost.js";

const register = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    if (data?.type === "candidate") {
      const emailVerificationToken = await registerCandidate(data);
      res.status(200).send({emailVerificationToken});
    } else if (data?.type === "host") {
      const emailVerificationToken = await registerHost(data);
      res.status(200).send({emailVerificationToken});
    } else {
      console.log("someting went wrong");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("error");
  }
};

export default register;
