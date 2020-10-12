import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './shared/filters/global-exception.filter';
import { HttpExcetpionFilter } from './shared/filters/http-exception.filter';
import { WarningExceptionFilter } from './shared/filters/warning-exception.filter';
import { SwaggerSettings } from './shared/openApi/swagger.settings';
import { ValidationPipe } from './shared/pipes/validation.pipe';
import { ResultWrapperInterceptor } from './shared/interceptors/result-wrapper.interceptor';
import bodyParser = require('body-parser');
import { connectLogger, getLogger } from 'log4js';
import { RolesGuard } from '@/bing/shared/guards/roles.guard'
import { Reflector } from "@nestjs/core";
import * as passport from 'passport';

/**
 * Bing 框架初始化
 */
export class BingStartup {

    /**
     * 初始化框架
     * @param app APP
     */
    public static startup(app: INestApplication): void {
        // 配置全局管道
        app.useGlobalPipes(new ValidationPipe());

        // 配置全局过滤器
        app.useGlobalFilters(new GlobalExceptionFilter(), new HttpExcetpionFilter(), new WarningExceptionFilter());

        // 配置全局拦截器
        app.useGlobalInterceptors(new ResultWrapperInterceptor());

        // 内容格式化
        app.use(bodyParser.json());

        // 启用跨域
        app.enableCors({
            optionsSuccessStatus: 200,
            allowedHeaders: 'Content-Type,Content-Length, authorization, Accept,X-Requested-With',
            methods: 'PUT,POST,GET,DELETE,OPTIONS',
            origin: '*'
        });

        /**
         * 启用 jwt 验证
         */
        // app.use(passport.authenticate('jwt', { session: false }));

        // 写请求日志
        app.use(connectLogger(getLogger('http'), {
            level: 'auto',
            format: (req, res, format) => format(`日志时间：:date  请求地址：:url  请求方法：:method \r\n客户端IP地址：:remote-addr \r\n引用地址：:referrer \r\n客户端信息：:user-agent \r\n响应状态：:status \r\n响应时间：:response-time \r\n请求 Body：${JSON.stringify(req.body)} \r\n请求 Params：${JSON.stringify(req.params)}`)
        }));

        //启用路由守卫
        app.useGlobalGuards( new RolesGuard( app.get( Reflector ) ) );
    }

    /**
     * 配置Swagger文档
     * @param settings swagger设置
     * @param app Nest应用
     */
    public static configSwagger(app: INestApplication): void {
        const swaggerSettings       = new SwaggerSettings();
        swaggerSettings.title       = 'bing-nest-seed';
        swaggerSettings.description = 'a framework base on nestjs';
        swaggerSettings.version     = '1.0.0';
        swaggerSettings.basePath    = '';

        const options = new DocumentBuilder()
            .setTitle(swaggerSettings.title)
            .setDescription(swaggerSettings.description)
            .setVersion(swaggerSettings.version)
            .setBasePath(swaggerSettings.basePath)
            .build();

        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup(swaggerSettings.viewPath, app, document);
    }
}