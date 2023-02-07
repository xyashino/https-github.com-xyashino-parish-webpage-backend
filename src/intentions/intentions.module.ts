import { Module } from '@nestjs/common';
import { IntentionsService } from './intentions.service';
import { IntentionsController } from './intentions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntentionsDayEntity } from './entities/intentions-day.entity';
import { IntentionEntity } from './entities/intention.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IntentionsDayEntity, IntentionEntity])],
  controllers: [IntentionsController],
  exports: [IntentionsService],
  providers: [IntentionsService],
})
export class IntentionsModule {}
