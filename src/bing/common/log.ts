import { configure, getLogger, Logger } from 'log4js';

/**
 * 日志工具
 */
export class Log {

    /**
     * 初始化日志工具
     */
    constructor() {
        this.initConfig();
    }

    /**
     * 写入跟踪日志
     * @param msg 消息
     */
    public trace(msg: any) {
        let outMsg = msg;
        if (msg === null) {
            outMsg = '';
        }
        const wrapper = new MessageWrapper();
        wrapper.content = outMsg;
        this.writeLog(wrapper, LogLevel.Trace);
    }

    /**
     * 写入调试日志
     * @param msg 消息
     */
    public debug(msg: any) {
        let outMsg = msg;
        if (msg === null) {
            outMsg = '';
        }
        const wrapper = new MessageWrapper();
        wrapper.content = outMsg;
        this.writeLog(wrapper, LogLevel.Debug);
    }

    /**
     * 写入信息日志
     * @param msg 消息
     */
    public info(msg: any) {
        let outMsg = msg;
        if (msg === null) {
            outMsg = '';
        }
        const wrapper = new MessageWrapper();
        wrapper.content = outMsg;
        this.writeLog(wrapper, LogLevel.Information);
    }

    /**
     * 写入警告日志
     * @param msg 消息
     */
    public warn(msg: any) {
        let outMsg = msg;
        if (msg === null) {
            outMsg = '';
        }
        const wrapper = new MessageWrapper();
        wrapper.content = outMsg;
        this.writeLog(wrapper, LogLevel.Warning);
    }

    /**
     * 写入错误日志
     * @param msg 消息
     */
    public error(msg: any, exception?: Error) {
        let outMsg = msg;
        if (msg === null) {
            outMsg = '';
        }
        const wrapper = new MessageWrapper();
        wrapper.content = outMsg;
        wrapper.exception = exception;
        this.writeLog(wrapper, LogLevel.Error);
    }

    /**
     * 写入致命错误日志
     * @param msg 消息
     */
    public fatal(msg: any) {
        let outMsg = msg;
        if (msg === null) {
            outMsg = '';
        }
        const wrapper = new MessageWrapper();
        wrapper.content = outMsg;
        this.writeLog(wrapper, LogLevel.Fatal);
    }

    /**
     * 替换控制台
     */
    public replaceConsole() {
        const logger = getLogger('console');
        console.log = logger.info.bind(logger);
    }

    /**
     * 初始化配置
     */
    private initConfig() {
        configure('./log4_config/log4js.json');
    }

    /**
     * 写入日志
     * @param msg 消息包装器
     * @param level 日志级别
     */
    private writeLog(msg: MessageWrapper, level: LogLevel): void {
        const levelName = this.getLogLevelName(level);
        if (levelName === '') {
            return;
        }
        const logger = getLogger(levelName);
        this.execute(msg, logger, level);
    }

    /**
     * 执行日志
     * @param msg 消息包装器
     * @param logger 日志记录器
     * @param level 日志级别
     */
    private execute(msg: MessageWrapper, logger: Logger, level: LogLevel) {
        switch (level) {
            case LogLevel.Trace:
                if (logger.isTraceEnabled()) {
                    logger.trace(msg.content);
                }
                break;
            case LogLevel.Debug:
                if (logger.isDebugEnabled()) {
                    logger.debug(msg.content);
                }
                break;
            case LogLevel.Information:
                if (logger.isInfoEnabled()) {
                    logger.info(msg.content);
                }
                break;
            case LogLevel.Warning:
                if (logger.isWarnEnabled()) {
                    logger.warn(msg.content);
                }
                break;
            case LogLevel.Error:
                if (logger.isErrorEnabled()) {
                    // if (msg.exception != null) {
                    //     msg.content += '\r\n' + msg.exception;
                    // }
                    logger.error(msg.content, msg.exception);
                }
                break;
            case LogLevel.Fatal:
                if (logger.isFatalEnabled()) {
                    logger.fatal(msg.content);
                }
                break;
            default:
                break;
        }
    }

    /**
     * 获取日志级别名称
     * @param level 日志级别
     */
    private getLogLevelName(level: LogLevel): string {
        switch (level) {
            case LogLevel.Trace:
                return 'trace';
            case LogLevel.Debug:
                return 'debug';
            case LogLevel.Information:
                return 'information';
            case LogLevel.Warning:
                return 'warning';
            case LogLevel.Error:
                return 'error';
            case LogLevel.Fatal:
                return 'fatal';
            default:
                return '';
        }
    }
}

/**
 * 日志级别
 */
export enum LogLevel {
    /**
     * 跟踪
     */
    Trace,
    /**
     * 调试
     */
    Debug,
    /**
     * 信息
     */
    Information,
    /**
     * 警告
     */
    Warning,
    /**
     * 错误
     */
    Error,
    /**
     * 致命错误
     */
    Fatal,
}

/**
 * 消息包装器
 */
export class MessageWrapper {
    /**
     * 内容
     */
    content: any;
    /**
     * 异常信息
     */
    exception: Error;
}