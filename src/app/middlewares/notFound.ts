/* eslint-disable  @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    status: httpStatus.NOT_FOUND,
    message: "API not found",
    // error: {
    //   path: req.originalUrl,
    //   message: "The requested path was not found",
    // },
  });
};

export default notFound;
