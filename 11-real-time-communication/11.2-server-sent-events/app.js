const SERVER_ID = crypto.randomUUID();

const messages = [
  {
    name: "Bob",
    message: "Margaretta",
  },
  {
    name: "Margaretta",
    message: "Hi",
  },
  {
    name: "Jussi",
    message: "Hmm",
  },
  {
    name: "Kalle",
    message: "Bye!",
  },
  {
    name: "Hanna",
    message: "Babe",
  },
];

const encoder = new TextEncoder();
let i = 0;

let controllers = new Set();

setInterval(() => {
  const msg = encoder.encode(`data: {"user": "${messages[i].name}", "message": "${messages[i].message}"}\n\n`);
  controllers.forEach((controller) => controller.enqueue(msg));
  i = (i + 1) % messages.length;
}, 1000);


const handleGetRoot = async (request) => {
  let controller;

  const body = new ReadableStream({
    start(c) {
      console.log("Stream start")
      controller = c;
      controllers.add(controller);
    },
    cancel() {
      controllers.delete(controller);
    },
  });


  return new Response(body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Access-Control-Allow-Origin": "*",
      Connection: "keep-alive",
    },
  });
};

const urlMapping = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/" }),
    fn: handleGetRoot,
  }
];

const handleRequest = async (request) => {
  const mapping = urlMapping.find(
    (um) => um.method === request.method && um.pattern.test(request.url)
  );

  if (!mapping) {
    return new Response("Not found", { status: 404 });
  }

  const mappingResult = mapping.pattern.exec(request.url);
  try {
    return await mapping.fn(request, mappingResult);
  } catch (e) {
    console.log(e);
    return new Response(e.stack, { status: 500 });
  }
};

const portConfig = { port: 7777, hostname: "0.0.0.0" };
Deno.serve(portConfig, handleRequest);