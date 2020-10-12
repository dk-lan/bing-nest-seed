import * as _ from 'lodash';
import * as moment from 'moment';
import { UUID } from './uuid';

/**
 * 是否未定义
 * @param value 值
 */
export let isUndefined = (value): boolean => {
    return typeof value === 'undefined';
};

/**
 * 是否字符串
 * @param value 值
 */
export let isString = (value): boolean => {
    return typeof value === 'string';
};

/**
 * 是否空值，当值为undefined、null、空对象、空字符串、空Guid时返回tue，其余返回false
 * @param value 值
 */
export let isEmpty = (value): boolean => {
    if (typeof value === 'number') {
        return false;
    }
    if (value && value.trim) {
        // tslint:disable-next-line:no-parameter-reassignment
        value = value.trim();
    }
    if (!value) {
        return true;
    }
    if (value === '00000000-0000-0000-0000-000000000000') {
        return true;
    }
    return _.isEmpty(value);
};

/**
 * 是否数字，字符串"1"返回true
 * @param value 值
 */
export let isNumber = (value): boolean => {
    return !isNaN(parseFloat(value)) && isFinite(value);
};

/**
 * 转换为数值
 * @param value 输入值
 * @param precision 数值精度，即小数位数，可选值为0-20
 * @param isTruncate 是否截断，传入true，则按精度截断，否则四舍五入
 */
export let toNumber = (value, precision?, isTruncate?: boolean) => {
    if (!isNumber(value)) {
        return 0;
    }
    // tslint:disable-next-line:no-parameter-reassignment
    value = value.toString();
    if (isEmpty(precision)) {
        return parseFloat(value);
    }
    if (isTruncate) {
        // tslint:disable-next-line:radix
        return parseFloat(value.substring(0, value.indexOf('.') + parseInt(precision) + 1));
    }
    return parseFloat(parseFloat(value).toFixed(precision));
};

/**
 * 转换为整数，四舍五入
 * @param value 输入值
 */
export let toInt = (value,) => {
    if (!isNumber(value)) {
        return 0;
    }
    return _.round(value);
};

/**
 * 转换为整数，向下保留
 * @param value 输入值
 */
export let floor=(value,)=>{
    if(!isNumber(value)){
        return 0;
    }
    return _.floor(value);
}

/**
 * 转换为字符串
 * @param value 输入值
 */
export let toString = (value): string => {
    return _.toString(value).trim();
};

/**
 * 转换为布尔值
 * @param value 输入值
 */
export let toBool = (value): boolean => {
    if (value === true) {
        return true;
    }
    const strValue = toString(value).toLowerCase();
    if (strValue === '1') {
        return true;
    }
    if (strValue === 'true') {
        return true;
    }
    if (strValue === '是') {
        return true;
    }
    if (strValue === 'yes') {
        return true;
    }
    if (strValue === 'ok') {
        return true;
    }
    return false;
};

/**
 * 是否数组
 * @param value 值
 */
export let isArray = (value): boolean => {
    return Array.isArray(value);
};

/**
 * 是否空数组，undefined、null返回false，[]返回true
 * @param value 值
 */
export let isEmptyArray = (value): boolean => {
    return isArray(value) && value.length === 0;
};

/**
 * 获取数组中第一个
 * @param array 数组
 */
export let first = <T>(array): T => {
    return _.first<T>(array);
};

/**
 * 获取数组中最后一个
 * @param array 数组
 */
export let last = <T>(array): T => {
    return _.last<T>(array);
};

/**
 * 转换为json字符串
 * @param value 值
 */
export let toJson = (value): string => {
    return JSON.stringify(value);
};

/**
 * json字符串转换为对象
 * @param json json字符串
 */
export let toObjectFromJson = <T>(json: string): T => {
    return JSON.parse(json);
};

/**
 * 复制对象
 * @param obj 对象
 */
export let clone = <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
};

/**
 * 创建唯一标识
 */
export let uuid = (): string => {
    return UUID.UUID();
};

/**
 * 是否有效日期
 * @param date 日期
 */
export let isValidDate = (date): boolean => {
    return moment(getValidDate(date)).isValid();
};

