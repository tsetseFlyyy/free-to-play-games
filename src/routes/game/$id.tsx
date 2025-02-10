import { useStore } from "@/entities/game/store/store";
import { GamePage } from "@/pages/game/page";
import { useGameById } from "@/entities/game/api/games";
import { Button } from "@/shared/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/game/$id")({
  component: React.lazy(() => import("@/pages/game")),
});
