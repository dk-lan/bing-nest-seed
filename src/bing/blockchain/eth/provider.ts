const Web3 = require("web3");
import { util } from '@/bing';

export class Provider{
    private static web3 = null;
    private static web3_soket = null;

    public static httpProvider(url?: string){
        try{
            if(!this.web3){
                this.web3 = new Web3(new Web3.providers.HttpProvider(url || util.serverconfig.eth_http));
            }
            return this.web3;
        } catch(error){
            console.log('[HttpProvider Error]');
            throw error;
        }
    }

    public static wsProvider(url?: string){
        try{
            if(!this.web3_soket){
                this.web3_soket = new Web3(new Web3.providers.WebsocketProvider(url || util.serverconfig.eth_socket));
                const provider = this.web3.currentProvider;
                provider.on('error', e => this.web3.setProvider(url || util.serverconfig.eth_socket));
                provider.on('close', e => this.web3.setProvider(url || util.serverconfig.eth_socket));
            }
            return this.web3_soket;
        } catch(error){
            console.log('[WsProvider Error]');
            throw error;
        }
    }
}