/**
 * 获取有效的日期字符串，对无效日期补全前导0，不支持毫秒，
 * 范例：2000-1-1 1: 2: 3，返回2000-01-01 01:02:03
 * @param date 日期
 */
export let getValidDate = (date) => {
    if (!date) {
        return date;
    }
    if (typeof date !== 'string') {
        return date;
    }
    if (date.indexOf('-') <= 0) {
        return date;
    }
    const regex = /(\d{4})-(\d{1,2})-(\d{1,2})(?:(?:\s+)(\d{1,2}):(\d{1,2}):?(\d{1,2})?)?/;
    if (!regex.test(date)) {
        return date;
    }
    const dateSegment = date.match(regex);
    if (!dateSegment) {
        return date;
    }
    const year = dateSegment[1];
    let month = dateSegment[2];
    let day = dateSegment[3];
    let hour = dateSegment[4];
    let minute = dateSegment[5];
    let second = dateSegment[6];
    month = month.length === 1 ? `0${month}` : month;
    day = day.length === 1 ? `0${day}` : day;
    let result = `${year}-${month}-${day}`;
    if (hour && minute) {
        hour = hour.length === 1 ? `0${hour}` : hour;
        minute = minute.length === 1 ? `0${minute}` : minute;
        result += ` ${hour}:${minute}`;
    }
    if (second) {
        second = second.length === 1 ? `0${second}` : second;
        result += `:${second}`;
    }
    return result;
};

/**
 * 转换为日期
 * @param date 日期，字符串日期范例：2001-01-01
 */
export let toDate = (date): Date => {
    return moment(getValidDate(date)).toDate();
};

/**
 *  格式化日期
 * @param datetime 日期
 * @param format 格式化字符串，范例：YYYY-MM-DD,可选值：(注意：区分大小写)
 * (1) 年: YYYY
 * (2) 月: MM
 * (3) 日: DD
 * (4) 时: HH
 * (5) 分: mm
 * (6) 秒: ss
 * (7) 毫秒: SSS
 */
export let formatDate = (datetime, format: string): string => {
    const date = moment(getValidDate(datetime));
    if (!date.isValid()) {
        return '';
    }
    return date.format(format);
};

/**
 * 通用泛型转换
 * @param value 值
 */
export let to = <T>(value): T => {
    return value as T;
};

/**
 * 从数组中移除子集
 * @param source 源数组
 * @param predicate 条件
 */
export let remove = <T>(source: Array<T>, predicate: (value: T) => boolean): Array<T> => {
    return _.remove(source, t => predicate(t));
};

/**
 * 添加项到数组
 * @param source 源数组
 * @param items 项
 */
export let addToArray = <T>(source: Array<T>, items): Array<T> => {
    if (isEmpty(items)) {
        return source;
    }
    if (!items.length) {
        source.push(items);
        return source;
    }
    items.forEarch(item => {
        if (isEmpty(item)) {
            return;
        }
        source.push(item);
    });
    return source;
};

/**
 * 清空数组
 * @param array 数组
 */
export let clear = (array): void => {
    if (array && array.length) {
        array.length = 0;
    }
};

/**
 * 泛型集合转换
 * @param input 以逗号分隔的元素集合字符串，范例：1,2
 */
export let toList = <T>(input: string): T[] => {
    const result = new Array<T>();
    if (!input) {
        return result;
    }
    const array = input.split(',');
    array.forEach(value => {
        if (!value) {
            return;
        }
        result.push(to<T>(value));
    });
    return result;
};

/**
 * 获取差集
 * @param source 源集合
 * @param target 目标集合
 * @param property 比较属性
 */
export let except = <T>(source: T[], target: T[], property?: (t: T) => any): T[] => {
    return _.differenceBy(getArray(source), getArray(target), property);
};

/**
 * 获取差集
 * @param source 源集合
 * @param target 目标集合
 * @param comparator 比较器
 */
export let exceptWith = <T>(source: T[], target: T[], comparator?: (s, t) => boolean): T[] => {
    return _.differenceWith(getArray(source), getArray(target), comparator);
};

/**
 * 获取集合
 * @param array 数组
 */
function getArray<T>(array): T[] {
    const list = new Array<T>();
    if (array.length === undefined) {
        list.push(array);
        return list;
    }
    return array as T[];
}

