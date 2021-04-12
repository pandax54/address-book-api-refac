import env from 'env-var'
import { v4 as uuid } from 'uuid'

import { admin } from '../../../../shared/infra/firebase/firebase'
import { ICreateContactDTO } from '../../../dtos/ICreateContactDTO'

const db = admin.database()

const firebase_test = env.get('FIREBASE_INTEGRATION_TEST').asString()

class FirebaseRepository {
  public async findByUserId(user_id: string): Promise<any> {
    const data = await db
      .ref(`/users${firebase_test}/user-${user_id}/contacts/`)
      .once('value', async snapshot => {
        return snapshot.val()
      })

    return data
  }

  public async create({
    user_id,
    first_name,
    last_name,
    phone_number,
    address,
    created_at,
  }: ICreateContactDTO): Promise<void> {
    // --> users (collection) -> user-id (document) -> contacts (collection) -> contact (document)
    db.ref(`/users${firebase_test}/user-${user_id}/contacts/`).push({
      id: uuid(),
      user_id,
      first_name,
      last_name,
      phone_number,
      address,
      created_at,
    })
  }
}

export { FirebaseRepository }
