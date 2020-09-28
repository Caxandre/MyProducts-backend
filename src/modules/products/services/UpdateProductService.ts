import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import Product from '../infra/typeorm/entities/Product'
import IProductsRepository from '../repositories/IProductsRepository'

interface IRequestDTO {
  id: string
  name: string
  description: string
  price: number
  image: string
}

@injectable()
export default class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute({
    id,
    name,
    description,
    price,
    image
  }: IRequestDTO): Promise<Product> {
    const product = await this.productsRepository.findById(id)

    if (!product) {
      throw new AppError('Product not found')
    }

    product.name = name
    product.description = description
    product.price = price
    product.image = image

    return this.productsRepository.save(product)
  }
}
