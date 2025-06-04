"use client"
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { BookA, ChevronLeft, ChevronRight } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/shared/components/ui/toggle-group"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components/ui/carousel"
import { Separator } from "@/shared/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"


export default function Home() {
  const presets = [
  { title: "Pomodoro", description: "25 min focus / 5 min break", duration: 25 },
  { title: "Creative Sprint", description: "60 minutes of uninterrupted creation", duration: 60 },
  { title: "Quick Win", description: "15 minutes to overcome inertia", duration: 15 },
]
  return (
   <main className="bg-[#e1f5f3] min-h-screen flex flex-col items-center p-4 w-full font-body font-medium gap-4 overflow-hidden">
   

    <section className="max-w-7xl w-full space-y-4 lg:space-y-0 lg:flex gap-4 flex-1 flex-col">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
          Tempo
        </h2>
      </div>
      <div className="lg:grid grid-cols-2 gap-4 space-y-4">
      <Card className="flex-1 h-full">
  <CardHeader>
    <CardTitle>Quick Start</CardTitle>
    <CardDescription>Creating a new timeblock</CardDescription>
  </CardHeader>
  <CardContent>
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
        <Separator className="my-6"/>
    <div>
      <Label htmlFor="timeblock-name" className="font-semibold -tracking-wide">What would you like to focus on?</Label>
      <Input id="timeblock-name" placeholder="e.g. Write a blog post" className="mt-2 w-full" />
    </div>
    <div>
      <Label htmlFor="timeblock-duration" className="font-semibold -tracking-wide mt-4">How long will it take?</Label>
      <ToggleGroup type="single" id="timeblock-duration" defaultValue="30" className="mt-2 w-full">
   {[15, 30, 45, 60, 90, 120].map((mins) => (
          <ToggleGroupItem
            key={mins}
            value={mins.toString()}
            className="rounded-full px-4 py-2 data-[state=on]:bg-slate-800 data-[state=on]:text-white dark:data-[state=on]:bg-slate-200 dark:data-[state=on]:text-slate-900"
          >
            {mins} min
          </ToggleGroupItem>
        ))}
        <ToggleGroupItem
          value="custom"
          className="rounded-full px-4 py-2 data-[state=on]:bg-slate-800 data-[state=on]:text-white dark:data-[state=on]:bg-slate-200 dark:data-[state=on]:text-slate-900"
        >
          Custom
        </ToggleGroupItem>
</ToggleGroup>
    </div>
  </CardContent>
  <CardFooter className="flex flex-col gap-4">
    <Button className="w-full py-8 lg:py-6 text-md" >
        Start Timeblock
      </Button>
      <Button className="w-full py-8 lg:py-6 text-md" variant="secondary">
        Schedule Later
      </Button>
  </CardFooter>
      </Card>
      <Card className="flex-1 h-full">
  <CardHeader>
    <CardTitle>Timeblock Queue</CardTitle>
    <CardDescription>
      Upcoming timeblocks will appear here.
    </CardDescription>
    <CardAction>
      <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant={"outline"}>
      Sort
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="font-heading">
    <DropdownMenuItem>Completed</DropdownMenuItem>
    <DropdownMenuItem>In Progress</DropdownMenuItem>
    <DropdownMenuItem>Upcoming</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
    </CardAction>
  </CardHeader>
  <CardContent className="flex-1 bg-black/5">
    <p>Card Content</p>
  </CardContent>

      </Card>
      </div>
    </section>
   

   </main>
  );
}
