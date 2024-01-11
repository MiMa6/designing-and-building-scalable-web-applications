import { connect } from "https://deno.land/x/redis@v0.31.0/mod.ts";

const redis = await connect({
  hostname: "redis",
  port: 6379,
});
const handleRequest = async (request) => {
  console.log("moro");
  //const url = new URL(request.url);
  //if (url.pathname == "/publish") {
  //  client.publish("secret-channel", "hello!");
  //  return new Response("Data published!");
  //}
  //return new Response("Hello!");
};

const portConfig = { port: 7777, hostname: "0.0.0.0" };
Deno.serve(portConfig, handleRequest);
