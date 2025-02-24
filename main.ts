import httpProxy from "http-proxy";
import http from "node:http";
import { Buffer } from "node:buffer";

export const proxy = httpProxy.createProxyServer({
  target: "http://localhost:8000",
});

export const server = Deno.serve(async (req) => {
  console.log("Incoming request on server:", req.method, req.url);
  const body = await req.text();
  console.log("Received body:", body);
  return new Response(JSON.stringify({ echo: body }));
});

proxy.listen(8080);

export function fetchRequest(
  url: string,
  method: string,
  body?: string,
): Promise<Response> {
  console.log("httpAgentRequest:", url, method, body);
  return fetch(`http://localhost:${proxy ? 8080 : 8000}`, {
    method,
    headers: {
      "content-type": "application/json",
    },
    body,
    signal: AbortSignal.timeout(1000),
  });
}

export function httpAgentRequest(url: string, method: string, body?: string) {
  if (body) {
    console.log("httpAgentRequest:", url, method, body);
  }
  return new Promise<{ status: number; body: string }>((resolve, reject) => {
    const req = http.request(url, {
      method,
      agent: false,
    }, (res) => {
      const chunks: Uint8Array[] = [];
      res.on("data", (data) => chunks.push(data));
      res.on("end", () => {
        resolve({
          status: res.statusCode ?? 0,
          body: Buffer.concat(chunks).toString(),
        });
      });
    });
    req.on("error", reject);
    if (body) {
      req.write(body);
    }
    req.end();
  });
}
