import { HttpStatus } from '@nestjs/common';
import { PassiveException } from './passive.exception';

/**
 * 验证异常
 */
export class ValidationException extends PassiveException {
    /**
     * 初始化验证异常
     * @param message 消息
     */
    constructor(message?: string) {
        super(message || '请求格式无效', HttpStatus.BAD_REQUEST);
    }
}