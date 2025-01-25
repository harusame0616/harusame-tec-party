import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { type PropsWithChildren } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import logo from "@/assets/logo.svg";

export function HamburgerMenu({ children }: PropsWithChildren) {
  return (
    <Sheet>
      <SheetTrigger>
        <HamburgerMenuIcon className="h-10 w-10" aria-label="メニュー" />
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <img
            src={logo.src}
            height={64}
            alt="はるさめ.dev"
            className="h-16 object-contain"
          />
          <SheetTitle className="sr-only">メニュー</SheetTitle>
        </SheetHeader>
        <Separator className="mt-4" />
        <div>{children}</div>
      </SheetContent>
    </Sheet>
  );
}
