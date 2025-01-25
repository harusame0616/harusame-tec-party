import type { PropsWithChildren } from "react";

export function MuteText({ children }: PropsWithChildren) {
  return <span className="text-xs text-muted-foreground">{children}</span>;
}
