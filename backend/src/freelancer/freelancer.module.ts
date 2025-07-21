import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Freelancer } from '../entities/freelancer.entity';
import { Skill } from '../entities/skill.entity';
import { Review } from '../entities/review.entity';
import { FreelancerService } from './freelancer.service';
import { FreelancerController } from './freelancer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Freelancer, Skill, Review])],
  providers: [FreelancerService],
  controllers: [FreelancerController],
})
export class FreelancerModule {}
