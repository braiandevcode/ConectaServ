import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { RefreshTokenService } from 'src/refresh-tokens/refresh-tokens.service';
import { UserService } from 'src/user/user.service';
import { RefreshTokensModule } from 'src/refresh-tokens/refresh-tokens.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[
    ConfigModule,
    PassportModule,
    RefreshTokensModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET_AUTH'),
        //TIEMPO DE EXPIRACION DEL TOKEN 
        signOptions: { expiresIn: configService.getOrThrow('JWT_EXPIRES_AUTH') },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
