import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { BingStartup, util } from '@/bing';

async function bootstrap() {
    
    util.log.replaceConsole();
    
    const app = await NestFactory.create(ApplicationModule);
    
    BingStartup.configSwagger(app);

    BingStartup.startup(app);

    await app.listen(util.serverconfig.port);
}
bootstrap();