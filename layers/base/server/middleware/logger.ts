import { defineEventHandler } from "h3";

export default defineEventHandler(async (_event) => {
  // const storage = useStorage("db");
  // await storage.setItem(`telemetry:request:${Date.now()}`, {
  //   url: getRequestURL(event),
  //   method: event.method,
  //   heaer: getRequestHeaders(event),
  // });
});
