import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'tbl_otp'
})
export class Otp extends BaseEntity<Otp> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true, nullable: false })
  email: string;

  @Column({ type: 'integer', nullable: false })
  otp: number;

  @Column({ name: 'expiry_time' })
  expiryTime: Date;
}
