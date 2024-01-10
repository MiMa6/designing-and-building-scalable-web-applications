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

const sockets = new Set();

const sendMessage = (event) => {
  setInterval(() => {
    const msg = `{"user": "${messages[i].name}", "message": "${messages[i].message}"}\n\n`
    
    sockets.forEach((socket) => socket.send(msg));
    i = (i + 1) % messages.length;
  }, 1000);
};

const handleRequest = async (request) => {
  if (request.headers.get("connection")?.toLowerCase() !== "upgrade") {
    return new Response("Make a webSocket upgrade request!", { status: 400 });
  }
  const { socket, response } = Deno.upgradeWebSocket(request);

  sockets.add(socket);

  socket.onclose = () => {
    sockets.delete(socket);
  };

  socket.onmessage = sendMessage;

  return response;
};

const portConfig = { port: 7777, hostname: "0.0.0.0" };
Deno.serve(portConfig, handleRequest);