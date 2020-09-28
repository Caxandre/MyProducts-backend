import { Router } from 'express'

import usersRouter from '@modules/users/infra/http/routes/users.routes'
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes'
import productsRouter from '@modules/products/infra/http/routes/products.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRoutes)
routes.use('/products', productsRouter)

export default routes
