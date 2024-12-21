import { Brain, MessageSquare, MessagesSquare, Phone } from "lucide-react";
import { Button } from "./ui/button";

const RightSideBar = () => {
  return (
    <div className="bg-neutral-100 hidden md:flex py-4 h-full w-12 transition-all overflow-y-auto no-scrollbar">
      <div className="flex flex-col items-center h-full gap-2 text-muted-foreground">
        <Button size={"icon"} variant={"ghost"}>
          <Brain className="h-5 w-5" />
        </Button>
        <Button size={"icon"} variant={"ghost"}>
          <MessagesSquare className="h-5 w-5" />
        </Button>
        <Button size={"icon"} variant={"ghost"}>
          <Phone className="h-5 w-5" />
        </Button>
        <Button size={"icon"} variant={"ghost"}>
          <MessageSquare className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default RightSideBar;
