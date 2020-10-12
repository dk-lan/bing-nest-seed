import * as amqp from 'amqplib';
import { Warning, util } from '@/bing';

export class RabbitMQ {
    //发布消息的加密公钥
    private routingKey  = 'nestjs.rabbitmq.example';   

    constructor(private exchangeName: string = 'fanout_mq'){}

    /**
     * 发送消息到队列
     * @param queueName 
     * @param data 
     */
    public async SendQueueMsg(queueName: string, data: string): Promise<boolean> {
        try{  
            let connection  = await amqp.connect(util.serverconfig.rabbitmq.host);
            let channel     = await connection.createChannel();
            await channel.assertQueue(queueName, {durable: true}) //定义队列 durable: true 表示持久化
            await channel.sendToQueue(queueName, Buffer.from(data), { persistent: true }) //将队列保存
            await channel.assertExchange(this.exchangeName, 'fanout', { durable: true }); //定义交换机            
            await channel.publish(this.exchangeName, this.routingKey, Buffer.from(data)); //发布消息给订阅者
            await channel.close();   
            await connection.close();
            return true
        } catch(e){
            throw new Warning('rabbitmq connet error', e)
        }
    }

    /**
     * 获取接收通道
     * @param queueName 队列名称
     */
    public async GetReceiveChannel(queueName: string): Promise<any>{
        try{
            let connection  = await amqp.connect(util.serverconfig.rabbitmq.host);
            let channel     = await connection.createChannel();
            channel.assertExchange(this.exchangeName, 'fanout', {durable: true}); //绑定队列到交换机
            await channel.assertQueue(queueName, {durable: true});   
            await channel.prefetch(1, false); //同一时刻服务器只会发一条消息给消费者            
            return channel
        } catch(e){
            throw new Warning('获取接收通道失败')
        }
    }

    /**
     * 队列消费者
     * @param queueName 
     * @param callback 
     */
    public async ReceiveQueueMsg(queueName: string, callback?: Function) {
        try{
            let channel = await this.GetReceiveChannel(queueName)

            //定义队列的消费者
            await channel.consume(queueName, async msg => {
                try{
                    channel.ack(msg);  
                    console.log('Consumer：', msg.content.toString())
                    callback && callback(msg.content.toString())
                }
                catch(error){
                    this.ReceiveQueueMsg(queueName, callback)
                } 
            }, { noAck: false })  
  
        } catch(e){
            setTimeout(() => {
                this.ReceiveQueueMsg(queueName, callback)
            }, 3000);
        }
    }
}