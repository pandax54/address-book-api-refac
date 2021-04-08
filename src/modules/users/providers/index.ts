import { container } from 'tsyringe'

import { IAuthentication } from './IAuthentication'
import { IHashProvider } from './IBCryptHashProvider'
import BCryptHashProvider from './implementations/BCryptHashProvider'
import { JWTAuthentication } from './implementations/JWTAuthenticationProvider'

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)
container.registerSingleton<IAuthentication>('TokenProvider', JWTAuthentication)
