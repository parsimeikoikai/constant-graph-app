import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphController } from './controllers/graph.controller.controller';
import { GraphService } from './services/graph.service';
@Module({
  imports: [],
  controllers: [AppController, GraphController],
  providers: [AppService, GraphService],
})
export class AppModule {}
