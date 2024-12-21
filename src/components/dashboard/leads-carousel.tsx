import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Lead } from "@/utils/type";
import { Dot, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Modal from "./modal";

interface LeadsCarouselProps {
  leads: Lead[];
  itemsPerGroup: number;
}

const LeadsCarousel: React.FC<LeadsCarouselProps> = ({
  leads,
  itemsPerGroup,
}) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [activeLead, setActiveLead] = useState<number>(0);

  const [dynamicItemsPerGroup, setDynamicItemsPerGroup] =
    useState(itemsPerGroup);

  useEffect(() => {
    const updateItemsPerGroup = () => {
      let newItemsPerGroup = itemsPerGroup;

      if (window.innerWidth < 640) {
        newItemsPerGroup = 1;
      } else if (window.innerWidth < 1024) {
        newItemsPerGroup = 2;
      }

      setDynamicItemsPerGroup(newItemsPerGroup);

      if (api) {
        const totalGroups = Math.ceil(leads.length / newItemsPerGroup);
        setCount(totalGroups);
        setCurrent(api.selectedScrollSnap() + 1);
      }
    };

    updateItemsPerGroup();
    window.addEventListener("resize", updateItemsPerGroup);

    return () => window.removeEventListener("resize", updateItemsPerGroup);
  }, [itemsPerGroup, api, leads.length]);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const groupedLeads = leads.reduce<Lead[][]>((acc, lead, index) => {
    const groupIndex = Math.floor(index / dynamicItemsPerGroup);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(lead);
    return acc;
  }, []);
  return (
    <>
      <Carousel setApi={setApi} className="max-w-4xl">
        <CarouselContent>
          {groupedLeads.map((leadGroup, groupIndex) => (
            <CarouselItem
              className="cursor-pointer flex items-center justify-center"
              key={groupIndex}
            >
              <div className="w-full flex items-center gap-3 px-4 py-0">
                {leadGroup.map((lead, leadIndex) => (
                  <div
                    key={lead.name}
                    onClick={() => {
                      const calculatedIndex =
                        groupIndex * itemsPerGroup + leadIndex;
                      setOpenModal(true);
                      setActiveLead(calculatedIndex);
                    }}
                    className="flex flex-col gap-2 border rounded-xl shadow-sm p-4 flex-1 w-full h-full max-h-[300px]"
                  >
                    <div className="w-full flex items-center gap-2 justify-start">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={lead.avatar} />
                        <AvatarFallback className="text-sm">
                          {lead.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-0">
                        <h4 className="text-[12px] font-bold">{lead.name}</h4>
                        <span className="text-[10px] text-muted-foreground line-clamp-1">
                          {lead.title}
                        </span>
                      </div>
                    </div>
                    <div className="relative flex flex-col gap-1 bg-gradient-to-r from-blue-50 to-gray-50 p-4 rounded-xl">
                      <div className="rounded-sm p-1 right-0 top-0 absolute shadow-2xl bg-white">
                        <Sparkles className="w-4 h-4 text-slate-900" />
                      </div>
                      <div className="flex items-center justify-start gap-1">
                        <lead.activity.icon className="h-4 w-4" />
                        <h4 className="text-[12px] font-bold">
                          {lead.activity.text}
                        </h4>
                      </div>
                      <span className="text-[12px] line-clamp-2">
                        {lead.details}
                      </span>
                    </div>
                    <div className="flex items-center text-[12px] px-2">
                      <span>{lead.tags[0]}</span>
                      <Dot />
                      <span>{lead.tags[1]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-600" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 text-blue-600" />
      </Carousel>

      {/* Carousel Dots */}
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

      {openModal && activeLead && (
        <Modal
          activelead={activeLead}
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default LeadsCarousel;
