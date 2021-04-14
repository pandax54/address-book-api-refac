import { v4 as uuid } from 'uuid'

class Contact {
  id: string

  user_id: string

  first_name: string

  last_name: string

  phone_number: string

  address: string

  created_at: Date

  constructor() {
    if (!this.id) this.id = uuid()
    this.created_at = new Date()
  }
}

export { Contact }
