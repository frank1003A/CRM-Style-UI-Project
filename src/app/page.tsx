"use client";
import { DataTable } from "@/components/dashboard/data-table";
import LeadsCarousel from "@/components/dashboard/leads-carousel";
import PipelineProgress from "@/components/dashboard/pipeline-progress";
import TopBar from "@/components/dashboard/top-bar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { openLeads, otherKeyActivity } from "@/utils/mockdata";
import { Menu, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSidebar } from "./context/sidebar-context";

export default function Home() {
  const [expand, setExpand] = useState(false);
  const toggleExpand = () => setExpand(!expand);
  const { toggleMobile } = useSidebar();

  return (
    <div className="realtive p-4 w-full text-muted-foreground bg-neutral-50">
      <h1 className="sr-only">
        Front-End Development Task: Next.js CRM-Style UI Recreation
      </h1>
      <TopBar expand={expand} toggleExpand={toggleExpand} />
      <FocusSection expand={expand} />
      <div className="bg-white py-4 shadow-lg">
        <DataTable />
      </div>
      <button
        onClick={toggleMobile}
        className="group z-20 md:hidden absolute bottom-5 right-5 p-2 bg-blue-600 text-white shadow-2xl rounded-full"
      >
        <Menu />
      </button>
    </div>
  );
}

function FocusSection({ expand }: { expand: boolean }) {
  return (
    <div
      className={cn(
        expand
          ? "h-full xl:h-[420px] opacity-100 mb-5 py-5"
          : "h-0 opacity-0 mb-0 py-0",
        "relative max-h-none px-2 overflow-hidden transition-all mt-3 w-full border-2 border-transparent shadow-lg hover:shadow-2xl hover:border-purple-800 rounded-xl bg-white"
      )}
    >
      <div className="px-4 mb-2">
        <Header />
      </div>
      <div
        className={cn(
          "relative w-full h-full xl:h-[300px] flex flex-col xl:flex-row items-center gap-2 mt-2"
        )}
      >
        <FirstHalf />
        <Separator />
        <SecondHalf />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="flex flex-col xl:flex-row items-center w-full gap-1">
      <div className="flex flex-col md:flex-row items-center w-full gap-1">
        <Image
          src={"/ms_365_copilot.png"}
          alt="Copilot logo"
          width={20}
          height={20}
        />
        <h1 className="font-bold">
          Hi Mona, <span className="text-blue-800">68%</span> of goal achieved,
          and the rest can be achieved by focusing on the top 20 leads.
        </h1>
      </div>
      <div className="ml-0 py-2 xl:py-0 xl:ml-auto my-2 xl:my-0 w-full flex items-center overflow-x-auto md:overflow-x-hidden">
        <PipelineProgress />
      </div>
    </div>
  );
}

function FirstHalf() {
  return (
    <div className="h-fit flex flex-col gap-2 w-full xl:w-[65%]">
      <h2 className="text-xs mx-4">
        Copilot has pinpointed 20 key leads that show strong purchase intent and
        are actively engaging. These leads need your focus.
      </h2>
      <LeadsCarousel leads={openLeads} itemsPerGroup={2} />
    </div>
  );
}

function Separator() {
  return (
    <div className="w-full h-px xl:h-full mx-4 xl:mx-1 xl:w-px bg-gray-200" />
  );
}

function SecondHalf() {
  return (
    <div className="h-fit px-0 flex flex-col gap-2 min-h-0 w-full">
      <h2 className="text-xs px-2">Other key activities</h2>
      <ActivitiesList activities={otherKeyActivity} />
    </div>
  );
}

function ActivitiesList({
  activities,
}: {
  activities: typeof otherKeyActivity;
}) {
  return (
    <div className="flex h-fit flex-col gap-2 px-4 mt-2">
      {activities.map((activity) => (
        <ActivityCard key={activity.title} activity={activity} />
      ))}
      <Link
        href={"#"}
        className="text-blue-800 text-start text-sm font-semibold mt-3"
      >
        Show all key activities
      </Link>
    </div>
  );
}

function ActivityCard({
  activity,
}: {
  activity: (typeof otherKeyActivity)[0];
}) {
  return (
    <div className="flex flex-col gap-2 border rounded-xl shadow-sm p-2">
      <div className="w-full flex items-center gap-2 justify-start">
        <Avatar className="h-8 w-8">
          <AvatarImage src={activity.avatar} />
          <AvatarFallback className="text-sm">
            {activity.title.substring(0, 1)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0">
          <h4 className="text-xs font-bold">{activity.title}</h4>
          <div className="text-[10px] gap-1 flex items-center text-muted-foreground">
            <span>{activity.organization}</span>
            <span className="font-bold text-xs">.</span>
            <span>{activity.amount}</span>
            <span className="font-bold text-xs">.</span>
            <span>{activity.daysToClose} days to close</span>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col gap-1 bg-gradient-to-r from-gray-100 to-gray-50 p-2 rounded-lg">
        <div className="rounded-sm p-1 right-0 top-0 absolute shadow-2xl bg-white">
          <Sparkles className="w-4 h-4 text-slate-900" />
        </div>
        <div className="flex items-center justify-start gap-1">
          <activity.icon className="h-4 w-4" />
          <h4 className="text-[10px] font-bold line-clamp-1">
            {activity.activity}
          </h4>
        </div>
      </div>
    </div>
  );
}
