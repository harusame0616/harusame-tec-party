/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import type { Logger } from "@/lib/logger/logger";

export class ConsoleLogger implements Logger {
  info(message: string): void {
    console.log(message);
  }

  error(message: string): void {
    console.error(message);
  }
}
