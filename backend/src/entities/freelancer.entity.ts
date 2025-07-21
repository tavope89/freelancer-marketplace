import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Skill } from './skill.entity';
import { Review } from './review.entity';

@Entity()
export class Freelancer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  location: string;

  @Column()
  timezone: string;

  @Column('numeric')
  hourly_rate: number;

  @Column('numeric', { precision: 2, scale: 1 })
  average_rating: number;

  @Column('int')
  response_time: number; // in minutes

  @Column()
  availability: boolean;

  @Column({ nullable: true, type: 'text' })
  portfolio_url?: string | null;

  @ManyToMany(() => Skill, (skill) => skill.freelancers, { cascade: true })
  @JoinTable({ name: 'freelancer_skills' })
  skills: Skill[];

  @OneToMany(() => Review, (review) => review.freelancer)
  reviews: Review[];
}
