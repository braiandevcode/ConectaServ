// import { Controller, HttpCode, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthGuard } from '@nestjs/passport';

// @Controller('auth')
// export class AuthController {
//     constructor(private readonly authService: AuthService) { }
//     @Post('login')
//     @UseGuards(AuthGuard('local')) //ACTIVA LOGICA DE VERIFICACION LocalStrategy
//     @HttpCode(200)
//     async authUser(@Req() request): Promise<{ accessToken: string; userName: string; }> {
//         const {  } = request;
//         return this.authService.authUser({ })
//     }
// }




import { Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UseGuards(AuthGuard('local')) // ACTIVA LA LOGICA DE VALIDATE EN LocalStrategy
    @HttpCode(200) // 200 ES EL CÓDIGO POR DEFECTO PARA POST SIN REDIRECCIÓN, PUEDES OMITIRLO SI QUIERES MÁS BREVEDAD
    async signIn(@Req() request): Promise<{ accessToken: string; userName: string }> {
        // BUENA PRÁCTICA: PASSPORT YA VALIDÓ AL USUARIO Y ALMACENÓ SU OBJETO EN request.user
        // ESTE OBJETO NO CONTIENE LA CONTRASEÑA, GRACIAS A LA LOGICA DE VALIDATEUSER.
        const user = request.user; 
        
        // LLAMAR AL SERVICIO PARA GENERAR EL TOKEN (JWT)
        return this.authService.login(user); // CAMBIAR EL NOMBRE DE LA FUNCIÓN A `LOGIN` PARA MAYOR CLARIDAD
    }
}