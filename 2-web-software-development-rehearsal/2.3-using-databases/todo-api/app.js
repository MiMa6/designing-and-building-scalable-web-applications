import postgres from "https://deno.land/x/postgresjs@v3.4.2/mod.js";
import { load } from "https://deno.land/std@0.210.0/dotenv/mod.ts";
const env = await load();

const portConfig = { port: 7777 };

const sql = postgres({
  host: env["DB_HOST"],
  database: env["DB_DATABASE"],
  username: env["DB_USERNAME"],
  password: env["DB_PASSWORD"],
  port: env["PORT"],
  max: 2,
});

const handleGetRoot = async (request) => {
  return new Response("Hello world at root!");
};

const handleGetTodo = async (request, urlPatternResult) => {
  const id = urlPatternResult.pathname.groups.id;
  const todo = await sql`SELECT * FROM todos WHERE id = ${id}`;
  if (todo.length < 1) {
    return new Response("Not found", { status: 404 });
  }
  console.log(todo.length);
  console.log(todo);
  return Response.json(todo[0]);
};

const handleGetTodos = async (request) => {
  const todos = await sql`SELECT * FROM todos`;
  console.log(todos);
  return Response.json(todos);
};

const handlePostTodos = async (request) => {
  let todo;
  try {
    todo = await request.json();
  } catch (error) {
    return new Response(error.message, { status: 400 });
  }

  if (todo.item === "") {
    return new Response("Item is empty", { status: 400 });
  }

  await sql`INSERT INTO todos (item) VALUES (${todo.item})`;
  console.log(todo);
  return new Response("OK", { status: 200 });
};

const urlMapping = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/todos/:id" }),
    fn: handleGetTodo,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/todos" }),
    fn: handleGetTodos,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/todos" }),
    fn: handlePostTodos,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/" }),
    fn: handleGetRoot,
  },
];

const handleRequest = async (request) => {
  const mapping = urlMapping.find(
    (um) => um.method === request.method && um.pattern.test(request.url)
  );

  if (!mapping) {
    return new Response("Not found", { status: 404 });
  }

  const mappingResult = mapping.pattern.exec(request.url);
  return await mapping.fn(request, mappingResult);
};
Deno.serve(portConfig, handleRequest);
