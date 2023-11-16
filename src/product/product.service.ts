import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepo : Repository<Product>
  ) {}

  async createProduct(createProductDto:CreateProductDto) {
    const newproduct = await this.productRepo.create(createProductDto)
    await this.productRepo.save(newproduct)
    return newproduct
  }

  async getProducts() {
    return this.productRepo.find()
  }

  async getProductById(id:string) {
    const foundproduct = await this.productRepo.findOneBy({id})
    if (foundproduct) {return foundproduct}
    throw new HttpException("not found", HttpStatus.NOT_FOUND)
  }

  async updateProductById(id:string, updateProductDto:UpdateProductDto) {
    await this.productRepo.update(id,updateProductDto)
    const foundproduct = await this.productRepo.findOneBy({id})
    if (foundproduct) {return foundproduct}
    throw new HttpException("not found", HttpStatus.NOT_FOUND)

  }

  async deleteProductById(id:string) {
    const deleteresponse = this.productRepo.delete(id)
    console.log("deleted", deleteresponse)
    if (!(await deleteresponse).affected) {throw new HttpException("not found", HttpStatus.NOT_FOUND)}

  }



}
