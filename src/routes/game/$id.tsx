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

function RouteComponent() {
  const { id } = Route.useParams();
  const { data, isFetching } = useGameById(id);

  const { addFavorite } = useStore();

  if (isFetching) return <h1>Loading...</h1>;

  return (
    <div className="py-[150px]">
      <div className="mx-auto w-2/4 mb-[100px]">
        <div className="flex">
          <img src={data.thumbnail} alt="" />
          <div>
            <h1>{data.title}</h1>
            <h3>{data.release_date}</h3>
            <h3>{data.publisher}</h3>
            <h3>{data.developer}</h3>
            <h3>{data.genre}</h3>
          </div>
        </div>
        {data.minimum_system_requirements && (
          <div>
            <h2>Minimum system requirements</h2>
            <ul>
              <li>{data.minimum_system_requirements.os}</li>
              <li>{data.minimum_system_requirements.processor}</li>
              <li>{data.minimum_system_requirements.memory}</li>
              <li>{data.minimum_system_requirements.graphics}</li>
              <li>{data.minimum_system_requirements.storage}</li>
            </ul>
          </div>
        )}
        <Button onClick={() => addFavorite(data)}>Add to favorites</Button>
      </div>
      <Carousel
        className="w-full"
        opts={{
          // loop: true,
          // initialSlide: activeIndex,
          // slidesPerView: 2,
          spaceBetween: 0,
          breakpoints: {},
        }}
      >
        <CarouselContent>
          {data.screenshots.map((item) => (
            <CarouselItem className="basis-1/2" key={item.id}>
              <img className="carousel-image" src={item.image} alt="" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
