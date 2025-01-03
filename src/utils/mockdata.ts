import {
  Activity,
  Briefcase,
  Building2,
  CalendarDays,
  Clipboard,
  ClipboardList,
  Clock,
  FileClock,
  FileSignature,
  FileText,
  Home,
  LayoutDashboard,
  ListChecks,
  Mail,
  Megaphone,
  NotebookText,
  Package,
  Phone,
  Pin,
  Receipt,
  Rocket,
  ShoppingCart,
  Target,
  UserPlus,
  Users,
  Users2,
} from "lucide-react";
import {
  KeyActivity,
  Lead,
  PipelineProgressProps,
  SidebarMenuItem,
  TableData,
} from "./type";

export const sidebarMenuItems: SidebarMenuItem[] = [
  { id: 1, label: "Home", href: "/", icon: Home },
  {
    id: 2,
    label: "Recent",
    icon: Clock,
    subMenu: [
      { id: 21, label: "Recent Files", href: "/recent/files", icon: FileClock },
      {
        id: 22,
        label: "Recent Activities",
        href: "/recent/activities",
        icon: Activity,
      },
    ],
  },
  {
    id: 3,
    label: "Pinned",
    icon: Pin,
    subMenu: [
      {
        id: 31,
        label: "Pinned Notes",
        href: "/pinned/notes",
        icon: NotebookText,
      },
      {
        id: 32,
        label: "Pinned Tasks",
        href: "/pinned/tasks",
        icon: ClipboardList,
      },
    ],
  },
  {
    id: 5,
    label: "Sales Accelerator",
    href: "/sales-accelerator",
    icon: Rocket,
    category: "my work",
  },
  {
    id: 6,
    label: "Dashboards",
    href: "/dashboards",
    icon: LayoutDashboard,
    category: "my work",
  },
  {
    id: 7,
    label: "Activities",
    href: "/activities",
    icon: Activity,
    category: "my work",
  },
  {
    id: 8,
    label: "Accounts",
    href: "/accounts",
    icon: Building2,
    category: "customers",
  },
  {
    id: 9,
    label: "Contacts",
    href: "/contacts",
    icon: Users,
    category: "customers",
  },
  {
    id: 10,
    label: "Leads",
    href: "/opportunities",
    icon: UserPlus,
    category: "sales",
  },
  {
    id: 11,
    label: "Opportunities",
    href: "/opportunities",
    icon: Target,
    category: "sales",
  },
  {
    id: 12,
    label: "Competitors",
    href: "/competitors",
    icon: Users2,
    category: "sales",
  },
  {
    id: 13,
    label: "Quotes",
    href: "/quotes",
    icon: FileText,
    category: "collateral",
  },
  {
    id: 14,
    label: "Orders",
    href: "/orders",
    icon: ShoppingCart,
    category: "collateral",
  },
  {
    id: 15,
    label: "Invoices",
    href: "/invoices",
    icon: Receipt,
    category: "collateral",
  },
  {
    id: 16,
    label: "Products",
    href: "/products",
    icon: Package,
    category: "collateral",
  },
  {
    id: 17,
    label: "Sales Literature",
    href: "/sales-literature",
    icon: FileSignature,
    category: "collateral",
  },
  {
    id: 19,
    label: "Marketing lists",
    href: "/marketing-lists",
    icon: ListChecks,
    category: "marketing",
  },
  {
    id: 20,
    label: "Quick Campaigns",
    href: "/quick-campaigns",
    icon: Megaphone,
    category: "collateral",
  },
];

