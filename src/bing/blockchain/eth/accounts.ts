import * as bip39 from 'bip39';
import { hdkey } from 'ethereumjs-wallet';
import { Provider } from './provider';
import { Prefix } from '@/bing/common/prefix';

export class ETHAccount {
    
    /**
     * web3 引擎
     */
    private static web3 = Provider.httpProvider();
    
    /**
     * 生成新的账户（不带助记词）
     */
    public static createAccount(): Promise<any>{
        let account = this.web3.eth.accounts.create(this.web3.utils.randomHex(32));
        return account;
    }

    /**
     * 根据私钥生成 keystore
     * @param pkey 私钥
     * @param passowrd 
     */
    public static getKeystore(pkey: string, passowrd: string): Promise<any>{
        let keystore = this.web3.eth.accounts.encrypt(pkey, passowrd);
        return keystore;
    }

    /**
     * 根据私钥获得账户信息
     * @param pkey 私钥
     */
    public static getAccountByPrivateKey(pkey: string): Promise<any>{
        pkey = Prefix.add_0x(pkey);
        let account = this.web3.eth.accounts.privateKeyToAccount(pkey);
        return account;
    }

    /**
     * 根据 keystore 获得账户信息
     * @param keystore 
     * @param password keystore 密码
     */
    public static getAccountByKeystore(keystore: string, password: string): Promise<any>{
        try{
            let account = this.web3.eth.accounts.decrypt(keystore, password);
            return account;
        } catch(error){
            throw 'passowrd incorrect';
        }
    }    
}