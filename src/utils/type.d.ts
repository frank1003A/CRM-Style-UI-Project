import { type LucideIcon } from "lucide-react";

export type SidebarMenuItem =
  | {
      id: number;
      label: string;
      category?: string;
      icon: LucideIcon;
      subMenu: SidebarMenuItem[];
    }
  | {
      id: number;
      label: string;
      href: string;
      category?: string;
      icon: LucideIcon;
    };

export type TableData = {
  id: string;
  name: string;
  topic: string;
  statusReason: string;
  createdOn: string;
};

export type SortableButtonProps = {
  label: string;
  isSorted: boolean | false;
  onToggleSorting: () => void;
};

export type Lead = {
  id: number;
  name: string;
  title: string;
  activity: {
    icon: LucideIcon;
    text: string;
  };
  details: string;
  tags: [string, string];
  avatar: string;
};

export type KeyActivity = {
  id: number;
  title: string;
  organization: string;
  amount: string;
  daysToClose: number;
  activity: string;
  avatar: string;
  icon: LucideIcon;
};

type Stage = {
  name: string;
  amount: number;
  color: string;
};

export type StatData = {
  target: number;
  stages: Stage[];
};
