import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ROLE_TYPE, SIGN_UP_TYPE } from '../constants';
import { BaseEntity } from './base.entity';
import { Profile } from './profile.entity';

@Entity({
  name: 'tbl_user'
})
export class User extends BaseEntity<User> {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({
    type: 'enum',
    enum: ROLE_TYPE,
    nullable: false
  })
  role: string;

  @Column({ type: 'text', unique: true, nullable: false })
  email: string;

  @Column({
    type: 'text',
    default: ''
  })
  password: string;

  @Column({
    type: 'bool',
    default: false,
    name: 'is_email_verified'
  })
  isEmailVerified: boolean;

  @Column({
    type: 'enum',
    enum: SIGN_UP_TYPE,
    default: SIGN_UP_TYPE.DEFAULT,
    name: 'sign_up_type'
  })
  signUpType: boolean;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;
}
