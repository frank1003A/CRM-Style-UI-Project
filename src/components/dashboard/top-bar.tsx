"use client";

import { cn } from "@/lib/utils";
import {
  ChartArea,
  ChartPie,
  ChevronDown,
  Columns4,
  Eye,
  List,
  ListFilter,
  MoreHorizontal,
  MoreVertical,
  Plus,
  RotateCw,
  Share,
  Share2,
  ShieldHalf,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const ToolbarButton = ({
  children,
  border = false,
  onClick,
  toolTip,
}: {
  children: React.JSX.Element;
  border?: boolean;
  onClick?: () => void;
  toolTip?: string;
}) => {
  return (
    <>
      {toolTip ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onClick}
              className={cn(
                "px-2 py-1 flex items-center justify-center gap-2 text-sm rounded-sm border",
                border ? "border-border" : "border-transparent",
                "hover:border-border"
              )}
            >
              {children}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{toolTip}</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <button
          onClick={onClick}
          className={cn(
            "px-2 py-1 flex items-center justify-center gap-2 text-sm rounded-sm border",
            border ? "border-border" : "border-transparent",
            "hover:border-border"
          )}
        >
          {children}
        </button>
      )}
    </>
  );
};

interface ToolbarDropdownProps {
  label: string;
  icon?: React.ReactNode;
  className?: string;
  items: {
    icon?: React.ReactNode;
    label: string;
    onClick?: () => void;
  }[];
}

const ToolbarDropdown = ({
  label,
  icon,
  items,
  className,
}: ToolbarDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            className,
            "px-2 py-1 flex items-center justify-center gap-2 text-sm rounded-sm border border-transparent hover:border-border data-[state=open]:border-border focus-visible:border-border"
          )}
        >
          <span>{icon}</span>
          <span>{label}</span>
          <Separator className="h-5 mr-0" orientation="vertical" />
          <ChevronDown className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {items.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={item.onClick}
            className="flex items-center gap-2"
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TopBar = ({
  expand,
  toggleExpand,
}: {
  expand: boolean;
  toggleExpand: () => void;
}) => {
  return (
    <TooltipProvider>
      <div className="bg-white w-full shadow-md rounded-[5px] p-1 flex items-center overflow-x-auto">
        <ToolbarButton toolTip="My Open Leads" onClick={toggleExpand}>
          <>
            <span className="xl:hidden">Leads</span>
            <span className="hidden xl:inline">My open leads</span>
            <ChevronDown
              className={cn(
                expand ? "rotate-180" : "rotate-0",
                "ml-auto transition-all w-4 h-4"
              )}
            />
          </>
        </ToolbarButton>
        <div className="flex gap-1 items-center ml-auto md:hidden">
          <ToolbarButton toolTip="New Lead">
            <>
              <Plus className="w-4 h-4" />
            </>
          </ToolbarButton>
          <ToolbarButton toolTip="Refresh">
            <>
              <RotateCw className="w-4 h-4" />
            </>
          </ToolbarButton>
          <ToolbarDropdown
            label=""
            className="mr-2"
            icon={<MoreHorizontal className="w-4 h-4" />}
            items={[
              {
                icon: <ShieldHalf className="w-4 h-4" />,
                label: "Collaborate",
              },
              {
                icon: <Trash2 className="w-4 h-4" />,
                label: "Delete",
              },
              {
                icon: <ChartArea className="w-4 h-4" />,
                label: "Show chart",
              },
              {
                icon: <List className="w-4 h-4" />,
                label: "Focused View",
              },
            ]}
          />
        </div>
        <div className="gap-1 items-center ml-auto hidden md:flex xl:hidden">
          <ToolbarButton>
            <>
              <Plus className="w-4 h-4" /> New
            </>
          </ToolbarButton>
          <ToolbarDropdown
            label="More"
            icon={<MoreHorizontal className="w-4 h-4" />}
            items={[
              {
                icon: <ShieldHalf className="w-4 h-4" />,
                label: "Collaborate",
              },
              {
                icon: <Trash2 className="w-4 h-4" />,
                label: "Delete",
              },
              {
                icon: <ChartArea className="w-4 h-4" />,
                label: "Show chart",
              },
              {
                icon: <List className="w-4 h-4" />,
                label: "Focused View",
              },
              {
                icon: <RotateCw className="w-4 h-4" />,
                label: "Refresh",
              },
            ]}
          />
        </div>
        {/** */}
        <div className="gap-1 items-center ml-auto hidden xl:flex">
          <ToolbarButton>
            <>
              <Plus className="w-4 h-4" /> New
            </>
          </ToolbarButton>
          <ToolbarButton>
            <>
              <RotateCw className="w-4 h-4" /> Refresh
            </>
          </ToolbarButton>
          <ToolbarDropdown
            label="View"
            icon={<Eye className="w-4 h-4" />}
            items={[
              {
                icon: <ChartArea className="w-4 h-4" />,
                label: "Show chart",
              },
              {
                icon: <List className="w-4 h-4" />,
                label: "Focused View",
              },
            ]}
          />
          <ToolbarDropdown
            label="More"
            icon={<MoreHorizontal className="w-4 h-4" />}
            items={[
              {
                icon: <ShieldHalf className="w-4 h-4" />,
                label: "Collaborate",
              },
              {
                icon: <Trash2 className="w-4 h-4" />,
                label: "Delete",
              },
            ]}
          />
        </div>
        {/** */}
        <MoreVertical className="w-4 h-4 mx-3 hidden md:block" />
        {/** */}
        <div className="flex gap-1 items-center">
          <div className="items-center gap-1 hidden lg:flex">
            <ToolbarButton border>
              <>
                <ChartPie className="w-4 h-4" /> Smart data
              </>
            </ToolbarButton>
            <ToolbarButton border>
              <>
                <ListFilter className="w-4 h-4" /> Edit filters
              </>
            </ToolbarButton>
            <ToolbarButton border>
              <>
                <Columns4 className="w-4 h-4" /> Edit columns
              </>
            </ToolbarButton>
          </div>
          <ToolbarDropdown
            label=""
            icon={<Share className="w-4 h-4" />}
            className="bg-blue-600 text-white"
            items={[
              {
                icon: <Share2 className="w-4 h-4" />,
                label: "Share as file",
              },
              {
                icon: <Trash2 className="w-4 h-4" />,
                label: "Delete",
              },
            ]}
          />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default TopBar;
