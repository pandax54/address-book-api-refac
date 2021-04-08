import { sign } from 'jsonwebtoken'

import authConfig from '../../../../config/auth'

interface IHashProvider {
  generate(user_id: string): Promise<string>
}

class JWTAuthentication implements IHashProvider {
  public async generate(user_id: string): Promise<string> {
    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user_id,
      expiresIn,
    })

    return token
  }
}

export { JWTAuthentication }
