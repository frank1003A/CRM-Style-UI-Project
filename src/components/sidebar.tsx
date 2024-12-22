"use client";

import { useSidebar } from "@/app/context/sidebar-context";
import { cn } from "@/lib/utils";
import { sidebarMenuItems } from "@/utils/mockdata";
import { SidebarMenuItem } from "@/utils/type";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Separator } from "./ui/separator";

type GroupedMenuItems = {
  [category: string]: SidebarMenuItem[];
};

interface SideHeaderProps {
  collapse: boolean;
  toggleCollapse: () => void;
}

interface SidebarCatProps {
  collapse: boolean;
  items: SidebarMenuItem[];
  category: string;
}

interface SidebarItemProps {
  collapse: boolean;
  item: SidebarMenuItem;
  isSubMenu?: boolean;
}

const SidebarHeader = ({ collapse, toggleCollapse }: SideHeaderProps) => {
  const { toggleMobile } = useSidebar();
  return (
    <>
      <div
        className={cn(
          collapse ? "px-3" : "px-5",
          "items-center w-full mb-2 hidden md:flex"
        )}
      >
        <Button
          className="text-muted-foreground"
          size={"icon"}
          variant={"ghost"}
          onClick={toggleCollapse}
        >
          <Menu />
        </Button>
      </div>
      <div
        className={cn(
          collapse ? "px-3" : "px-5",
          "items-center w-full mb-2 md:hidden"
        )}
      >
        <Button
          className="text-muted-foreground"
          size={"icon"}
          variant={"ghost"}
          onClick={toggleMobile}
        >
          <X />
        </Button>
      </div>
    </>
  );
};

const SidebarCategory = ({ category, items, collapse }: SidebarCatProps) => {
  return (
    <div className="mb-5">
      {category !== "uncategorized" && !collapse && (
        <h3 className="text-lg px-5 font-bold mb-2 capitalize text-muted-foreground">
          {category}
        </h3>
      )}
      <nav>
        <ul>
          {items.map((item) => (
            <SidebarItem key={item.id} item={item} collapse={collapse} />
          ))}
        </ul>
      </nav>
    </div>
  );
};

const SidebarItem = ({ item, collapse, isSubMenu }: SidebarItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = item.icon;

  const pathname = usePathname();

  if ("subMenu" in item) {
    return (
      <li key={item.id}>
        <Collapsible
          open={collapse ? false : isOpen}
          onOpenChange={setIsOpen}
          className="w-full"
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="group w-full h-full p-2 rounded-none hover:bg-white justify-start"
            >
              <div
                className={cn(
                  collapse ? "justify-center" : "justify-start",
                  "flex items-center w-full group text-muted-foreground"
                )}
              >
                <Separator
                  className="h-5 mr-2 w-1 rounded-full bg-transparent"
                  orientation="vertical"
                />
                <span className={cn("flex items-center gap-2 w-full")}>
                  <Icon className="w-5 h-5" />
                  {!collapse && <span>{item.label}</span>}
                </span>

                <ChevronDown
                  className={cn(
                    isOpen ? "rotate-180" : "rotate-0",
                    "ml-auto transition-all w-4 h-4"
                  )}
                />
              </div>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="transition-all">
            <ul className={cn(collapse && "hidden")}>
              {item.subMenu.map((subItem) => (
                <SidebarItem
                  key={subItem.id}
                  item={subItem}
                  collapse={collapse}
                  isSubMenu
                />
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      </li>
    );
  }

  const isActive = item.href && pathname === item.href;

  return (
    <li key={item.id}>
      <Link
        href={item.href}
        className={cn(
          "block text-sm w-full p-2 hover:bg-white group",
          isActive ? "bg-white" : "bg-transparent"
        )}
      >
        <div
          className={cn(
            collapse ? "justify-center" : "justify-start",
            "flex items-center w-full"
          )}
        >
          <Separator
            className={cn(
              isSubMenu ? "ml-4" : "ml-0",
              "h-5 w-1 mr-2 rounded-full",
              isActive
                ? "bg-blue-600"
                : "bg-transparent group-hover:bg-blue-600"
            )}
            orientation="vertical"
          />
          <span
            className={cn(
              "flex items-center gap-2 w-full text-muted-foreground",
              isActive ? "font-bold" : "font-normal"
            )}
          >
            <Icon className="w-5 h-5" />
            {!collapse && <span>{item.label}</span>}
          </span>
        </div>
      </Link>
    </li>
  );
};

const Sidebar = () => {
  const {
    isCollapsed: collapse,
    setIsCollapsed: setCollapse,
    isMobileOpen,
  } = useSidebar();

  const groupedMenuItems: GroupedMenuItems =
    sidebarMenuItems.reduce<GroupedMenuItems>((groups, item) => {
      const category = item.category || "uncategorized";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    }, {});

  const toggleCollapse = () => setCollapse(!collapse);

  return (
    <>
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"></div>
      )}
      <aside
        className={cn(
          collapse ? "w-16" : "w-56",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          "bg-neutral-100 fixed md:relative md:translate-x-0 z-50 md:z-0 py-4 h-full border-r transition-all overflow-y-auto no-scrollbar"
        )}
      >
        <SidebarHeader collapse={collapse} toggleCollapse={toggleCollapse} />
        {Object.keys(groupedMenuItems).map((category) => (
          <SidebarCategory
            key={category}
            category={category}
            items={groupedMenuItems[category]}
            collapse={collapse}
          />
        ))}
      </aside>
    </>
  );
};

export default Sidebar;
