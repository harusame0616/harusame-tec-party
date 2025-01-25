import { MicroCMSBlogClient } from "./microcms-blog-client";
import type { BlogClient } from "./blog-client";

export function createBlogClient(): BlogClient {
  return new MicroCMSBlogClient({
    apiKey: import.meta.env.MICROCMS_API_KEY as string,
    serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN as string,
  });
}
