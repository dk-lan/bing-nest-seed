export class HttpClient {

}

/**
 * Http请求操作
 */
export class HttpRequest<T>{
    /**
     * Http请求头集合
     */
    private headers: { [key: string]: object };
    /**
     * 内容类型
     */
    private httpContentType: HttpContentType;
    /**
     * Http参数集合
     */
    private parameters: any;

    /**
     * 初始化Http请求
     * @param httpMethod Http方法
     * @param url 请求地址
     * @param body Http主体
     */
    constructor(private httpMethod: HttpMethod, private url: string, private body?) {
        this.headers = {};
    }

}

/**
 * Http请求头
 */
export class HttpHeaders {

}

/**
 * Http响应处理器
 */
export class HttpHandleOptions<T>{
    /**
     * 发送前处理函数，返回false则取消发送
     */
    beforeHandler?: () => boolean;
    /**
     * 成功处理函数
     */
    handler: (value: T) => void;
    /**
     * 失败处理函数
     */
    failHandler?: (result: any) => void;
    /**
     * 请求完成处理函数
     */
    completeHandler?: () => void;
}

/**
 * Http方法
 */
export enum HttpMethod {
    Get,
    Post,
    Put,
    Delete
}

/**
 * Http内容类型
 */
export enum HttpContentType {
    /**
     * application/x-www-form-urlencoded
     */
    FormUrlEncoded,
    /**
     * application/json
     */
    Json
}