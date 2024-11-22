import { Request, Response, NextFunction } from "express";
import { logError } from "@/shared/logger";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }

  logError(err.stack || "Unknown error");
  res.status(err.status || 500).json({
    error: err.message || "Server Error",
  });
}
