import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BudgetItemsService } from './budget-items.service';
import { CreateBudgetItemDto } from './dto/create-budget-item.dto';
import { UpdateBudgetItemDto } from './dto/update-budget-item.dto';

@Controller('budget-items')
export class BudgetItemsController {
  constructor(private readonly budgetItemsService: BudgetItemsService) {}

  @Post()
  create(@Body() createBudgetItemDto: CreateBudgetItemDto) {
    return this.budgetItemsService.create(createBudgetItemDto);
  }

  @Get()
  findAll() {
    return this.budgetItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.budgetItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBudgetItemDto: UpdateBudgetItemDto) {
    return this.budgetItemsService.update(+id, updateBudgetItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.budgetItemsService.remove(+id);
  }
}
