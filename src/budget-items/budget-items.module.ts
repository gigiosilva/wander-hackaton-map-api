import { Module } from '@nestjs/common';
import { BudgetItemsService } from './budget-items.service';
import { BudgetItemsController } from './budget-items.controller';

@Module({
  controllers: [BudgetItemsController],
  providers: [BudgetItemsService]
})
export class BudgetItemsModule {}
