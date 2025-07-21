import { DataSource } from 'typeorm';
import { Freelancer, Skill, Review } from './entities';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';
dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Freelancer, Skill, Review],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();
  const skillNames = ['NestJS', 'React', 'TypeScript', 'PostgreSQL', 'Node.js', 'GraphQL', 'Docker', 'AWS'];
  const skills = await Promise.all(
    skillNames.map(async (name) => {
      let skill = await AppDataSource.getRepository(Skill).findOneBy({ name });
      if (!skill) {
        skill = AppDataSource.getRepository(Skill).create({ name });
        await AppDataSource.getRepository(Skill).save(skill);
      }
      return skill;
    })
  );

  for (let i = 0; i < 30; i++) {
    const freelancer = AppDataSource.getRepository(Freelancer).create({
      full_name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      location: faker.location.city() + ', ' + faker.location.country(),
      timezone: 'UTC' + (faker.number.int({ min: -12, max: 14 }) >= 0 ? '+' : '') + faker.number.int({ min: -12, max: 14 }),
      hourly_rate: faker.number.int({ min: 10, max: 150 }),
      average_rating: Math.round((faker.number.float({ min: 3, max: 5 }) * 10)) / 10,
      response_time: faker.number.int({ min: 10, max: 120 }),
      availability: faker.datatype.boolean(),
      portfolio_url: faker.datatype.boolean() ? faker.internet.url() : null,
    });
    // Assign random skills
    freelancer.skills = faker.helpers.arrayElements(skills, faker.number.int({ min: 1, max: 5 }));
    await AppDataSource.getRepository(Freelancer).save(freelancer);
  }
  console.log('Seeded freelancers and skills!');
  await AppDataSource.destroy();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
