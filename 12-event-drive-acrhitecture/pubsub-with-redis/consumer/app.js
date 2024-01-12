import { connect } from "../deps.js";

const client = await connect({
  hostname: "redis",
  port: 6379,
});

await client.connect();
await client.subscribe("secret-channel", (message, channel) =>
  console.log(message, channel)
);
