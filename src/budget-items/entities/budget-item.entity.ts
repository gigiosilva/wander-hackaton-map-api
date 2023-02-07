import { Budget } from './../../budgets/entities/budget.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BudgetItemType } from "../budget-item-type.enum";

@Entity('budget_items')
export class BudgetItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'budget_id',
    nullable: true,
  })
  budgetId: string;

  @ManyToOne(() => Budget, budget => budget.id, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn([
    { name: 'budget_id', referencedColumnName: 'id' },
  ])
  budget: Budget;

  @Column()
  name: string;

  @Column()
  value: string;

  @Column()
  date: Date;

  @Column()
  type: BudgetItemType;

  @Column({
    name: 'is_paid',
  })
  isPaid: boolean;

  @Column({
    type: 'text',
  })
  notes: string;
}
