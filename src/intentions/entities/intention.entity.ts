import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IntentionsDayEntity } from './intentions-day.entity';
import { Intention } from '../../types/intentions/intention-entity.interface';

@Entity()
export class IntentionEntity
  extends BaseEntity
  implements Omit<Intention, 'day'>
{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  hour: string;

  @Column({
    type: 'varchar',
    length: '1000',
  })
  value: string;

  @ManyToOne(() => IntentionsDayEntity, (intention) => intention.day)
  @JoinColumn()
  day: IntentionsDayEntity;
}
