import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '../config/auth'
import AppError from '../errors/AppError'
import { UsersRepository } from '../modules/users/repositories/implementations/UsersRepository'

interface IPayload {
  sub: string
}
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization

  const { secret } = authConfig.jwt

  if (!authHeader) {
    throw new AppError('Missing token', 401)
  }

  const [, token] = authHeader.split(' ')
  try {
    const { sub: user_id } = verify(token, secret) as IPayload

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(user_id)
    if (!user) {
      throw new AppError('User does not exist', 404)
    }

    request.user = {
      id: user_id,
    }

    next()
  } catch {
    throw new AppError('Invalid token!', 401)
  }
}
