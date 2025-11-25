import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Strategy } from "passport-local";
import { iJwtPayload } from "../interface/jwtPayload";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'userName', passwordField: 'password' });
  }

  async validate(userName: string, password: string): Promise<iJwtPayload> {
    // REUTILIZO FUNCION QUE ESTA EN AuthService
    const user = await this.authService.validateUser({ userName, password });
    if (!user) throw new UnauthorizedException();
    return user; //PASSPORT LO PONE EN request.user
  }
}
