import { BlogSearchForm } from "./BlogSearchForm";
import { MenuItem } from "./MenuItem";
import { menus } from "./menu";

export function SPMenu() {
  return (
    <ul className="relative bg-background">
      {menus.map((menu) => (
        <div className="border-b border-solid border-border" key={menu.id}>
          <MenuItem href={menu.href}>{menu.label}</MenuItem>
        </div>
      ))}
      <div className="border-b border-solid border-border p-2">
        <BlogSearchForm />
      </div>
    </ul>
  );
}
