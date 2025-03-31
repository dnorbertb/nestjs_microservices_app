import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [AuthModule, NotesModule, HealthModule],
  exports: [AuthModule],
})
export class CoreModule {}
