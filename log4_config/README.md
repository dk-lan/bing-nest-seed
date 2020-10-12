# log4js 应用
## 项目引用
`npm install log4js`

## 配置说明
- pattern：占位符，紧跟在`filename`后面。占位符说明如下：
    - yy：2位年份
    - yyyy：4位年份
    - MM：2位月份
    - dd：2位日期
    - hh：2位小时数，按24小时制
    - mm：2位分钟数
    - ss：2位秒数
    - SSS：3位的毫秒数
    - O：时区，大写字符0，占位符输出的结果为+0800

## 输出日志
```
import { configure, getLogger } from 'log4js';
// 注：配置里的日志目录要先创建，才能加载配置，不然会出异常
configure('./config/log4js.json');
// 获取日志记录器
const logger = getLogger();// getLogger('default')
logger.debug('测试一下调试信息');
```