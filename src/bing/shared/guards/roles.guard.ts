import { CanActivate, Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

/**
 * 角色守卫。基于角色的守卫
 */
@Injectable()
export class RolesGuard implements CanActivate {
    
    /**
     * 初始化角色守卫
     * @param reflector 反射器
     */
    constructor(private readonly reflector: Reflector) { }

    /**
     * 是否通过
     * @param context 执行上下文
     */
    canActivate(context: ExecutionContext): boolean {
        const req  = context.switchToHttp().getRequest();
        const user = req.user;
        const body = req.body;
        if(!user || !user.address || !body || !body.address){
            return true
        }
        const handler = context.getHandler();
        const roles = this.reflector.get<string[]>('roles', handler);
        if (!roles) {
            return true;
        }

        const hasRole = () => !!roles.find(item => item === user.role);
        return user && user.role && hasRole();
    }
}