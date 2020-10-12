import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import modules from '@/module';
import entities from '@/entity';
import { util } from '@/bing';

util.serverconfig.mysql.entities = [...entities];

@Module({
    imports: [TypeOrmModule.forRoot(util.serverconfig.mysql), ...modules]
})

export class ApplicationModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void { }
}