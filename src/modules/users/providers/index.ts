import { container } from 'tsyringe'

import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider'
import IHashProvider from './HashProvider/models/IHashProviders'

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)
