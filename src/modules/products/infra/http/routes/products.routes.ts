import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import ProductsController from '../controller/ProductsController'

const productsRouter = Router()
const productsController = new ProductsController()

productsRouter.use(ensureAuthenticated)

productsRouter.post('/', productsController.create)
productsRouter.get('/', productsController.index)
productsRouter.put('/:id', productsController.update)
productsRouter.delete('/:id', productsController.remove)

export default productsRouter
