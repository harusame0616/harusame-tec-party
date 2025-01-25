import type { PropsWithChildren } from "react";
import { cn } from "../../lib/utils";

type Props = PropsWithChildren<{
  href: string;
  active?: boolean;
}>;

export function MenuItem({ href, active, children }: Props) {
  return (
    <li aria-current={active}>
      <a href={href} className="group relative" rel="prefetch">
        <div
          className={cn(
            "absolute bottom-2 left-0 h-[2px] w-full bg-primary opacity-0 transition-all group-hover:visible group-hover:bottom-0 group-hover:opacity-100 group-focus:visible group-focus:bottom-0 group-focus:opacity-100 group-active:visible group-active:bottom-0 group-active:opacity-100",
            active && "visible bottom-0 opacity-100",
          )}
        />
        <div className="flex h-10 items-center justify-center px-4">
          {children}
        </div>
      </a>
    </li>
  );
}
