import { menus } from "./menu";
import { MenuItem } from "./MenuItem";
import { BlogSearchForm } from "./BlogSearchForm";
import type { Menu } from "./menu";

type Props = {
  current: Menu;
};

export function PCMenu({ current }: Props) {
  return (
    <ul className="flex gap-2">
      {menus.map((menu) => (
        <MenuItem href={menu.href} active={menu.id === current} key={menu.id}>
          {menu.label}
        </MenuItem>
      ))}
      <li>
        <BlogSearchForm />
      </li>
    </ul>
  );
}
