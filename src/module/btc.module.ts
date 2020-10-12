import { Module } from '@nestjs/common';
import { BTCService } from '@/service';
import { BTCController } from '@/controller';

@Module({
    controllers: [BTCController],
    providers: [BTCService]
})
export class BTCModule {}