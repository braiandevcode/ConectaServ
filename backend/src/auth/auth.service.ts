
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from 'src/interface/iUserPayload';
import { TAuthLogin } from 'src/types/typeAuthLogin';

@Injectable()
export class AuthService {
    // INYECTAR EL SERVICIO JWT EN EL CONSTRUCTOR
    constructor(private readonly jwtService: JwtService) {}

    // ESTO DEBE CONTENER EL HASH DE LA CONTRASEÑA, NO EL TEXTO PLANO
    private readonly mockUsers: any[] = [
        // EJEMPLO: 'client123' HASHED CON UN GENERADOR ONLINE PARA ILUSTRACIÓN. 
        // ¡DEBES USAR UN PASSWORD HASH SEGURO EN PRODUCCIÓN!
        { id: 1, username: 'clienteUsuario', hashedPassword: 'HASH_DE_CLIENT123', roles: ['client'] }, 
        { id: 2, username: 'taskerUsuario', hashedPassword: 'HASH_DE_TASKER123', roles: ['tasker'] },
    ];

    // VALIDAR CREDENCIALES
    async validateUser(loginDto: TAuthLogin): Promise<UserPayload | null> { // RETORNA UN OBJETO LIMPIO O NULO
        
        const { userName, password } = loginDto;
        
        // 1. BUSCAR USUARIO
        const user = this.mockUsers.find(u => u.username === userName);

        if (!user) {
            return null; // NO LANZAR ERROR AQUÍ. LA ESTRATEGIA DE PASSPORT LO MANEJA MEJOR CON NULL.
        }

        // 2. COMPARAR CONTRASEÑA (BCRYPT ES IMPRESCINDIBLE)
        // const isMatch = await bcrypt.compare(password, user.hashedPassword);
        
        // SIMULACIÓN DE LA COMPARACIÓN (REEMPLAZAR POR BCRYPT EN REALIDAD)
        const isMatch = (user.hashedPassword === `HASH_DE_${password.toUpperCase()}`); // ESTO ES SOLO PARA EL EJEMPLO

        if (!isMatch) {
            return null; // CREDENCIALES INVÁLIDAS
        }

        // 3. ELIMINAR EL CAMPO DE CONTRASEÑA ANTES DE DEVOLVER
        const { hashedPassword, ...result } = user; 
        return result as UserPayload; // DEVOLVER EL PAYLOAD LIMPIO
    }

    // GENERAR TOKEN JWT
    async login(user: UserPayload) { 
        // DATOS A INCLUIR EN EL TOKEN (PAYLOAD)
        const payload = { 
            username: user.username, 
            sub: user.id, // 'SUB' ES EL ESTÁNDAR PARA EL ID DE USUARIO
            roles: user.roles // PARA AUTORIZACIÓN
        };
        
        // GENERAR Y DEVOLVER EL TOKEN
        return {
            accessToken: this.jwtService.sign(payload),
            userName: user.username, // OPCIONAL: DEVOLVER EL NOMBRE DIRECTAMENTE
        };
    }
}