export const openLeads: Lead[] = [
  {
    id: 1,
    name: "Jane Reyes",
    title: "COO • Northwind Traders",
    activity: {
      icon: Mail,
      text: "Engage with Jane Reyes",
    },
    details:
      "Jane may be interested in upgrading espresso machines for her in-store coffee shops.",
    tags: ["Expand business", "High buying intent"],
    avatar: "https://avatar.iran.liara.run/public/91",
  },
  {
    id: 2,
    name: "Allan Munger",
    title: "Head of Real Estate Development • Contoso Coffee",
    activity: {
      icon: CalendarDays,
      text: "Prepare for meeting with Allan",
    },
    details:
      "Prepare for high-buying intent meeting Copilot scheduled for 2 PM regarding upgrading service contract.",
    tags: ["Upcoming meeting", "Due today"],
    avatar: "https://avatar.iran.liara.run/public/40",
  },
  {
    id: 3,
    name: "Samantha Lee",
    title: "Marketing Manager • Blue Wave Inc.",
    activity: {
      icon: Phone,
      text: "Follow up with Samantha",
    },
    details:
      "Samantha has expressed interest in marketing collaboration for their new campaign.",
    tags: ["Collaboration", "Marketing opportunity"],
    avatar: "https://avatar.iran.liara.run/public/85",
  },
  {
    id: 4,
    name: "Mark Johnson",
    title: "Operations Head • Green Valley Farms",
    activity: {
      icon: Briefcase,
      text: "Discuss operational needs with Mark",
    },
    details:
      "Mark wants to explore efficient supply chain solutions for their upcoming harvest season.",
    tags: ["Operational efficiency", "Supply chain"],
    avatar: "https://avatar.iran.liara.run/public/41",
  },
  {
    id: 5,
    name: "Emily Carter",
    title: "HR Manager • Prime Solutions",
    activity: {
      icon: Clipboard,
      text: "Plan onboarding session with Emily",
    },
    details:
      "Emily is looking for ideas to enhance the onboarding experience for new hires.",
    tags: ["Onboarding", "Employee experience"],
    avatar: "https://avatar.iran.liara.run/public/64",
  },
];

export const tableData: TableData[] = [
  {
    id: "1",
    name: "Winford Asher",
    topic: "Cafe A100 for commercial use",
    statusReason: "New",
    createdOn: "4/02/2024 12:00 PM",
  },
  {
    id: "2",
    name: "Josia Love",
    topic: "Upgrading service plan",
    statusReason: "New",
    createdOn: "3/30/2024 7:45 AM",
  },
  {
    id: "3",
    name: "Harrison Curtis",
    topic: "Issue with throughput on EspressoMaster",
    statusReason: "New",
    createdOn: "3/28/2024 3:30 PM",
  },
  {
    id: "4",
    name: "Jermaine Berrett",
    topic: "New roaster in distribution facility",
    statusReason: "New",
    createdOn: "3/25/2024 11:05 AM",
  },
  {
    id: "5",
    name: "Gerald Stephens",
    topic: "Concerns on current machines",
    statusReason: "New",
    createdOn: "3/23/2024 4:50 PM",
  },
  {
    id: "6",
    name: "Halle Griffiths",
    topic: "Expanding business",
    statusReason: "New",
    createdOn: "3/21/2024 10:20 AM",
  },
  {
    id: "7",
    name: "Rachel Michael",
    topic: "Addressing service concerns",
    statusReason: "New",
    createdOn: "3/19/2024 1:15 PM",
  },
  {
    id: "8",
    name: "Alex Baker",
    topic: "Premium coffee beans",
    statusReason: "New",
    createdOn: "3/13/2024 8:00 AM",
  },
  {
    id: "9",
    name: "Lilly Pyles",
    topic: "Cafe A100 bulk rate",
    statusReason: "New",
    createdOn: "3/13/2024 2:45 PM",
  },
  {
    id: "10",
    name: "Jane Reyes",
    topic: "Improving cost per cup",
    statusReason: "New",
    createdOn: "3/10/2024 9:30 AM",
  },
];

export const otherKeyActivity: KeyActivity[] = [
  {
    id: 1,
    title: "Cafe A100 for Woodland Bank",
    organization: "Woodland Bank",
    amount: "$280,000",
    daysToClose: 8,
    activity: "Review draft and reply to Chris Naido",
    avatar: "https://avatar.iran.liara.run/public/girl",
    icon: Mail,
  },
  {
    id: 2,
    title: "Partnership opportunity for Fabrikam",
    organization: "Fabrikam",
    amount: "$500,000",
    daysToClose: 12,
    activity: "Prepare me for Fabrikam's key stakeholder meeting",
    avatar: "https://avatar.iran.liara.run/public/boy",
    icon: CalendarDays,
  },
];

export const statData: PipelineProgressProps = {
  target: 45000000,
  stages: [
    { name: "Won", amount: 18000000, color: "bg-emerald-500" },
    { name: "Committed", amount: 8000000, color: "bg-blue-500" },
    { name: "Best case", amount: 7000000, color: "bg-purple-500" },
    { name: "Qualified", amount: 3000000, color: "bg-amber-500" },
    { name: "Leads", amount: 75000000, color: "bg-gray-300" },
  ],
};

export const cardData = [
  {
    title: "Decision maker",
    value: "Yes",
    icon: "/cards/dm.png",
  },
  {
    title: "Potential deal value",
    value: "$1M",
    icon: "/cards/pdv.png",
  },
  {
    title: "Intent",
    value: "High",
    icon: "/cards/it.png",
  },
];
