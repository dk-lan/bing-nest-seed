import { ApiModelProperty } from '@nestjs/swagger';
import { lang } from 'moment';

/**
 * 标识
 */
export interface IKey {
    /**
     * 标识
     */
    indexid: number;
}

/**
 * 乐观锁
 */
export interface IVersion {
    /**
     * 版本号
     */
    version: string;
}

/**
 * 逻辑删除
 */
export interface IDelete {
    /**
     * 是否删除
     */
    isDeleted: boolean;
}

/**
 * 视图模型
 */
export class ViewModel implements IKey {
    /**
     * 标识
     */
    @ApiModelProperty({ description: '标识' })
    indexid: number;
}

/**
 * api 多语言参数
 */
export class Lang {
    @ApiModelProperty({description: "语言类型 en-us, zh-cn", required: false})
    langType: string
}


/**
 * 查询参数
 */
export class QueryParameter extends Lang {

    @ApiModelProperty({ description: '页索引', default: 1, required: true })
    page: number;

    @ApiModelProperty({ description: '每页显示行数', default: 10, required: true })
    pageLimit: number;

    @ApiModelProperty({ description: '排序字段' , required: false})
    orderword: string;

    @ApiModelProperty({ description: '1 表示升序 0 表示降序' , required: false})
    order: number;
}