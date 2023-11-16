import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(createProductDto:CreateProductDto) {
    return this.productService.createProduct(createProductDto)
  }
  @Get("all")
  async getProducts() {
    return this.productService.getProducts()
  }

  @Get(":id")
  async getProductById(id:string) {
    return this.productService.getProductById(id)
  }

  @Get(":id")
  async updateProductById(id:string, updateProductDto:UpdateProductDto) {
    return this.productService.updateProductById(id, updateProductDto)
  }

  @Get(":id")
  async deleteProductById(id:string) {
   return this.productService.deleteProductById(id)
  }

}
