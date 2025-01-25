export interface NotificationGateway {
  notify(text: string): Promise<void>;
}
