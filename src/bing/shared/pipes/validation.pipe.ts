import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Warning } from '../../core/warning';

/**
 * 验证器管道
 */
@Injectable()
export class ValidationPipe implements PipeTransform<any>{
    /**
     * 转换
     * @param value 值
     * @param metadata 元数据 
     */
    async transform(value: any, metadata: ArgumentMetadata) {
        const { metatype } = metadata;
        /**
         * 不检查原生js的类型，因为可以写ValidationPiepe，就是要使用自定义的Dto类的属性去做参数类型检查。
         * 如果metatype是原生js类型，就直接返回原始参数，不做ValidationPipe的检查
         */
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        // 这里使用class-transformer的方法，将plain-javascript-object(像是JSON object)，转换成一个class的object.
        const object = plainToClass(metatype, value);
        // 在Dto，我们使用class-validator的验证装饰器，validate()会返回错误数组
        const errors = await validate(object);
        if (errors.length > 0) {
            const contraints = errors[0].constraints;
            const message = contraints[Object.keys(contraints)[0]];
            throw new Warning('params error：' + message);
        }
        return value;
    }

    /**
     * 校验是否未原生js类型
     * @param metatype 元数据
     */
    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find(type => metatype === type);
    }
}