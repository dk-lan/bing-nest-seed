import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudServiceBase, Warning, Result, StateCode, util, cache, QueryParameter, PagerList } from '@/bing';
import { UserEntity, UserStatus } from '@/entity';
import { UserRepository } from '@/repository';
import { UserDTO } from '@/dto';
import { JWTBase } from '@/passport/jwt.base';

@Injectable()
export class UserService extends CrudServiceBase<UserEntity>{
    /**
     * 初始化 repository
     * @param repository 
     */
    constructor(@InjectRepository(UserRepository)  readonly userRepository:  UserRepository){
        super(userRepository);
    }

    /**
     * 登录
     * @param dto 
     */
    public async Login(dto: UserDTO): Promise<any>{
        try{ 
            let user = await this.userRepository.findOne({username: dto.username});
            if(!user){
                return new Result<string>({
                    langType: dto.langType,
                    code: StateCode.Fail,
                    dicKey: 'not_exists_user'
                });
            };

            if(user.password != util.encrypt.sha256(dto.password)){
                return new Result<string>({
                    langType: dto.langType,
                    code: StateCode.Fail,
                    dicKey: 'password_incorrect'
                });
            };

            if(user.status == UserStatus.locked){
                return new Result<string>({
                    langType: dto.langType,
                    code: StateCode.Fail,
                    dicKey: 'user_locked'
                });
            };

            let token = JWTBase.generateToken({username: user.username, status: user.status});
            return new Result<string>({
                data: token
            });
        } catch(error){
            return new Result<string>({
                code: StateCode.Error,
                message: error.toString()
            });
        }
    }

    /**
     * 注册
     */
    public async Register(dto: UserDTO): Promise<Result<string>>{
        try{ 
            let user = await this.userRepository.findOne({username: dto.username});
            if(user){
                return new Result<string>({
                    langType: dto.langType,
                    code: StateCode.Fail,
                    dicKey: 'duplicat_user'
                });
            };
            user = new UserEntity({
                username: dto.username,
                password: util.encrypt.sha256(dto.password)
            });

            await this.userRepository.save(user);
            let token = JWTBase.generateToken({username: dto.username, status: UserStatus.normal});
            return new Result<string>({
                langType: dto.langType,
                dicKey: 'regsiter_success',
                data: token
            });
        } catch(error){
            return new Result<string>({
                code: StateCode.Error,
                message: error.toString()
            });
        }
    }

    /**
     * 分页获取所有用户
     */
    public async Users(dto: QueryParameter): Promise<PagerList<UserEntity>>{
        return await this.userRepository.Users(dto);
    }

    /**
     * 用户验证
     * @param username 
     */
    public async ValidateUser(username): Promise<UserEntity>{
        let user = await this.userRepository.findOne({ username });
        if(!user || user.status == UserStatus.locked){
            return null;
        }

        return user;
    }
}