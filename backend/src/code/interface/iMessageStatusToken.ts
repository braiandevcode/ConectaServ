import { HttpStatus } from "@nestjs/common";

export interface iMessageStausToken{
    token?: string;
    success:boolean;
    // statusCode: HttpStatus
    expiresAt?:Date;
    message?:string;
}