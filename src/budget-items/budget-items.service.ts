import { Injectable } from '@nestjs/common';
import { CreateBudgetItemDto } from './dto/create-budget-item.dto';
import { UpdateBudgetItemDto } from './dto/update-budget-item.dto';

@Injectable()
export class BudgetItemsService {
  create(createBudgetItemDto: CreateBudgetItemDto) {
    return 'This action adds a new budgetItem';
  }

  findAll() {
    return `This action returns all budgetItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} budgetItem`;
  }

  update(id: number, updateBudgetItemDto: UpdateBudgetItemDto) {
    return `This action updates a #${id} budgetItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} budgetItem`;
  }
}
