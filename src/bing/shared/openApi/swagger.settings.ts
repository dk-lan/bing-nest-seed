/**
 * Swagger设置
 */
export class SwaggerSettings {
    /**
     * 标题
     */
    title: string;
    /**
     * 说明
     */
    description: string;
    /**
     * 版本号
     */
    version: string = '1.0';
    /**
     * 显示文档路径
     */
    viewPath: string = 'swagger';
    /**
     * 接口根路径
     */
    basePath: string = '';
}