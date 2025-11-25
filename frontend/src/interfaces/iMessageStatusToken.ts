// FIRMA PARA LAS RESPUESTAS DEL BACKEND CON TOKENS
export interface iMessageStatusToken{
    token: string;
    success:boolean;
    expiresAt?:Date;
    message?:string;
}