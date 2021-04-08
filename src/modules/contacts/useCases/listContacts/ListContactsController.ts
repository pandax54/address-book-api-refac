import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListContactsUseCase } from './ListContactsUseCase'

class ListContactsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user

    const listContactsUseCase = container.resolve(ListContactsUseCase)

    const list = await listContactsUseCase.execute(user_id)

    return response.status(200).json(list)
  }
}

export { ListContactsController }
