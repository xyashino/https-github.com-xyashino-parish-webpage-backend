import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '../../types/users/user-entity.interface';

@Entity()
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  email: string;
  @Exclude()
  @Column({
    length: 60,
  })
  hashedPassword: string;
  @Exclude()
  @Column({
    nullable: true,
    default: null,
  })
  currentTokenId: string | null;
}
