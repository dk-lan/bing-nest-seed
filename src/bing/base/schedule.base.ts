// import { NestSchedule } from 'nest-schedule';
import { util } from '../index';

/**
 * 任务调度基类。
 * 参考地址：https://github.com/miaowing/nest-schedule
 */
export abstract class ScheduleBase /*extends NestSchedule*/ {
    /**
     * 操作库
     */
    protected util = util;

    // constructor() {
    //     super();
    // }
}