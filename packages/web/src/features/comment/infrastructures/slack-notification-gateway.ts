import type { NotificationGateway } from "@features/comment/usecases/notification-gateway";

export class SlackNotificationGateway implements NotificationGateway {
  constructor(private url: URL) {}

  async notify(text: string): Promise<void> {
    await fetch(this.url, {
      method: "POST",
      body: JSON.stringify({ text }),
    });
  }
}
