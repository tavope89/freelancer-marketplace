import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';

describe('Freelancer Search (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
    dataSource = app.get(DataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return freelancers with no filters (default limit)', async () => {
    const res = await request(app.getHttpServer())
      .get('/freelancers/search')
      .expect(200);
    expect(Array.isArray(res.body[0])).toBe(true); // freelancers
    expect(typeof res.body[1]).toBe('number'); // count
  });

  it('should filter by skill', async () => {
    const res = await request(app.getHttpServer())
      .get('/freelancers/search')
      .query({ skills: ['NestJS'] })
      .expect(200);
    expect(Array.isArray(res.body[0])).toBe(true);
    // All freelancers should have the skill 'NestJS'
    for (const freelancer of res.body[0]) {
      expect(freelancer.skills.some((s: any) => s.name === 'NestJS')).toBe(true);
    }
  });

  it('should filter by minRate and maxRate', async () => {
    const res = await request(app.getHttpServer())
      .get('/freelancers/search')
      .query({ minRate: 20, maxRate: 100 })
      .expect(200);
    for (const freelancer of res.body[0]) {
      expect(freelancer.hourly_rate).toBeGreaterThanOrEqual(20);
      expect(freelancer.hourly_rate).toBeLessThanOrEqual(100);
    }
  });

  it('should filter by minRating', async () => {
    const res = await request(app.getHttpServer())
      .get('/freelancers/search')
      .query({ minRating: 4 })
      .expect(200);
    for (const freelancer of res.body[0]) {
      expect(freelancer.average_rating).toBeGreaterThanOrEqual(4);
    }
  });

  it('should filter by availability', async () => {
    const res = await request(app.getHttpServer())
      .get('/freelancers/search')
      .query({ availability: true })
      .expect(200);
    for (const freelancer of res.body[0]) {
      expect(freelancer.availability).toBe(true);
    }
  });

  it('should filter by location', async () => {
    const res = await request(app.getHttpServer())
      .get('/freelancers/search')
      .query({ location: 'United' })
      .expect(200);
    for (const freelancer of res.body[0]) {
      expect(freelancer.location.toLowerCase()).toContain('united');
    }
  });

  it('should filter by timezone', async () => {
    const res = await request(app.getHttpServer())
      .get('/freelancers/search')
      .query({ timezone: 'UTC+1' })
      .expect(200);
    for (const freelancer of res.body[0]) {
      expect(freelancer.timezone).toBe('UTC+1');
    }
  });

  it('should filter by maxResponseTime', async () => {
    const res = await request(app.getHttpServer())
      .get('/freelancers/search')
      .query({ maxResponseTime: 60 })
      .expect(200);
    for (const freelancer of res.body[0]) {
      expect(freelancer.response_time).toBeLessThanOrEqual(60);
    }
  });

  it('should filter by hasPortfolio', async () => {
    const res = await request(app.getHttpServer())
      .get('/freelancers/search')
      .query({ hasPortfolio: true })
      .expect(200);
    for (const freelancer of res.body[0]) {
      expect(freelancer.portfolio_url).not.toBeNull();
    }
  });
});
