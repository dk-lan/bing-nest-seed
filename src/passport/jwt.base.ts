import * as jwt from 'jsonwebtoken';

export class JWTBase{
    /**
     * 盐值，尽可能复杂
     */
    public static readonly secret = 'jliejv904ja0F84lD93kf0s'

    /**
     * 生成 Token
     * @param tokenData 要生成 Token 的信息
     * @param expires Token 的有效时间，单位分钟，默认为 60 分钟
     */
    public static generateToken(tokenData: any, expires: number = 1): String{
        let expiresIn = 60 * expires;// token到期时间
        let user = tokenData;
        let token = jwt.sign(user, this.secret, { expiresIn });
        return token;
    }
}