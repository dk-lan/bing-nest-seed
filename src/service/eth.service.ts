import { Injectable } from '@nestjs/common';
import { Result, StateCode, ETHAccount, HDWallet } from '@/bing';
import { PasswordDTO, ETHImportDTO } from '@/dto';

@Injectable()
export class ETHService {

    /**
     * 创建账户，返回地址和私钥
     */
    public async Create_PrivateKey(): Promise<any>{
        try{ 
            let account = await ETHAccount.createAccount();
            return {
                address:    account.address,
                privatekey: account.privateKey
            };
        } catch(error){
            return new Result<string>({
                code: StateCode.Error,
                message: error.toString()
            });
        }
    }

    /**
     * 创建账户，返回地址、助记词
     * @param dto 
     */
    public async Create_Mnemonic(): Promise<any>{
        try{ 
            let account                 = await HDWallet.generateETHAccount();
            let { address, mnemonic }   = account;
            return {
                address, 
                mnemonic
            }
        } catch(error){
            return new Result<string>({
                code: StateCode.Error,
                message: error.toString()
            });
        }
    }

    /**
     * 创建账户，返回地址、keystore
     * @param dto 
     */
    public async Create_Keystore(dto: PasswordDTO): Promise<any>{
        try{ 
            let account                     = await ETHAccount.createAccount();
            let { address, privateKey }     = account;
            let keystore                    = ETHAccount.getKeystore(privateKey, dto.password)
            return {
                address,
                keystore
            }
        } catch(error){
            return new Result<string>({
                code: StateCode.Error,
                message: error.toString()
            });
        }
    }

    /**
     * 通过对应类型和内容导入生成账户
     * @param dto 
     */
    public async Import(dto: ETHImportDTO): Promise<any>{
        try{ 
            let account = null;
            switch(dto.type){
                case 'privatekey':
                    account = await ETHAccount.getAccountByPrivateKey(dto.text);
                    break;
                case 'mnemonic': 
                    account = await HDWallet.getETHAccountByMnemonic(dto.text);
                    break;
                case 'keystore':
                    account = await ETHAccount.getAccountByKeystore(dto.text, dto.password);
                    break;
            }
            return account ? { address: account.address } : null;
        } catch(error){
            return new Result<string>({
                code: StateCode.Error,
                message: error.toString()
            });
        }
    }
}