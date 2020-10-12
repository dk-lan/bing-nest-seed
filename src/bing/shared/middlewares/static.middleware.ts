import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 静态目录 中间件
 */
@Injectable()
export class StaticMiddleware implements NestMiddleware {
    async resolve(...args: any[]): Promise<MiddlewareFunction> {
        console.log('执行静态目录中间件');
        return async (req: any, res: any, next: any) => {
            console.log('执行静态目录中间件0001');
            // const fileNameArray = await readDirFunc(path.resolve('./src/public'));
            const fileNameArray = await readDirFunc(path.resolve('./download'));
            let targetFile: string | undefined;
            for (const filename of fileNameArray) {
                if ('/' + filename === req.url) {
                    targetFile = req.url;
                    break;
                }
            }
            if (!targetFile) {
                next();
            } else {
                res.header('Content-Type', 'text/html');
                // return res.sendFile(path.resolve(`./src/public${targetFile}`));
                return res.sendFile(path.resolve(`./download${targetFile}`));
            }
        };
    }
}

/**
 * 读取目录
 * @param dirPath 目录路径
 */
const readDirFunc = (dirPath: string): Promise<string[]> => {
    return new Promise<string[]>((resolve, reject) => {
        fs.readdir(dirPath, (err: Error, files: string[]) => {
            if (err) {
                throw err;
            }
            resolve(files);
        });
    });
};