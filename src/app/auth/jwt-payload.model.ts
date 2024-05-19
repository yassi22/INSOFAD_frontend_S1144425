export class JwtPayload {
    public sub: string; 
    public userId: number;
    public email: string;
    public role: string; 
    public exp: number;
    public iat: number;
}
