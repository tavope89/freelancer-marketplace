import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  @Get()
  getStatus() {
    return { status: 'Server is alive 🚀' };
  }
}
