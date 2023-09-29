import { Response } from "express";

const sendUnexpectedErrorResponse = (res: Response) => {
  res.status(500).json("unexpected_error");
};

export default sendUnexpectedErrorResponse;
