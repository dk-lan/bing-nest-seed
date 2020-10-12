import * as crypto from 'crypto';
import { util } from '../index'

/**
 * Md5加密
 * @param value 值
 * @param encoding 字符编码 "utf8" | "ascii" | "latin1"
 */
export let md5 = (value: string, encoding: crypto.Utf8AsciiLatin1Encoding = 'utf8'): string => {
    if (util.helper.isEmpty(value)) {
        return '';
    }
    const hash = crypto.createHash('md5');
    hash.update(value, encoding);
    return hash.digest('hex'); //输出类型："latin1" | "hex" | "base64"
}

/**
 * Sha1加密
 * @param value 值
 * @param encoding 字符编码 "utf8" | "ascii" | "latin1"
 */
export let sha1 = (value: string, encoding: crypto.Utf8AsciiLatin1Encoding = 'utf8'): string => {
    if (util.helper.isEmpty(value)) {
        return '';
    }
    const hash = crypto.createHash('sha1');
    hash.update(value, encoding);
    return hash.digest('hex'); //输出类型："latin1" | "hex" | "base64"
}

/**
 * Sha256加密
 * @param value 值
 * @param encoding 字符编码 "utf8" | "ascii" | "latin1"
 */
export let sha256 = (value: string, encoding: crypto.Utf8AsciiLatin1Encoding = 'utf8'): string => {
    if (util.helper.isEmpty(value)) {
        return '';
    }
    const hash = crypto.createHash('sha256');
    hash.update(value, encoding);
    return hash.digest('hex'); //输出类型："latin1" | "hex" | "base64"
}

/**
 * Sha512加密
 * @param value 值
 * @param encoding 字符编码 "utf8" | "ascii" | "latin1"
 */
export let sha512 = (value: string, encoding: crypto.Utf8AsciiLatin1Encoding = 'utf8'): string => {
    if (util.helper.isEmpty(value)) {
        return '';
    }
    const hash = crypto.createHash('sha512');
    hash.update(value, encoding);
    return hash.digest('hex'); //输出类型："latin1" | "hex" | "base64"
}

/**
 * HmacMd5加密
 * @param value 值
 * @param key 密钥
 * @param encoding 字符编码 "utf8" | "ascii" | "latin1"
 */
export let hmacMd5 = (value: string, key: string, encoding: crypto.Utf8AsciiLatin1Encoding = 'utf8'): string => {
    if (util.helper.isEmpty(value)) {
        return '';
    }
    const hmac = crypto.createHmac('md5', key);
    hmac.update(value);
    return hmac.digest('hex'); //输出类型："latin1" | "hex" | "base64"
}

/**
 * HmacSha1加密
 * @param value 值
 * @param key 密钥
 * @param encoding 字符编码 "utf8" | "ascii" | "latin1"
 */
export let hmacSha1 = (value: string, key: string, encoding: crypto.Utf8AsciiLatin1Encoding = 'utf8'): string => {
    if (util.helper.isEmpty(value)) {
        return '';
    }
    const hmac = crypto.createHmac('sha1', key);
    hmac.update(value);
    return hmac.digest('hex'); //输出类型："latin1" | "hex" | "base64"
}

/**
 * HmacSha256加密
 * @param value 值
 * @param key 密钥
 * @param encoding 字符编码 "utf8" | "ascii" | "latin1"
 */
export let hmacSha256 = (value: string, key: string, encoding: crypto.Utf8AsciiLatin1Encoding = 'utf8'): string => {
    if (util.helper.isEmpty(value)) {
        return '';
    }
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(value);
    return hmac.digest('hex'); //输出类型："latin1" | "hex" | "base64"
}

/**
 * HmacSha512加密
 * @param value 值
 * @param key 密钥
 * @param encoding 字符编码 "utf8" | "ascii" | "latin1"
 */
export let hmacSha512 = (value: string, key: string, encoding: crypto.Utf8AsciiLatin1Encoding = 'utf8'): string => {
    if (util.helper.isEmpty(value)) {
        return '';
    }
    const hmac = crypto.createHmac('sha512', key);
    hmac.update(value);
    return hmac.digest('hex'); //输出类型："latin1" | "hex" | "base64"
}

/**
 * Aes加密
 * @param value 值
 * @param key 密钥
 * @param encoding 字符编码 "utf8" | "ascii" | "binary"
 */
export let aesEncrypt = (value: string, key: string, encoding: crypto.Utf8AsciiBinaryEncoding = 'utf8'): string => {
    if (util.helper.isEmpty(value)) {
        return '';
    }
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let crypted = cipher.update(value, encoding, 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

/**
 * Aes解密
 * @param value 值
 * @param key 密钥
 * @param encoding 字符编码 "utf8" | "ascii" | "binary"
 */
export let aesDecrypt = (value: string, key: string, encoding: crypto.Utf8AsciiBinaryEncoding = 'utf8'): string => {
    if (util.helper.isEmpty(value)) {
        return '';
    }
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let decrypt = decipher.update(value, 'hex', encoding);
    decrypt += decipher.final('utf8');
    return decrypt;
}

/**
 * Base64加密
 * @param value 值
 */
export let base64Encrypt = (value: string): string => {
    if (util.helper.isEmpty(value)) {
        return '';
    }
    return Buffer.from(value).toString('base64');
}

/**
 * Base64解密
 * @param value 值
 */
export let base64Decrypt = (value: string): string => {
    if (util.helper.isEmpty(value)) {
        return '';
    }
    return Buffer.from(value, 'base64').toString('utf8');
}