/**
 * 合并集合
 * @param source 源集合
 * @param target 目标集合
 */
export let concat = <T>(source: T[], target: T[]) => {
    return _.concat(source, target);
};

/**
 * 分组
 * @param source 集合
 * @param property 分组属性
 */
export let groupBy = <T>(source: T[], property?: (t: T) => any): Map<string, T[]> => {
    const groups = _.groupBy(source, property);
    const result = new Map<string, T[]>();
    for (const key in groups) {
        if (!key) {
            continue;
        }
        result.set(key, groups[key].map(t => t as any as T));
    }
    return result;
};

/**
 * 去重复
 * @param source 源集合
 * @param property 属性
 */
export let distinct = <T>(source: T[], property?: (t: T) => any) => {
    return _.uniqBy(source, property);
};

/**
 * 随机数
 * @param lower 最小值
 * @param upper 最大值
 * @param floating 是否返回小数
 */
export let random = (lower: number = 0, upper: number = 1, floating: boolean = false): number => {
    return _.random(lower, upper, floating);
};

/**
 * 获取当前日期以及前后7、15、30天或某一范围的日期
 * @param range 时间范围。整数=往后天数，负数=历史天数
 * @param type 返回类型。one:字符串(返回一个指定的日期)，more:数组(返回排序号的时间范围)
 */
export let getRangeDate = (range: number, type?: string): string | Array<string> => {
    // tslint:disable-next-line:no-shadowed-variable
    const formatDate = (time: any) => {
        // 格式化日期，获取今天的日期
        const currentDate = new Date(time);
        const year: number = currentDate.getFullYear();
        const month: any = (currentDate.getMonth() + 1) < 10 ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);
        const day: any = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate();
        return `${year}-${month}-${day}`;
    };

    const resultArray: Array<string> = [];
    let changeDate: string;
    if (range) {
        if (type) {
            if (type === 'one') {
                changeDate = formatDate(new Date().getTime() + (1000 * 3600 * 24 * range));
                return changeDate;
            }
            if (type === 'more') {
                if (range < 0) {
                    for (let i = Math.abs(range); i >= 0; i--) {
                        resultArray.push(formatDate(new Date().getTime() + (-1000 * 3600 * 24 * i)));
                    }
                    return resultArray;
                } else {
                    for (let i = 1; i <= range; i++) {
                        resultArray.push(formatDate(new Date().getTime() + (1000 * 3600 * 24 * i)));
                    }
                    return resultArray;
                }
            }
        }
    } else {
        changeDate = formatDate(new Date().getTime() + (1000 * 3600 * 24 * range));
        return changeDate;
    }
};

/**
 * 获取当前UTC日期以及前后7、15、30天或某一范围的日期
 * @param range 时间范围。整数=往后天数，负数=历史天数
 * @param type 返回类型。one:字符串(返回一个指定的日期)，more:数组(返回排序号的时间范围)
 */
export let getRangeDateUtc = (range: number, type?: string): string | Array<string> => {
    // tslint:disable-next-line:no-shadowed-variable
    const formatDate = (time: any) => {
        // 格式化日期，获取今天的日期
        const currentDate = moment(time).utc().toDate();
        const year: number = currentDate.getFullYear();
        const month: any = (currentDate.getMonth() + 1) < 10 ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);
        const day: any = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate();
        return `${year}-${month}-${day}`;
    };

    const resultArray: Array<string> = [];
    let changeDate: string;
    if (range) {
        if (type) {
            if (type === 'one') {
                changeDate = formatDate(moment().utc().valueOf() + (1000 * 3600 * 24 * range));
                return changeDate;
            }
            if (type === 'more') {
                if (range < 0) {
                    for (let i = Math.abs(range); i >= 0; i--) {
                        resultArray.push(formatDate(moment().utc().valueOf() + (-1000 * 3600 * 24 * i)));
                    }
                    return resultArray;
                } else {
                    for (let i = 1; i <= range; i++) {
                        resultArray.push(formatDate(moment().utc().valueOf() + (1000 * 3600 * 24 * i)));
                    }
                    return resultArray;
                }
            }
        }
    } else {
        changeDate = formatDate(moment().utc().valueOf() + (1000 * 3600 * 24 * range));
        return changeDate;
    }
}