import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) { }

    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async create(category: Category): Promise<Category> {
        return await this.categoryRepository.save(category)
    }

    async update(category: Category): Promise<UpdateResult> {
        return await this.categoryRepository.update(category.id, category)
    }

    async delete(id): Promise<DeleteResult> {
        return await this.categoryRepository.delete(id)
    }
}
