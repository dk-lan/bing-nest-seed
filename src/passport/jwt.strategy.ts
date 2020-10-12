import { UserService } from '@/service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JWTBase } from './jwt.base'
import { UserEntity, UserStatus } from '@/entity';

/**
 * Jwt策略
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    /**
     * 初始化Jwt策略
     * @param userService 授权服务
     */
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWTBase.secret
        });
    }

    /**
     * 验证
     * @param req 
     * @param payload 
     * @param done 
     */
    async validate(payload, done: Function) {
        const user = await this.userService.ValidateUser(payload.username);
        
        //账户不存在，则401
        if(!user){
            return done(new UnauthorizedException(), false);
        }

        //如果账户被锁定，则403
        if(user.status == UserStatus.locked){
            return done(new ForbiddenException(), false);
        }
        
        return payload;
    }
}