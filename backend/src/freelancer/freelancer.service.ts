import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Freelancer } from '../entities/freelancer.entity';
import { Skill } from '../entities/skill.entity';
import { Review } from '../entities/review.entity';

@Injectable()
export class FreelancerService {
  constructor(
    @InjectRepository(Freelancer)
    private freelancerRepository: Repository<Freelancer>,
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async search(filters: any) {
    const qb = this.freelancerRepository.createQueryBuilder('f')
      .leftJoinAndSelect('f.skills', 's')
      .where('1=1');

    if (filters.skills?.length) {
      qb.andWhere('s.name IN (:...skills)', { skills: filters.skills });
    }
    if (filters.minRate && filters.maxRate) {
      qb.andWhere('f.hourly_rate BETWEEN :min AND :max', {
        min: filters.minRate,
        max: filters.maxRate,
      });
    }
    if (filters.minRating) {
      qb.andWhere('f.average_rating >= :rating', { rating: filters.minRating });
    }
    if (filters.availability !== undefined) {
      qb.andWhere('f.availability = :avail', { avail: filters.availability });
    }
    if (filters.timezone) {
      qb.andWhere('f.timezone = :tz', { tz: filters.timezone });
    }
    if (filters.location) {
      qb.andWhere('f.location ILIKE :loc', { loc: `%${filters.location}%` });
    }
    if (filters.maxResponseTime) {
      qb.andWhere('f.response_time <= :rt', { rt: filters.maxResponseTime });
    }
    if (filters.hasPortfolio) {
      qb.andWhere('f.portfolio_url IS NOT NULL');
    }
    qb.take(filters.limit || 20).skip(filters.offset || 0);
    return qb.getManyAndCount();
  }
}
