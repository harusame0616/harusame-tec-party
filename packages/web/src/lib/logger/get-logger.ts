import { ConsoleLogger } from "@/lib/logger/console-logger";

export function getLogger() {
  return new ConsoleLogger();
}
