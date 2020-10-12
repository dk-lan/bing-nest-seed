import { Module } from '@nestjs/common';
import { ETHService } from '@/service';
import { ETHController } from '@/controller';

@Module({
    controllers: [ETHController],
    providers: [ETHService]
})
export class ETHModule {}