import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginVerifiedGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return false;
    }

    try {
      const decodedToken = this.jwtService.verify(token, { secret: process.env.JWT_SECRET_KEY });
      request.user = decodedToken.user; // Assuming the decoded token contains the user object as `user`
      return request;
    } catch (err) {
      return false;
    }
  }
}
