<p align="center">
  <h1>Bing-Nest-Seed</h1>
</p>

## 说明
该项目基于[Nest](https://github.com/nestjs/nest)框架进行开发。使用`TypeScript`进行编写。

## 框架架构
|文件|说明|
|-|-|
|`db\`|数据库表结构(mysql)|
|`log4_config\`|log4日志配置|
|`serverconfig.json`|服务配置文件|
|`passport\`|jwt 验证目录|
|`i18n\`|国际化字典目录|
|`src\main.ts`|入口|
|`src\app.module.ts`|App模块（根模块，必须）|
|`src\bing\`|核心模块（声明过滤器、管道、拦截器、守卫、中间件、全部模块）|

### 服务配置文件
`ServerConfig`
```typescript
export class ServerConfig{
    /**
     * api 端口
     */
    port: number;

    /**
     * eth http url
     */
    eth_http: string;

    /**
     * eth socket url
     */
    eth_socket: string;

    /**
     * 支持的国际化语言
     */
    languages: Array<string>;

    /**
     * 默认的国际化语言，必须为 languages 选项
     */
    default_language: string;

    /**
     * mysql 配置
     */
    mysql: MysqlConfig;

    /**
     * redis 配置
     */
    redis: RedisConfig;

    /**
     * rabbitmq 配置
     */
    rabbitmq: RabbitMQConfig;
}
```

### 数据库配置
数据库使用了 mysql，`MysqlConfig.ts`
```typescript
export class MysqlConfig {
    /**
     * 数据库主机
     */
    host: string;

    /**
     * 端口
     */
    port: number | 3306;

    /**
     * 数据库用户密码
     */
    username: string;

    /**
     * 数据库密码
     */
    password: string;

    /**
     * 数据库名称
     */
    database: string;
    
    synchronize: boolean;

    /**
     * 数据库对应实体
     */
    entities: ((Function | string | EntitySchema<any>))[];
}
```
### 缓存配置
缓存使用了 redis，`RedisConfig.ts`
```typescript
export class RedisConfig{
    /**
     * 主机
     */
    host: string;

    /**
     * 端口
     */
    port: number | 6379;

    /**
     * 4 (IPv4) or 6 (IPv6)
     */
    family: number;

    /**
     * 密码
     */
    password: string;

    /**
     * db
     */
    db: number | 0;
}
```

### 队列配置
队列使用了 rabbitmq，`RabbitMQConfig.ts`
```typescript
export class RabbitMQConfig{
    /**
     * 连接主机
     */
    host: string
}
```

### 入口文件配置说明
打开`main.ts`文件
```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

`NestFactory` 创建一个app实例，监听3000端口。
```typescript
/**
 * Creates an instance of the NestApplication
 * @returns {Promise}
 */
create(module: any): Promise<INestApplication & INestExpressApplication>;
create(module: any, options: NestApplicationOptions): Promise<INestApplication & INestExpressApplication>;
create(module: any, httpServer: FastifyAdapter, options?: NestApplicationOptions): Promise<INestApplication & INestFastifyApplication>;
create(module: any, httpServer: HttpServer, options?: NestApplicationOptions): Promise<INestApplication & INestExpressApplication>;
create(module: any, httpServer: any, options?: NestApplicationOptions): Promise<INestApplication & INestExpressApplication>;
```
`create`方法有1-3参数，第一个是入口模块`AppModule`，第二个是一个`httpService`，如果要绑定`Express`中间件，需要传递`Express`实例。第三个全局配置：
- logger：打印日志
- cors：跨域配置
- bodyParser：`post`和`put`解析`body`中间件配置
- httpsOptions：`https`配置

`app`拥有以下方法：
`INestApplcation`下：
- init：初始化应用程序，直接调用此方法并非强制。
- use：注册中间件
- enableCors：启用CORS（跨域资源共享）
- listen：启动应用程序
- listenAsync：异步启动应用程序
- setGlobalPrefix：注册每个HTTP路由路径的前缀
- useWebSocketAdapter：安装将在网关内部使用的Ws是配置。使用时覆盖，默认`socket.io`库
- connectMicroservice：将微服务连接到`NestApplication`实例。将应用程序转换为混合实例
- getMicroservices：返回连接到`NestApplication`的微服务的数组
- getHttpServer：返回基础的本地HTTP服务器
- startAllMicroservices：启动所有连接的微服务
- startAllMicroservicesAsync：异步启动所有连接的微服务
- useGlobalFilters：将异常过滤器注册为全局过滤器（将在每个HTTP路由处理程序中使用）
- useGlobalPipes：将管道注册为全局管道（将在每个HTTP路由处理程序中使用）
- useGlobalGuards：将警卫注册为全局精卫（将在每个HTTP路由处理程序中使用）
- close：终止应用程序（包括`NestApplication`、网关、每个连接的微服务）

`INestExpressApplication`下
- set：围绕本地`express.set()`方法的包装函数
- engine：围绕本地`express.engine()`方法的包装函数
- disable：围绕本地`express.disable()`方法的包装函数
- useStaticAssets：为静态资源设置基础目录。围绕本地`express.static(path,options)`方法的包装函数。
- setBaseViewsDir：设置模板（视图）的基础目录。围绕本地`express.set('views',path)`方法的包装函数。
- setViewEngine：为模板（视图）设置视图引擎。围绕本地`express.set('view engine',engine)`方法的包装函数。

## 安装

```bash
$ npm install
```

## 初始化命令
```
# 工具库
npm install --save class-transformer class-validator cls-hooked log4js moment nest-schedule reflect-metadata
npm install --save-dev @types/cls-hooked @types/lodash @types/moment @types/webpack @types/webpack-node-externals tsconfig-paths
# ORM
npm install --save @nestjs/typeorm typeorm mysql
# Swagger
npm install --save @nestjs/swagger
# 调度
npm install --save nest-schedule
# 区块链
npm install --save web3x
```

## 运行

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# incremental rebuild (webpack)
$ npm run webpack
$ npm run start:hmr

# production mode
$ npm run start:prod
```

## 浏览
运行 `npm run start:dev` 成功后在浏览器打开 http://localhost:1008/swagge

## 测试

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 路径处理
### 修改tsconfig.json文件
新增`paths`属性，设置根路径。
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "noImplicitAny": false,
    "removeComments": true,
    "noLib": false,
    "allowSyntheticDefaultImports": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es6",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./src",
    "paths": {
      "@/*": [
        "./*"
      ]
    }
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "**/*.spec.ts"
  ]
}
```
### 修改webpack.config.js文件
新增别名解析，用于支持Webpack热更新路径。
```js
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: ['webpack/hot/poll?1000', './src/main.hmr.ts'],
  watch: true,
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: "development",
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    // 新增配置
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
};

```

### 安装tsconfig-paths
安装`tsconfig-paths`到开发依赖中。
```
npm install --save-dev tsconfig-paths
```
然后添加文件`tsconfig-paths-bootstrap.js`。
```js
const tsConfig = require('./tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');

const baseUrl = './dist'; //无论是绝对路径还是相对路径。如果是相对路径他会解析为当前工作目录
tsConfigPaths.register({
    baseUrl,
    paths: tsConfig.compilerOptions.paths
});
```
修改`pageage.json`文件的`scripts.start:prod`属性为`node -r ./tsconfig-paths-bootstrap.js dist/main.js`。
这样就支持打包后配置文件路径正常问题。