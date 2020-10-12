/**
 * 应用程序异常
 */
export class Warning extends Error {
    /**
     * 错误消息
     */
    readonly message: string;

    /**
     * 错误码
     */
    code: string;

    /**
     * 初始化应用程序异常
     * @param message 错误消息
     * @param code 错误码
     */
    constructor(message: string, code: string = '-1') {
        super(message);
        this.message = message;
        this.code = code;
    }
}