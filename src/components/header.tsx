import {
  CircleHelp,
  Grip,
  Lightbulb,
  MessageSquareDot,
  Plus,
  Settings,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const Header = () => {
  return (
    <header className="w-full sticky top-0 bg-gray-800 text-white p-3">
      <div className="flex items-center justify-start gap-5 w-full h-full">
        <Button size={"icon"} variant={"ghost"}>
          <Grip />
        </Button>
        <div className="items-center h-full hidden md:flex">
          <span>Dynamic 365</span>
          <Separator className="h-5 mx-3 bg-white" orientation="vertical" />
          <span className="text-neutral-400">Sales hub</span>
        </div>
        <div className="ml-auto flex items-center justify-end">
          <div className="items-center gap-3 mr-3 hidden lg:flex">
            <Button size={"icon"} variant={"ghost"}>
              <Lightbulb />
            </Button>
            <Button size={"icon"} variant={"ghost"}>
              <Plus />
            </Button>
            <Button size={"icon"} variant={"ghost"}>
              <Settings />
            </Button>
            <Button size={"icon"} variant={"ghost"}>
              <CircleHelp />
            </Button>
            <Button size={"icon"} variant={"ghost"}>
              <MessageSquareDot />
            </Button>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://avatar.iran.liara.run/public/90" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
