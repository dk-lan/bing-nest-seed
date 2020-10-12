/**
 * 数字
 */
const numbers = '0123456789';
/**
 * 字母
 */
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
/**
 * 特殊字符
 */
const specials = '~!@#$%^*()_+-=[]{}|;:,./<>?';

/**
 * 生成随机字符串
 * @param length 字符串长度
 * @param options 字符串配置
 */
export let random = (length: number, options?: stringRandom.Options | string | true): string => {
    length || (length = 8);
    options || (options = {});

    let chars = '';
    let result = '';

    if (options === true) {
        chars = `${numbers}${letters}${specials}`;
    } else if (typeof options === 'string') {
        chars = options;
    } else {
        if (options.number !== false) {
            chars += (typeof options.number === 'string') ? options.number : numbers;
        }
        if (options.letters !== false) {
            chars += (typeof options.letters === 'string') ? options.letters : letters;
        }
        if (options.specials) {
            chars += (typeof options.specials === 'string') ? options.specials : specials;
        }
    }
    while (length > 0) {
        length--;
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

declare namespace stringRandom {
    /**
     * 选项
     */
    interface Options {
        /**
         * 特殊字符
         */
        specials?: string | boolean;
        /**
         * 数字
         */
        number?: string | boolean;
        /**
         * 字符
         */
        letters?: string | boolean;
    }
}
