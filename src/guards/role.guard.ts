import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth/auth.service';
// Roles //
import { UserRole } from '../enums/user-role';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private authService: AuthService 
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.get<UserRole[]>('roles', context.getHandler());

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const [payload, isBlocked] = await this.authService.getAccessToken(request.headers.authorization);

        if (!payload) {
            throw new HttpException("You Are Not User!", HttpStatus.FORBIDDEN);
        }

        request['user'] = await payload;
        return this.matchRoles(requiredRoles, payload.role);
    }

    matchRoles(requiredRoles: UserRole[], userRole: UserRole): boolean {
        const roleHierarchy = {
            [UserRole.admin]: [UserRole.admin, UserRole.devtutor, UserRole.destutor, UserRole.developer, UserRole.designer, UserRole.user],
            [UserRole.devtutor]: [UserRole.tutor, UserRole.developer, UserRole.user],
            [UserRole.destutor]: [UserRole.tutor, UserRole.designer, UserRole.user],
            [UserRole.tutor]: [UserRole.tutor],
            [UserRole.developer]: [UserRole.developer, UserRole.user],
            [UserRole.designer]: [UserRole.designer, UserRole.user],
            [UserRole.user]: [UserRole.user]
        };

        return requiredRoles.some(role => roleHierarchy[userRole].includes(role));
    }
}
