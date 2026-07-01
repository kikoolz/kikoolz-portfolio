import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "../../../uploadthing/core";

// Export routes for Next.js App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
