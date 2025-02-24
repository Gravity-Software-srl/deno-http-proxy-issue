import { assertEquals } from "@std/assert";
import { httpAgentRequest } from "./main.ts";

Deno.test("Agent requests on server", async (t) => {
  const serverUrl = "http://localhost:8000";

  await t.step("POST on server with payload", async () => {
    const res = await httpAgentRequest(
      serverUrl,
      "POST",
      '{"hello": "world"}',
    );
    assertEquals(res.status, 200);
    assertEquals(res.body, '{"echo":"{\\"hello\\": \\"world\\"}"}');
  });

  await t.step("DELETE on server without payload", async () => {
    const res = await httpAgentRequest(
      serverUrl,
      "DELETE",
    );
    assertEquals(res.status, 200);
    assertEquals(res.body, '{"echo":""}');
  });

  await t.step("DELETE on server with payload", async () => {
    const res = await httpAgentRequest(
      serverUrl,
      "DELETE",
      '{"hello": "world"}',
    );
    assertEquals(res.status, 200);
    assertEquals(res.body, '{"echo":"{\\"hello\\": \\"world\\"}"}');
  });
});
