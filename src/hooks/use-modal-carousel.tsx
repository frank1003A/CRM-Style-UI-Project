"use client";
import { CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

export const useModalCarousel = (isOpen: boolean, activeLead: number) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);

    if (isOpen && typeof activeLead === "number" && activeLead >= 0) {
      api.scrollTo(activeLead);
      setCurrent(activeLead);
    }

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api, activeLead, isOpen]);

  const handleNext = () => {
    if (!api) return;
    const currentIndex = api.selectedScrollSnap();
    const nextIndex = Math.min(currentIndex + 1, count - 1);
    api.scrollTo(nextIndex);
  };

  const handlePrev = () => {
    if (!api) return;
    const currentIndex = api.selectedScrollSnap();
    const prevIndex = Math.max(currentIndex - 1, 0);
    api.scrollTo(prevIndex);
  };

  return { api, setApi, current, count, handleNext, handlePrev };
};
