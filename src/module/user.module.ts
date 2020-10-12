import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@/service';
import { UserRepository } from '@/repository';
import { UserController } from '@/controller'
import { JwtStrategy } from '@/passport/jwt.strategy'


@Module({
    imports: [TypeOrmModule.forFeature([UserRepository])],
    controllers: [UserController],
    providers: [UserService, JwtStrategy]
})
export class UserModule {}