import postgres from "https://deno.land/x/postgresjs@v3.4.2/mod.js";
import * as todoService from "./services/todoService.js";
import { cacheMethodCalls } from "./util/cacheUtil.js";

const sql = postgres({});
const SERVER_ID = crypto.randomUUID();
const cachedTodoService = cacheMethodCalls(todoService, ["addTodo", "deleteTodo"]);

const handleGetRoot = async (request) => {
  return new Response(`Hello from ${SERVER_ID}`);
};

const handleGetTodo = async (request, urlPatternResult) => {
  const id = urlPatternResult.pathname.groups.id;
  const todo = await cachedTodoService.getTodo(id);

  if (!todo) {
    console.log(`Todo with id ${id} not found`);
    return new Response("Not found", { status: 404 });
  }

  console.log(todo);
  return Response.json(todo);
};

const handleGetTodos = async (request) => {
  const todos = await cachedTodoService.getTodos();
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

  await cachedTodoService.addTodo(todo.item);
  console.log(todo);
  return new Response("OK", { status: 200 });
};

const handleDeleteTodos = async (request, urlPatternResult) => {
  const id = urlPatternResult.pathname.groups.id;
  const todo = await cachedTodoService.getTodo(id);

  if (!todo) {
    console.log(`Todo with id ${id} not found`);
    return new Response("Not found", { status: 404 });
  }

  await cachedTodoService.deleteTodo(id);
  console.log("Todo deleted succesfully!");
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
  {
    method: "DELETE",
    pattern: new URLPattern({ pathname: "/todos/:id" }),
    fn: handleDeleteTodos,
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
  try {
    return await mapping.fn(request, mappingResult);
  } catch (e) {
    console.log(e);
    return new Response(e.stack, { status: 500 });
  }
};

const portConfig = { port: 7777, hostname: "0.0.0.0" };
Deno.serve(portConfig, handleRequest);
