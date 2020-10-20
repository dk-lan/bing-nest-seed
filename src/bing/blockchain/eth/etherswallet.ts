import { ethers } from 'ethers';

export class EthersWallet { 

    /**
     * 生成一个新的助记词
     */
    public static async getNewMnemonic(): Promise<string>{
        return ethers.Wallet.createRandom().mnemonic.phrase;
    }

    /**
     * 生成新的账户
     */
    public static createAccount(): any{
        let wallet      = ethers.Wallet.createRandom();
        let publicKey   = wallet._signingKey().publicKey;
        return {
            address: wallet.address,
            mnemonic: wallet.mnemonic.phrase,
            privatekey: wallet.privateKey
        }
    }

    /**
     * 生成带 keystore 的账户
     * @param pkey 私钥
     * @param passowrd 
     */
    public static async createAccount_Keystore(passowrd: string): Promise<any>{
        let wallet      = ethers.Wallet.createRandom();
        let publicKey   = wallet._signingKey().publicKey;
        let keystore    = await wallet.encrypt(passowrd);
        return {
            address: wallet.address,
            mnemonic: wallet.mnemonic.phrase,
            privatekey: wallet.privateKey,
            keystore
        }
    }

    /**
     * 根据私钥获得账户信息
     * @param pkey 私钥
     */
    public static getAccountByPrivateKey(pkey: string): any{
        let wallet = new ethers.Wallet(pkey);
        return {
            address: wallet.address,
            privatekey: wallet.privateKey
        }
    }

    /**
     * 根据助记词获得账户信息
     * @param pkey 私钥
     */
    public static getAccountByMnemonic(mnemonic: string): any{
        let wallet = ethers.Wallet.fromMnemonic(mnemonic);
        return {
            address: wallet.address,
            mnemonic: wallet.mnemonic.phrase,
            privatekey: wallet.privateKey
        }
    }

    /**
     * 根据 keystore 获得账户信息
     * @param keystore 
     * @param password keystore 密码
     */
    public static getAccountByKeystore(keystore: string, password: string): any{
        try{
            let wallet = ethers.Wallet.fromEncryptedJsonSync(keystore, password);
            return {
                address: wallet.address,
                mnemonic: wallet.mnemonic.phrase,
                privatekey: wallet.privateKey
            }
        } catch(error){
            throw 'passowrd incorrect';
        }
    } 
}