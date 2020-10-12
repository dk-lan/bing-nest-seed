import { PassiveException } from './passive.exception';
import { HttpStatus } from '@nestjs/common';
/**
 * 无效授权异常
 */
export class UnauthorizedException extends PassiveException {
    /**
     * 初始化无效授权异常
     * @param message 消息
     */
    constructor(message?: any) {
        super(message || '无效授权', HttpStatus.UNAUTHORIZED);
    }
}