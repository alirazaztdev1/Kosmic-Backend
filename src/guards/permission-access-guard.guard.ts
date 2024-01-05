import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_TYPE } from 'src/constants';

@Injectable()
export class PermissionAccessGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const requireRoles = this.reflector.getAllAndOverride<ROLE_TYPE[]>('roles', [
      context.getHandler(),
      context.getClass()
    ]);

    const { user } = context.switchToHttp().getRequest();

    return requireRoles.some((role) => [user.role].includes(role));
  }
}
