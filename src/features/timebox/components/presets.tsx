"use client"
import { Button } from "@/shared/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components/ui/carousel"

export default function Presets() {
  const presets = [
  { title: "Pomodoro", description: "25 min focus / 5 min break", duration: 25 },
  { title: "Creative Sprint", description: "60 minutes of uninterrupted creation", duration: 60 },
  { title: "Quick Win", description: "15 minutes to overcome inertia", duration: 15 },
]
  return (
    <div className="relative space-y-2 order-2">

          <Carousel
            className="w-full"
            
            opts={{
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4">
              {presets.map((preset, i) => (
                <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="border rounded-xl p-4 bg-muted/50 flex flex-col gap-2 h-full">
                    <div>
                      <h4 className="text-lg font-semibold">{preset.title}</h4>
                      <p className="text-sm text-muted-foreground">{preset.description}</p>
                    </div>
                    <Button className="mt-auto w-fit self-end text-sm">Start {preset.duration} min</Button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Hidden native controls for programmatic access */}
            <div className="hidden">
              <CarouselPrevious data-carousel-prev />
              <CarouselNext data-carousel-next />
            </div>
          </Carousel>
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => (document.querySelector("[data-carousel-prev]") as HTMLElement | null)?.click()}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => (document.querySelector("[data-carousel-next]") as HTMLElement | null)?.click()}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
    </div>
  )
}
