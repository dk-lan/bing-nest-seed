export class Prefix {

    /**
     * remove 0x
     * @param data 
     */
    public static remove_0x(data: string){
        if(!data){
            return ""
        }

        return data.replace(/^0x/, '')
    }

    /**
     * add 0x
     * @param data 
     */
    public static add_0x(data: string){
        if(!data){
            return "0x"
        }

        return ('0x' + data.replace(/^0x/, ''))   
    }
}