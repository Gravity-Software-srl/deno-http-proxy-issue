# deno-http-proxy-issue

As of writing this, deno 2.2.1 has an issue with http-proxy when proxying a DELETE request with a
payload.

To run this demo:

```bash
deno task run
```

Last test will fail, the request body can't be read because the http request is not fully completed (I checked with wireshark), and on the Deno server side, it will wait forever the rest of the request (which is also an issue).
