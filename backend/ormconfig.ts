import { DataSource } from 'typeorm';
import { Freelancer, Skill, Review } from './src/entities';
import * as dotenv from 'dotenv';
dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Freelancer, Skill, Review],
  synchronize: true, // Set to false in production
});
