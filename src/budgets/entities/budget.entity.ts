import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('budgets')
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
