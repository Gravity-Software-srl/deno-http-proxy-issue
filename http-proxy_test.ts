import { assertEquals } from "@std/assert";
import { fetchRequest } from "./main.ts";

Deno.test("Server", async (t) => {
  const serverUrl = "http://localhost:8000";
  const proxyUrl = "http://localhost:8080";
  await t.step("POST on server with payload", async () => {
    const res = await fetchRequest(serverUrl, "POST", '{"hello": "world"}');
    assertEquals(res.status, 200);
    assertEquals(await res.json(), { echo: '{"hello": "world"}' });
  });

  await t.step("DELETE on server without payload", async () => {
    const res = await fetchRequest(serverUrl, "DELETE");
    assertEquals(res.status, 200);
    assertEquals(await res.json(), { echo: "" });
  });

  await t.step("DELETE on server with payload", async () => {
    const res = await fetchRequest(serverUrl, "DELETE", '{"hello": "world"}');
    assertEquals(res.status, 200);
    assertEquals(await res.json(), { echo: '{"hello": "world"}' });
  });

  await t.step("POST on proxy with payload", async () => {
    const res = await fetchRequest(proxyUrl, "POST", '{"hello": "world"}');
    assertEquals(res.status, 200);
    assertEquals(await res.json(), { echo: '{"hello": "world"}' });
  });

  await t.step("DELETE on proxy without payload", async () => {
    const res = await fetchRequest(proxyUrl, "DELETE");
    assertEquals(res.status, 200);
    assertEquals(await res.json(), { echo: "" });
  });

  await t.step("DELETE on proxy with payload", async () => {
    const res = await fetchRequest(proxyUrl, "DELETE", '{"hello": "world"}');
    assertEquals(res.status, 200);
    assertEquals(await res.json(), { echo: '{"hello": "world"}' });
  });
});
