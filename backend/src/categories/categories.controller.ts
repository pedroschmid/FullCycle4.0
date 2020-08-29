import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Category } from '../categories/category.entity'
import { CategoriesService } from '../categories/categories.service'

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService){}

    @Get()
    index(): Promise<Category[]> {
        return this.categoriesService.findAll()
    }

    @Post('create')
    async create(@Body() categoryData: Category): Promise<any> {
        return this.categoriesService.create(categoryData)
    }

    @Put(':id/update')
    async update(@Param('id') id, @Body() categoryData: Category): Promise<any> {
        categoryData.id = Number(id)
        return this.categoriesService.update(categoryData)
    }

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
        return this.categoriesService.delete(id)
    }

    
}
