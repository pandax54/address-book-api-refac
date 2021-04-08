import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListProfileUserUseCase } from './ListProfileUserUseCase'

class ListProfileUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user
    console.log('controller request', request.user)

    const listProfileUserUseCase = container.resolve(ListProfileUserUseCase)

    const userProfile = await listProfileUserUseCase.execute(user_id)

    return response.status(200).json({ user: classToClass(userProfile) })
  }
}

export { ListProfileUserController }
