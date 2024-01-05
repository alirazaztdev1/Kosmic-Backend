import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { GENDER } from 'src/constants';
import { User } from './user.entity';

@Entity({
  name: 'tbl_profile'
})
export class Profile extends BaseEntity<Profile> {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'text', name: 'first_name' })
  firstName: string;

  @Column({ type: 'text', name: 'last_name' })
  lastName: string;

  @Column({ type: 'text', name: 'phone_number' })
  phoneNumber: string;

  @Column({ type: 'text', name: 'company_logo', nullable: true })
  companyLogo: string;

  @Column({ type: 'text', name: 'company_name', nullable: true })
  companyName: string;

  @Column({ type: 'text', name: 'company_size', nullable: true })
  companySize: string;

  @Column({ type: 'text', name: 'company_address', nullable: true })
  companyAddress: string;

  @Column({ type: 'text', name: 'pfb_certificate', nullable: true })
  PFBCertificate: string;

  @Column({ type: 'text', name: 'vat_certificate', nullable: true })
  VATCertificate: string;

  @Column({ type: 'enum', enum: GENDER, nullable: false, default: GENDER.NULL })
  gender: string;

  @Column({ nullable: true, default: null })
  dob: Date;

  @Column({ type: 'text', nullable: false, default: '' })
  address: string;
}
