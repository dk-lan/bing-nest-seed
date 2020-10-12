import * as fs from 'fs';
import { util } from '@/bing';

export class i18n{
    /**
     * 当前语言
     */
    private static langType: string;

    /**
     * 字典集
     */
    private static dics: object = null;

    /**
     * 初始化字典
     */
    static initDics(): void{
        if(util.serverconfig.languages){
            for(let item of util.serverconfig.languages){
                if(!this.dics){
                    this.dics = {};
                }
                this.dics[item] = this.dics[item] || {};
                let filename = `./i18n/${item}.json`;
                if(fs.existsSync(filename)){
                    let ini_str = fs.readFileSync(filename);
                    this.dics[item] = JSON.parse(ini_str.toString());
                }
            }
        }
        if(!this.langType && util.serverconfig.default_language){
            this.langType = util.serverconfig.default_language;
        }
    }

    /**
     * 获取所有字典集合
     */
    static getDics(): object{
        return this.dics;
    }

    /**
     * 覆盖重写对应语言的字典
     * @param _dics 
     * @param _lang 
     */
    static replaceDics(_dics: object, _lang: string): void{
        let filename = `./i18n/${_lang}.json`;
        fs.writeFileSync(filename, JSON.stringify(_dics));
        this.initDics();
    }

    /**
     * 获取对应的字典
     */
    static getDic(dkey: string, lang?: string): string{
        if(!this.dics){
            this.initDics();
        }
        if(!this.langType){
            this.langType = 'en-us';
        }
        let _langtype = lang || this.langType;
        let _string = this.dics && this.dics[_langtype] && this.dics[_langtype][dkey] ? this.dics[_langtype][dkey] : dkey;
        return _string;
    }
}