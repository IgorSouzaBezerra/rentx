import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { id } = request.user;
  const usersRepostory = new UsersRepository();
  const user = await usersRepostory.findById(id);

  if (!user.isAdmin) {
    throw new AppError("User isn't admin!", 400);
  }

  return next();
}
