import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '@/database/database.module';

@Module({
  imports: [DatabaseModule, JwtModule],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
