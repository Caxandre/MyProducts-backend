import { inject, injectable } from 'tsyringe'

import Product from '../infra/typeorm/entities/Product'
import IProductsRepository from '../repositories/IProductsRepository'

interface IRequest {
  name: string
  description: string
  price: number
  image: string
  user_id: string
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute({
    name,
    description,
    price,
    image,
    user_id
  }: IRequest): Promise<Product> {
    const product = this.productsRepository.create({
      name,
      description,
      price,
      image,
      user_id
    })

    return product
  }
}

export default CreateProductService
