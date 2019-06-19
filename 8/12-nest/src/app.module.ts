import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloworldModule } from './helloworld/helloworld.module';

@Module({
  imports: [HelloworldModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
