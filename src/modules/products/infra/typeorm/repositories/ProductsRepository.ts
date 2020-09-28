import { getRepository, Repository } from 'typeorm'
import IProductsRepository from '@modules/products/repositories/IProductsRepository'
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO'

import Product from '../entities/Product'

interface IFindProducts {
  id: string
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>

  constructor() {
    this.ormRepository = getRepository(Product)
  }

  public async findAllProducts(user_id: string): Promise<Product[]> {
    const products = await this.ormRepository.find({ where: { user_id } })

    return products
  }

  public async create({
    name,
    description,
    price,
    image,
    user_id
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      description,
      price,
      image,
      user_id
    })

    await this.ormRepository.save(product)

    return product
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id)
    return product
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product)
  }

  public async delete(product: Product): Promise<Product> {
    return this.ormRepository.remove(product)
  }
}

export default ProductsRepository
