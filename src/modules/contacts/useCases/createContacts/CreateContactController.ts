import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateContactUseCase } from './CreateContactUseCase'

class CreateContactController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      first_name,
      last_name,
      phone_number,
      address,
      created,
    } = request.body

    const { id: user_id } = request.user

    const created_at = new Date(created).toString()

    const createContactUseCase = container.resolve(CreateContactUseCase)

    await createContactUseCase.execute({
      user_id,
      first_name,
      last_name,
      phone_number,
      address,
      created_at,
    })

    return response.status(201).send()
  }
}

export { CreateContactController }
