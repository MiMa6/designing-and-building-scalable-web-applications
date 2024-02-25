import { sql } from "./database.js";

const helloMessage = `Hello from server: ${Math.floor(10000 * Math.random())}`;

const handleGet = async (request) => {
  // Insert visit into database
  await sql`INSERT INTO visit_log (created_at) VALUES (NOW())`;

  // Get count of vsits
  const rows = await sql`SELECT COUNT(*) FROM visit_log`;
  await sql`COMMIT`;
  const count = rows[0].count;
  console.log(count);
  return new Response(`Number of visits: ${count}`);
};

const urlMapping = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/" }),
    fn: handleGet,
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

Deno.serve({ hostname: "0.0.0.0", port: 7777 }, handleRequest);
