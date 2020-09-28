import Product from '../infra/typeorm/entities/Product'

import ICreateProductDTO from '../dtos/ICreateProductDTO'

interface IFindProducts {
  id: string
}

interface IFindAllProducts {
  user_id: string
}
export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>
  findById(id: string): Promise<Product | undefined>
  save(product: Product): Promise<Product>
  delete(product: Product): Promise<Product>
  findAllProducts(user_id: string): Promise<Product[]>
}
