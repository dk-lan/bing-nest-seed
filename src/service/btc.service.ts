import { Injectable } from '@nestjs/common';
import { Result, StateCode, util, HDWallet } from '@/bing';
import * as CoinKey from 'coinkey';
import * as ci from 'coininfo';
import { BTCImportDTO } from '@/dto';

@Injectable()
export class BTCService {

    /**
     * 创建账户，返回地址和私钥
     * @param dto 
     */
    public async Create(): Promise<any>{
        try{ 
            let ck          = CoinKey.createRandom(ci('NMC'));
            let key         = new CoinKey(ck.key);
            let paddress    = key.publicAddress;
            let pkey        = key.privateWif;
            return {
                address: paddress,
                privateKey: pkey
            };
        } catch(error){
            return new Result<string>({
                code: StateCode.Error,
                message: error.toString()
            });
        }
    }

    /**
     * 通过导入私钥生成账户
     * @param dto 
     */
    public async Import(dto: BTCImportDTO): Promise<any>{
        try{ 
            let ck      = CoinKey.fromWif(dto.privateKey);
            let address = ck.publicAddress;
            return {
                address
            };
        } catch(error){
            return new Result<string>({
                code: StateCode.Error,
                message: error.toString()
            });
        }
    }
}