import { Controller, Get, HttpStatus, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  startServer(@Res() res) {
    return res.status(HttpStatus.OK).send('Kosmic.ai server is up!');
  }
}
