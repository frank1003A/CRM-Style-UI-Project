"use client";

import { useLeadsContext } from "@/app/context/lead-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCarouselState } from "@/hooks/use-carousel-state";
import { cn } from "@/lib/utils";
import { Lead } from "@/utils/type";
import { Dot, Sparkles } from "lucide-react";
import { useState } from "react";
import {
  Carousel,
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

interface LeadsCarouselProps {
  leads: Lead[];
  itemsPerGroup: number;
}

interface LeadCardProps {
  lead: Lead;
  onClick: () => void;
}

interface CarouselDotsProps {
  count: number;
  current: number;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col gap-2 border rounded-xl shadow-sm p-4 flex-1 w-full h-full max-h-[300px] transition-all duration-300 hover:bg-gradient-to-br from-blue-50 via-white to-blue-50"
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
          <h4 className="text-[12px] font-bold">{lead.activity.text}</h4>
        </div>
        <span className="text-[12px] line-clamp-2">{lead.details}</span>
      </div>
      <div className="flex items-center text-[12px] px-2">
        <span>{lead.tags[0]}</span>
        <Dot />
        <span>{lead.tags[1]}</span>
      </div>
    </div>
  );
};

const CarouselDots: React.FC<CarouselDotsProps> = ({ count, current }) => {
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

const LeadsCarousel: React.FC<LeadsCarouselProps> = ({
  leads,
  itemsPerGroup,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const { setActiveIndex } = useLeadsContext();
  const { setApi, current, count, dynamicItemsPerGroup } = useCarouselState(
    leads,
    itemsPerGroup
  );

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
                  <LeadCard
                    key={lead.name}
                    lead={lead}
                    onClick={() => {
                      const calculatedIndex =
                        groupIndex * itemsPerGroup + leadIndex;
                      setActiveIndex(calculatedIndex);
                      setOpenModal(true);
                    }}
                  />
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-600" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 text-blue-600" />
      </Carousel>

      <CarouselDots count={count} current={current} />

      {openModal && (
        <Modal isOpen={openModal} onClose={() => setOpenModal(false)} />
      )}
    </>
  );
};

export default LeadsCarousel;
