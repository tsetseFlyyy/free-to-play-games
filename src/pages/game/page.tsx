import { useStore } from "@/entities/game/lib";
import { useToast } from "@/hooks/use-toast";
import { Route } from "@/routes/game/$id";
import { useGameById } from "@/shared/api/games";
import { Button } from "@/shared/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel";
import { Suspense, useEffect } from "react";

export function GamePage() {
  const { id } = Route.useParams();
  const { data, isFetching, error } = useGameById(id);

  const { addFavorite, removeFavorite } = useStore();

  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Ошибка загрузки",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  if (isFetching)
    return (
      <>
        <h1>Loading...</h1>
        <h1>Loading...</h1>
        <h1>Loading...</h1>
        <h1>Loading...</h1>
        <h1>Loading...</h1>
        <h1>Loading...</h1>
      </>
    );

  if (!data) return <h1>Игра не найдена</h1>;

  return (
    <Suspense
      fallback={
        <div>
          <h1>Suspense</h1>
          <h1>Suspense</h1>
          <h1>Suspense</h1>
          <h1>Suspense</h1>
          <h1>Suspense</h1>
          <h1>Suspense</h1>
        </div>
      }
    >
      <div className="py-[150px]">
        <div className="mx-auto w-2/4 mb-[100px]">
          <div className="flex">
            <img src={data.thumbnail} alt="" />
            <div>
              <h1>{data.title}</h1>
              <h3>{new Date(data.release_date).toLocaleDateString("ru-RU")}</h3>
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
          <Button onClick={() => addFavorite(data, toast)}>
            Add to favorites
          </Button>
          <Button
            variant="outline"
            onClick={() => removeFavorite(data.id, toast)}
          >
            Remove from favorites
          </Button>
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
    </Suspense>
  );
}
