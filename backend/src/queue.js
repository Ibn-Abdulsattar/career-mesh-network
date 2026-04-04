import { Queue } from "bullmq";

// import { Queue } from "bullmq";
// import IORedis from "ioredis";

// const connection = new IORedis();

 const mediaQueue = new Queue("media-filtering", {
  connection: { port: 6379, host: "localhost"},
});

export default mediaQueue;
