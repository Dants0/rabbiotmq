"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.am = void 0;
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
exports.am = callback_api_1.default.connect('amqp://user:password@localhost', (error0, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }
        let q = 'Hello';
        channel.assertQueue(q, {
            durable: false
        });
        console.log("[*] Waiting for messages in %s. To exit press CTRL+C", q);
        channel.consume(q, (msg) => {
            if (msg !== null) {
                // console.log("[X] Received %s", msg.content.toString());
                return msg.content.toString();
            }
        }, {
            noAck: true
        });
    });
});
