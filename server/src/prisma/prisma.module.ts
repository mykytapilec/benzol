import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // делает модуль доступным во всех других без явного импорта
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
