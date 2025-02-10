import { useStore } from "@/entities/game/store/store";
import { useToast } from "@/hooks/use-toast";
import { Route } from "@/routes/game/$id";
import { useGameById } from "@/entities/game/api/games";
import { Button } from "@/shared/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { formatDate } from "@/shared/lib/utils";

export function GamePage() {
  const { id } = Route.useParams();
  const { data, isFetching, error } = useGameById(id);

  const { addFavorite } = useStore();

  const router = useRouter();
  const onBack = () => router.history.back();

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

  const date = formatDate(data.release_date, false);

  return (
    <div className="py-10">
      <div className="container mx-auto mb-[100px]">
        <button onClick={onBack} className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          <span className="mb-[2px]">Return to the games list</span>
        </button>
        <div className="flex gap-12 mt-6">
          <aside className="basis-3/12 flex flex-col gap-2">
            <div className="overflow-hidden">
              <img
                className="w-full object-cover rounded-md"
                src={data.thumbnail}
                alt=""
              />
            </div>
            <Button onClick={() => addFavorite(data, toast)}>
              Add to favorites
            </Button>
          </aside>
          <div>
            <h1 className="text-6xl font-bold">{data.title}</h1>
            <section className="flex flex-col mt-6">
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <span className="w-28 text-base">Release date:</span>
                  <h3 className="text-base">{date}</h3>
                </div>
                <div className="flex gap-2">
                  <span className="w-28 text-base">Publisher:</span>
                  <h3 className="text-base">{data.publisher}</h3>
                </div>
                <div className="flex gap-2">
                  <span className="w-28 text-base">Developer:</span>
                  <h3 className="text-base">{data.developer}</h3>
                </div>
                <div className="flex gap-2">
                  <span className="w-28 text-base">Genre:</span>
                  <h3 className="text-base">{data.genre}</h3>
                </div>
              </div>
            </section>
            <section className="mt-6">
              {data.minimum_system_requirements && (
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-semibold">
                    Minimum system requirements
                  </h2>
                  <ul>
                    <li className="text-base">
                      {data.minimum_system_requirements.os}
                    </li>
                    <li className="text-base">
                      {data.minimum_system_requirements.processor}
                    </li>
                    <li className="text-base">
                      {data.minimum_system_requirements.memory}
                    </li>
                    <li className="text-base">
                      {data.minimum_system_requirements.graphics}
                    </li>
                    <li className="text-base">
                      {data.minimum_system_requirements.storage}
                    </li>
                  </ul>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
      <Carousel
        className="flex justify-center items-center gap-16 w-full"
        opts={{
          // loop: true,
          // initialSlide: activeIndex,

          // slidesPerView: 2,
          spaceBetween: 0,
          breakpoints: {},
        }}
      >
        <CarouselPrevious />
        <CarouselContent>
          {data.screenshots.map((item) => (
            <CarouselItem className="basis-1/3 h-[460px]" key={item.id}>
              <img className="w-full object-cover" src={item.image} alt="" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  );
}
