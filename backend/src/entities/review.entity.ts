import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Freelancer } from './freelancer.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Freelancer, (freelancer) => freelancer.reviews, { onDelete: 'CASCADE' })
  freelancer: Freelancer;

  @Column('int')
  rating: number;

  @Column()
  review: string;

  @CreateDateColumn()
  created_at: Date;
}
