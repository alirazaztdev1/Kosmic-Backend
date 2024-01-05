import { CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

export abstract class BaseEntity<T> {
  @Column({
    type: 'int',
    name: 'created_by',
    nullable: true,
    default: null
  })
  createdBy: number;

  @Column({
    type: 'int',
    name: 'updated_by',
    nullable: true,
    default: null
  })
  updatedBy: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;
}
