import { Module } from '@nestjs/common';
import { RefreshTokensController } from './refresh-tokens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { RefreshTokenService } from './refresh-tokens.service';

@Module({
  imports:[TypeOrmModule.forFeature([RefreshToken])],
  controllers: [RefreshTokensController],
  providers: [RefreshTokenService],
  exports:[RefreshTokenService]
})
export class RefreshTokensModule {}
