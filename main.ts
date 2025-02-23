import { assertEquals } from "@std/assert";
import httpProxy from "http-proxy";

const proxy = httpProxy.createProxyServer({
  target: "http://localhost:8000",
});

Deno.serve(async (req) => {
  console.log("Incoming request on server: ", req.method, req.url);
  const body = await req.text();
  return new Response(JSON.stringify({ echo: body }));
});

proxy.listen(8080);

console.group("Server");
console.group("POST on server with payload");
try {
  const res = await fetch("http://localhost:8000", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ "hello": "world" }),
    signal: AbortSignal.timeout(1000),
  });
  assertEquals(res.status, 200);
  console.log("OK");
} catch (e) {
  console.error("error!", e!.toString());
}
console.groupEnd();

console.group("DELETE on server without payload");
try {
  const res = await fetch("http://localhost:8000", {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    signal: AbortSignal.timeout(1000),
  });
  assertEquals(res.status, 200);
  console.log("OK");
} catch (e) {
  console.error("error!", e!.toString());
}
console.groupEnd();

console.group("DELETE on server with payload");
try {
  const res = await fetch("http://localhost:8000", {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ "hello": "world" }),
    signal: AbortSignal.timeout(1000),
  });
  assertEquals(res.status, 200);
  console.log("OK");
} catch (e) {
  console.error("error!", e!.toString());
}
console.groupEnd();
console.groupEnd();

console.group("Proxy")
console.group("POST on proxy with payload");
try {
  const res = await fetch("http://localhost:8080", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ "hello": "world" }),
    signal: AbortSignal.timeout(1000),
  });
  assertEquals(res.status, 200);
  console.log("OK");
} catch (e) {
  console.error("error!", e!.toString());
}
console.groupEnd();
console.group("DELETE on proxy without payload");
try {
  const res = await fetch("http://localhost:8080", {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    signal: AbortSignal.timeout(1000),
  });
  assertEquals(res.status, 200);
  console.log("OK");
} catch (e) {
  console.error("error!", e!.toString());
}
console.groupEnd();

console.group("DELETE on proxy with payload (spoiler: will fail)");
try {
  const res = await fetch("http://localhost:8080", {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ "hello": "world" }),
    signal: AbortSignal.timeout(1000),
  });
  assertEquals(res.status, 200);
  console.log("OK");
} catch (e) {
  console.error("error!", e!.toString());
}
console.groupEnd();

Deno.exit(0);
