import { HttpStatus } from '@nestjs/common';
import { PassiveException } from './passive.exception';
/**
 * 请求无效异常
 */
export class BadRequestException extends PassiveException {
    /**
     * 初始化请求无效异常
     * @param message 错误消息
     */
    constructor(message?: any) {
        super(message || 'Bad Request', HttpStatus.BAD_REQUEST);
    }
}