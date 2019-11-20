import { Module } from '@nestjs/common';
import { HelloController } from './hello/hello.controller';

@Module({
  controllers: [HelloController]
})
export class HelloworldModule {}
