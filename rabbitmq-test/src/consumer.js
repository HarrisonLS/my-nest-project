import * as amqp from "amqplib";

// const connect = await amqp.connect(`amqp://localhost:5672`);
// const channel = await connect.createChannel();

// const { queue } = await channel.assertQueue("aaa");
// channel.consume(
//   queue,
//   (msg) => {
//     console.log(msg.content.toString());
//   },
//   { noAck: true }
// );

const connect = await amqp.connect(`amqp://localhost:5670`);
const channel = await connect.createChannel();

const { queue } = await channel.assertQueue("lin");
channel.prefetch(3); //每次最多取回 3 条消息来处理

const currentTask = [];
channel.consume(
  queue,
  (msg) => {
    currentTask.push(msg);
    console.log("收到消息：", msg.content.toString());
  },
//   { noAck: false } // 不自动确认
);

setInterval(() => {
  const curMsg = currentTask.pop();
  channel.ack(curMsg);
}, 1000);
