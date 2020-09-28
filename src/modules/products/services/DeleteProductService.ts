import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import Product from '../infra/typeorm/entities/Product'
import IProductsRepository from '../repositories/IProductsRepository'

interface IRequestDTO {
  id: string
}

@injectable()
export default class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute({ id }: IRequestDTO): Promise<Product> {
    const product = await this.productsRepository.findById(id)

    if (!product) {
      throw new AppError('Product not found')
    }

    return this.productsRepository.delete(product)
  }
}
