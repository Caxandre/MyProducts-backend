import { injectable, inject } from 'tsyringe'

// import AppError from '@shared/errors/AppError';
import IProductsRepository from '@modules/products/repositories/IProductsRepository'

import Product from '@modules/products/infra/typeorm/entities/Product'

interface IRequest {
  user_id: string
}

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<Product[]> {
    const products = await this.productsRepository.findAllProducts(user_id)

    return products
  }
}

export default ListProductsService
