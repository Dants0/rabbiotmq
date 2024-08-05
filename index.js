"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const app = (0, fastify_1.default)();
app.get("/api/messages", (req, reply) => {
    reply.send({
        messages: ""
    });
});
app.listen({
    port: 3001
}).then(() => {
    console.log("listening on port 3001");
}).catch(() => {
    console.log("server error on initial port 3001");
});
