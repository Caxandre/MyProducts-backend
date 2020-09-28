import { Request, Response } from 'express'

import { container } from 'tsyringe'

import CreateProductService from '@modules/products/services/CreateProductService'
import ListProductsService from '@modules/products/services/ListProductsService'
import UpdateProductService from '@modules/products/services/UpdateProductService'
import DeleteProductService from '@modules/products/services/DeleteProductService'

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { name, description, price, image } = request.body

    const createProduct = container.resolve(CreateProductService)

    const product = await createProduct.execute({
      name,
      description,
      price,
      image,
      user_id
    })

    return response.json(product)
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const listProducts = container.resolve(ListProductsService)

    const products = await listProducts.execute({
      user_id
    })

    return response.json(products)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const { name, description, price, image } = request.body

    const updateProduct = container.resolve(UpdateProductService)

    const product = await updateProduct.execute({
      id,
      name,
      description,
      price,
      image
    })

    return response.json(product)
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const removeProduct = container.resolve(DeleteProductService)

    await removeProduct.execute({ id })

    return response.json()
  }
}
