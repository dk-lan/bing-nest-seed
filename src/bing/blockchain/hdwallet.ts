import * as bip39 from 'bip39';
import { hdkey } from 'ethereumjs-wallet';
import * as bitcoin from 'bitcoinjs-lib';
import * as bip32 from 'bip32';
import { Prefix } from '@/bing/common/prefix';

export class HDWallet { 
    
    /**
     * 生成一个新的助记词
     */
    public static async getNewMnemonic(): Promise<string>{
        return bip39.generateMnemonic();
    }

    /**
     * 生成 ETH 新的 HD 账户(带助记词)
     */
    public static async generateETHAccount(): Promise<any>{
        let mnemonic    = bip39.generateMnemonic();
        let seed        = await bip39.mnemonicToSeed(mnemonic);
        let hdwallet    = hdkey.fromMasterSeed(seed);
        let wallet      = hdwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
        let address     = Prefix.add_0x(wallet.getAddress().toString('hex'));
        let privateKey  = wallet.getPrivateKey().toString('hex');
        return {
            address,
            mnemonic,
            privateKey
        }
    }  
   
    /**
     * 生成 BTC 新的 HD 账户(带助记词)
     */
    public static async generateBTCAccount(): Promise<any>{
        const mnemonic      = bip39.generateMnemonic();
        const network       = bitcoin.networks.bitcoin;
        const seed          = await bip39.mnemonicToSeed(mnemonic);
        const hdwallet      = bip32.fromSeed(seed,network);
        const path          = "m/44'/0'/0'/0/0";
        const keyPair       = hdwallet.derivePath(path);
        const privatekey    = keyPair.toWIF();
        const publicKey     = keyPair.publicKey.toString("hex");
        let address         = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey , network:network});
        return {
            address,
            mnemonic,
            privatekey
        }
    }

    /**
     * 根据助记词获得BTC账户信息
     * @param mnemonic 助记词
     */
    public static async getETHAccountByMnemonic(mnemonic: string): Promise<any>{
        let seed        = await bip39.mnemonicToSeed(mnemonic);
        let hdwallet    = hdkey.fromMasterSeed(seed);
        let wallet      = hdwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
        let address     = Prefix.add_0x(wallet.getAddress().toString('hex'));
        let privateKey  = wallet.getPrivateKey().toString('hex');
        return {
            address,
            mnemonic,
            privateKey
        }
    }

    /**
     * 根据助记词获得BTC账户信息
     * @param mnemonic 助记词
     */
    public static async getBTCAccountByMnemonic(mnemonic: string): Promise<any>{
        const network       = bitcoin.networks.bitcoin;
        const seed          = await bip39.mnemonicToSeed(mnemonic);
        const hdwallet      = bip32.fromSeed(seed,network);
        const path          = "m/44'/0'/0'/0/0";
        const keyPair       = hdwallet.derivePath(path);
        const privatekey    = keyPair.toWIF();
        const publicKey     = keyPair.publicKey.toString("hex");
        let address         = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey , network:network});
        return {
            address,
            mnemonic,
            privatekey
        }
    }
}