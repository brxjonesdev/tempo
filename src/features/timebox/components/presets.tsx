'use client';
import { Button } from '@/shared/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/carousel';
import { Timebox } from '../hooks/use-timeboxes';

type Preset = {
  id?: string; 
  title: string;
  description: string;
  blurb: string;
  duration: number; // in minutes
};

export const presets = [
    {
      id: 'Pomodoro',
      title: 'Pomodoro',
      description: '25 min focus / 5 min break',
      blurb:
        'Perfect for maintaining productivity without burnout. Great for deep work sessions.',
      duration: 25,
    },
    {
      id: 'Creative Sprint',
      title: 'Creative Sprint',
      description: '60 minutes of uninterrupted creation',
      blurb:
        'Ideal for writing, composing, or designing when you want to enter flow state.',
      duration: 60,
    },
    {
      id: 'Quick Win',
      title: 'Quick Win',
      description: '15 minutes to overcome inertia',
      blurb: 'Low pressure starter—useful for breaking through procrastination.',
      duration: 15,
    },
    {
      id: 'Power Hour',
      title: 'Power Hour',
      description: '60 minutes of focused output',
      blurb: 'Use when you want to crush a to-do list or knock out major tasks quickly.',
      duration: 60,
    },
    {
      title: 'Deep Work',
      description: '90 minutes of intense focus',
      blurb: 'Structured for cognitively demanding work with minimal distraction.',
      duration: 90,
    },
    {
      id: 'Recovery Block',
      title: 'Recovery Block',
      description: '30 minutes of rest or recharge',
      blurb: 'Use after deep sessions for recovery—stretch, walk, hydrate.',
      duration: 30,
    },
    {
      id: 'Admin Sprint',
      title: 'Admin Sprint',
      description: '45 minutes for shallow tasks',
      blurb: 'Handle emails, errands, and logistical work without dragging your day.',
      duration: 45,
    },
    {
      id: 'Zen Mode',
      title: 'Zen Mode',
      description: '20 minutes of quiet reflection or meditation',
      blurb:
        'Helpful for resetting your nervous system, gaining clarity, or centering your mind.',
      duration: 20,
    },
    {
      id: 'Study Block',
      title: 'Study Block',
      description: '50 minutes of learning / 10 min break',
      blurb: 'Structured to absorb knowledge efficiently without fatigue.',
      duration: 50,
    },
    {
      id: 'Evening Wind-down',
      title: 'Evening Wind-down',
      description: '20 minutes of screen-free decompression',
      blurb: 'Perfect for journaling, reading, or calming your mind before sleep.',
      duration: 20,
    },
  ];

export default function Presets({ onSelect }: { onSelect: (timebox: Timebox) => void }) {
  

  function handlePresetSelect(preset: Preset) {
    // convert preset to Timebox format
    const presetTimebox: Timebox = {
      id: preset.id as string,
      goal: preset.title,
      duration: preset.duration * 60,
      isCompleted: false, // default to not completed
      isActive: true,
    };

    onSelect(presetTimebox);
  }

  return (
    <div className="relative space-y-2 ">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {presets.map((preset, i) => (
            <CarouselItem key={i} className="pl-4 ">
              <div className="border rounded-xl p-4 bg-[#cceaec] flex flex-col gap-4 h-full">
                <div>
                  <h4 className="text-lg font-semibold text-[#50696b]">{preset.title}</h4>
                  <p className="text-sm text-muted-foreground">{preset.description}</p>
                </div>
                <div>
                  <p className="text-sm text-[#50696b] hidden lg:block font-heading font-normal">
                    {preset.blurb}
                  </p>
                </div>
                <Button
                  className="text-sm bg-[#50696b] text-[#cceaec]"
                  onClick={() => handlePresetSelect(preset)}
                >
                  Start {preset.duration} min
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

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
          onClick={() =>
            (
              document.querySelector('[data-carousel-prev]') as HTMLElement | null
            )?.click()
          }
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous slide</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() =>
            (
              document.querySelector('[data-carousel-next]') as HTMLElement | null
            )?.click()
          }
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>
    </div>
  );
}
