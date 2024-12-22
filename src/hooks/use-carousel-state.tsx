"use client";

import { CarouselApi } from "@/components/ui/carousel";
import { Lead } from "@/utils/type";
import { useEffect, useState } from "react";

export const useCarouselState = (leads: Lead[], itemsPerGroup: number) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
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

  return {
    api,
    setApi,
    current,
    count,
    dynamicItemsPerGroup,
  };
};
