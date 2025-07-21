import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Freelancer } from './freelancer.entity';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Freelancer, (freelancer) => freelancer.skills)
  freelancers: Freelancer[];
}
