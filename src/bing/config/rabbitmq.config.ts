export class RabbitMQConfig{
    /**
     * 连接主机
     */
    host: string;

    constructor(partial: Partial<RabbitMQConfig>){
        Object.assign(this, partial);
    }
}