import { Request, Response } from "express";
import loginHost from "./functions/loginHost.js";
import loginCandidate from "./functions/loginCandidate.js";

const login = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    if (data?.type === "candidate") {
      const result = await loginCandidate(data);
      res.status(200).send(result);
    } else if (data?.type === "host") {
      const result = await loginHost(data);
      res.status(200).send(result);
    } //result can be a jwt,object with email_address(to which the verification sent) or incorrect credentials message
    else res.status(400).send("invalid request");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export default login;
