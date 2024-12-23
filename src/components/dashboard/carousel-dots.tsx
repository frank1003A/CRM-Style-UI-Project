import { cn } from "@/lib/utils";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";

interface CarouselDotsProps {
  count: number;
  current: number;
}

export const CarouselDots: React.FC<CarouselDotsProps> = ({
  count,
  current,
}) => {
  return (
    <div className="py-2 flex items-center w-full justify-center gap-1 text-center text-sm text-muted-foreground">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "w-1 h-1 rounded-full transition-all",
            index + 1 === current ? "bg-blue-900 w-8" : "bg-slate-300"
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export const ModalCarouselDots: React.FC<CarouselDotsProps> = ({
  count,
  current,
}) => {
  return (
    <div className="py-2 flex items-center w-full justify-between gap-1">
      <div className="flex text-nowrap items-center text-[10px] gap-2">
        <span>
          Showing {current + 1} of {count}
        </span>
        <Separator className="h-5" orientation="vertical" />
        <Link href={"#"} className="text-blue-600">
          Show all
        </Link>
      </div>
      <div className="flex items-center justify-center gap-1">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-1 h-1 rounded-full transition-all",
              index === current ? "bg-blue-900 w-8" : "bg-slate-300"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="flex items-center gap-1 text-muted-foreground">
        <button className="bg-none p-2">
          <ThumbsUp className="w-4 h-4" />
        </button>
        <button className="bg-none p-2">
          <ThumbsDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
