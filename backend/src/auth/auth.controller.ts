import {
  Controller,
  Post,
  Req,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';


// @UseGuards(JwtAuthGuard) ==> JwtAuthGuard IMPLEMENTA LA VERIFICACION DEL HEADER AUTHORIZATION
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // LOGIN CON USERNAME Y PASSWORD
  @Post('/login')
  @UseGuards(AuthGuard('local')) // USA PASSPORT PARA VALIDAR USUARIO Y CONTRASEÑA, EJECUTA PASSPORT LocalStrategy.
  async login(@Req() request): Promise<{ accessToken: string; refreshToken: string }> {
    // OBTENER OBJETO DEL USUARIO VALIDADO POR PASSPORT
    const user = request.user;

    console.log(user);
    

    // OBTENER IP Y USER-AGENT (OPCIONAL) PARA GUARDAR EN REFRESH TOKEN
    const ip = request.ip;

    console.log(ip);
    
    const userAgent = request.headers['user-agent'] ?? null;

    // LLAMAR A SERVICE PARA GENERAR ACCESS + REFRESH TOKEN
    return this.authService.signIn(user, ip, userAgent);
  }

  // REFRESH TOKEN ==> OBTENER NUEVO ACCESS TOKEN
  @Post('/refresh')
  async refresh(@Body('refreshToken') refreshToken: string): Promise<{ accessToken: string } | null> {
    // LLAMAR AL SERVICE PARA VALIDAR Y GENERAR NUEVO ACCESS TOKEN
    return this.authService.refreshAccessToken(refreshToken);
  }

  // LOGOUT ==> REVOCAR UN REFRESH TOKEN
  @Post('/logout')
  async logout(@Body('refreshToken') refreshToken: string): Promise<{ revoked: boolean }> {
    // LLAMAR AL SERVICE PARA ELIMINAR EL REFRESH TOKEN DE LA DB
    return this.authService.logout(refreshToken);
  }
}
