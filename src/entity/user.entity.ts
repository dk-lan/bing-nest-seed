import { Entity, Column, PrimaryColumn } from 'typeorm'
import { IKey } from '@/bing'
import { Exclude } from 'class-transformer';

@Entity("t_user")
export class UserEntity implements IKey{

    @PrimaryColumn({name: "indexid"})
    indexid: number;

    /**
     * 登录的用户名
     */
    @Column()
    username: string;

    /**
     * 密码
     */
    @Column()
    @Exclude()
    password: string;

    /**
     * 用户状态
     */
    @Column()
    status: UserStatus | number = 1;

    /**
     * 创建时间
     */
    @Column()
    createtime: Date;

    /**
     * 修改时间
     */
    @Column()
    updatetime: Date;

    constructor(partial?: Partial<UserEntity>){
        if(partial){
            Object.assign(this, partial)
        }
    }
}

export enum UserStatus {
    normal  = 1, //正常
    locked  = 0, //锁死
}