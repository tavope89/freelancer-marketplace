import { Controller, Get, Query } from '@nestjs/common';
import { FreelancerService } from './freelancer.service';

@Controller('freelancers')
export class FreelancerController {
  constructor(private readonly freelancerService: FreelancerService) {}

  @Get('search')
  async search(@Query() query: any) {
    // Parse skills as array if present
    if (query.skills && typeof query.skills === 'string') {
      query.skills = [query.skills];
    }
    if (Array.isArray(query.skills)) {
      // If skills is a comma-separated string, split it
      if (query.skills.length === 1 && query.skills[0].includes(',')) {
        query.skills = query.skills[0].split(',').map((s: string) => s.trim());
      }
    }
    // Parse booleans and numbers
    if (query.availability !== undefined) query.availability = query.availability === 'true' || query.availability === true;
    if (query.hasPortfolio !== undefined) query.hasPortfolio = query.hasPortfolio === 'true' || query.hasPortfolio === true;
    if (query.minRate !== undefined) query.minRate = Number(query.minRate);
    if (query.maxRate !== undefined) query.maxRate = Number(query.maxRate);
    if (query.minRating !== undefined) query.minRating = Number(query.minRating);
    if (query.maxResponseTime !== undefined) query.maxResponseTime = Number(query.maxResponseTime);
    if (query.limit !== undefined) query.limit = Number(query.limit);
    if (query.offset !== undefined) query.offset = Number(query.offset);
    const [freelancers, count] = await this.freelancerService.search(query);
    // Convert numeric fields to numbers for test compatibility
    const freelancersFixed = freelancers.map((f: any) => ({
      ...f,
      hourly_rate: typeof f.hourly_rate === 'string' ? Number(f.hourly_rate) : f.hourly_rate,
      average_rating: typeof f.average_rating === 'string' ? Number(f.average_rating) : f.average_rating,
    }));
    return [freelancersFixed, count];
  }
}
