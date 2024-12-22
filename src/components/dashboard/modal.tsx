"use client";

import { useLeadsContext } from "@/app/context/lead-context";
import { cn } from "@/lib/utils";
import { openLeads } from "@/utils/mockdata";
import { Lead } from "@/utils/type";
import { Globe, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cardData } from "../../utils/mockdata";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { activeIndex: activelead } = useLeadsContext();
  const modalRef = useRef<HTMLDivElement>(null);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);

    if (isOpen && typeof activelead === "number" && activelead >= 0) {
      api.scrollTo(activelead);
      setCurrent(activelead);
    }

    const handleSelect = () => {
      const selected = api.selectedScrollSnap();
      setCurrent(selected);
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api, activelead, isOpen]);

  const handleNext = () => {
    if (!api) return;
    const nextIndex = Math.min(current + 1, count - 1);
    api.scrollTo(nextIndex);
  };

  const handlePrev = () => {
    if (!api) return;
    const prevIndex = Math.max(current - 1, 0);
    api.scrollTo(prevIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const groupedLeads = openLeads.reduce((acc, lead, index) => {
    const groupIndex = Math.floor(index / 1);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(lead);
    return acc;
  }, [] as Lead[][]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleFocusTrap = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener("keydown", handleFocusTrap);
      firstElement?.focus();

      return () => document.removeEventListener("keydown", handleFocusTrap);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30"
      aria-hidden={!isOpen}
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className="relative w-full h-full max-w-96 lg:max-w-[600px] flex items-center justify-center"
        ref={modalRef}
      >
        <Carousel setApi={setApi} className="max-w-full">
          <CarouselContent>
            {groupedLeads.map((leadPair, index) => (
              <CarouselItem className="cursor-pointer" key={index}>
                <div className="w-full flex items-center justify-center gap-3 h-full">
                  {leadPair.map((lead) => {
                    return (
                      <div
                        key={lead.id}
                        className="w-full transition-all md:w-[600px] px-2 py-6 md:p-6 z-50 relative border-2 border-transparent shadow-2xl border-purple-800 rounded-none md:rounded-xl bg-white"
                      >
                        <div className="w-full h-full flex flex-col gap-4">
                          <div className="flex items-center gap-2">
                            <div className="rounded-sm bg-neutral-300 p-2 flex items-center justify-center">
                              <Globe className="text-blue-950 w-2 h-2" />
                            </div>
                            <h2 id="modal-title" className="text-sm font-bold">
                              Engage with {lead.name}
                            </h2>
                            <div className="ml-auto">
                              <button
                                className="absolute top-4 z-50 right-4 text-gray-500 hover:text-gray-800"
                                aria-label="Close modal"
                                onClick={onClose}
                              >
                                ✖
                              </button>
                            </div>
                          </div>
                          <div className="shadow-lg bg-white w-full rounded-xl p-3 border">
                            <div className="w-full flex items-center gap-2 justify-start">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={lead.avatar} />
                                <AvatarFallback className="text-sm">
                                  {lead.name.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col gap-0">
                                <h4 className="text-[12px] font-bold">
                                  {lead.name}
                                </h4>
                                <span className="text-[10px] text-muted-foreground line-clamp-1">
                                  {lead.title}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gradient-to-br rounded-lg p-2 h-full w-full flex flex-col gap-3 to-blue-50 from-gray-50">
                            <div className="w-full flex items-center gap-2 p-2 rounded-xl bg-gradient-to-r from-blue-100 to-purple-100">
                              <Sparkles className="text-blue-800" />
                              <span className="text-[10px]">
                                {lead.name} may be interested in upgrading
                                espresso machines for her in-store coffee shops.
                              </span>
                            </div>
                            <Tabs
                              defaultValue="research"
                              className="w-full p-0"
                            >
                              <TabsList className="rounded-md shadow-lg bg-white py-0 px-2 w-full flex items-center justify-start">
                                <TabsTrigger value="engage">Engage</TabsTrigger>
                                <TabsTrigger value="research">
                                  Research
                                </TabsTrigger>
                              </TabsList>
                              <TabsContent value="engage">
                                <div className="w-full min-h-20 flex items-center justify-center">
                                  <span>No Engagement</span>
                                </div>
                              </TabsContent>
                              <TabsContent value="research">
                                <div className="w-full flex flex-col gap-3">
                                  <div className="shadow-lg bg-white w-full rounded-xl p-3 border">
                                    <div className="w-full flex flex-col gap-3 rounded-lg p-2 bg-gradient-to-r from-blue-100 to-blue-50">
                                      <div className="flex flex-col w-full">
                                        <span className="text-blue-800 text-sm">
                                          Why i picked this lead
                                        </span>
                                        <ul className="list-disc pl-5 text-gray-800 text-[10px] mt-2">
                                          <li>
                                            Jane is a key decision maker and was
                                            browsing &quot;espresso
                                            machines&quot; on First
                                            Coffee&apos;s website.
                                          </li>
                                          <li>
                                            Multiple people at her company have
                                            reported &quot;slowness&quot; during
                                            service requests.
                                          </li>
                                          <li>
                                            Northwind Traders currently see
                                            $200M in revenue from their in-store
                                            coffee shops.
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="flex items-center gap-3 w-full">
                                        {cardData.map((card, index) => (
                                          <div
                                            key={`${card.title}_${index}`}
                                            className="flex items-center gap-2 bg-white p-2 shadow-lg rounded-lg"
                                          >
                                            <div className="flex items-center justify-center">
                                              <Image
                                                src={card.icon}
                                                width={40}
                                                height={40}
                                                alt={`${card.title} image`}
                                              />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                              <span className="text-xs">
                                                {card.title}
                                              </span>
                                              <span className="text-xs font-bold text-blue-600">
                                                {card.value}
                                              </span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>
                          </div>
                        </div>
                        <div>
                          {/** Carousel Dot */}
                          <div className="py-2 flex items-center w-full justify-center gap-1">
                            {Array.from({ length: count }).map((_, index) => (
                              <div
                                key={index}
                                className={cn(
                                  "w-1 h-1 rounded-full transition-all",
                                  index === current
                                    ? "bg-blue-900 w-8"
                                    : "bg-slate-300"
                                )}
                                aria-label={`Go to slide ${index + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="absolute left-4 md:-left-4 top-1/2 -translate-y-1/2 text-blue-600"
            onClick={handlePrev}
          />
          <CarouselNext
            className="absolute right-4 md:-right-4 top-1/2 -translate-y-1/2 text-blue-600"
            onClick={handleNext}
          />
        </Carousel>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
