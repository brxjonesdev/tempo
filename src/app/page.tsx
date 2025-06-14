'use client';

import Queue from '@/features/timeline-queue/components/queue';
import Timer from '@/features/timebox/components/timebox-timer';
import useTimebox, { Timebox } from '@/features/timebox/hooks/use-timeboxes';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/shared/components/ui/card';
import Presets from '@/features/timebox/components/presets';
import { Separator } from '@/shared/components/ui/separator';
import CreateTimeblock from '@/features/timebox/components/create-timeblock';

export default function Home() {
  const {
    currentTimebox,
    timeboxes,
    completeTimebox,
    reset,
    selectTimebox,
    persistTimebox,
    updateTimeboxById,
    deleteTimebox
  } = useTimebox();

  return (
    <main className="flex flex-col items-center p-4 w-full font-body font-medium gap-2 h-full">
      <div className="max-w-7xl w-full space-y-4 lg:space-y-0 lg:flex gap-2 flex-1 flex-col h-full mb-4">
        <div className=''>
          <h2 className=" text-lg lg:text-xl font-bold tracking-tight text-[#93bdc0]">Tempo</h2>
        </div>

        <section className="lg:grid grid-cols-3 gap-4 flex-1 space-y-6 lg:space-y-0 ">
          <div>
            {currentTimebox ? (
              <Timer
                goal={currentTimebox.goal}
                duration={currentTimebox.duration}
                onComplete={(postBoxReview?: string) => completeTimebox(currentTimebox.id, postBoxReview)}
                onReset={() => reset()}
              />
            ) : (
              <Card className="flex flex-col flex-1 bg-white/70 overflow-hidden">
                <CardHeader>
                  <CardTitle>Quick Start</CardTitle>
                  <CardDescription className="font-heading font-normal">
                    Creating a new timeblock
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-1 overflow-y-auto">
                  <Presets onSelect={selectTimebox} />
                  <Separator className="my-6" />
                  <CreateTimeblock
                    onQuickStart={async (goal: string, duration: number) => {
                      const result = await persistTimebox(goal, duration);
                      if (!result.ok) {
                        alert(result.error);
                      } else {
                        selectTimebox(result.data);
                      }                      
                    }}
                    onSchedule={(goal, duration) => {
                      persistTimebox(goal, duration);
                    }}
                  />
                </CardContent>
              </Card>
            )}
          </div>
          <div className="flex flex-col flex-1 min-h-0 col-span-2">
            <Queue 
            timeboxes={timeboxes} 
            onSelectTimebox={selectTimebox}
            onDeleteTimebox={(timeboxId: string) => {
              const response = deleteTimebox(timeboxId);
              if (!response) {
                alert("Failed to delete timebox");
              }

            }}
            onUpdateTimebox ={(updatedTimebox: Partial<Timebox>) => {
              const response = updateTimeboxById(updatedTimebox.id as string, updatedTimebox);
              if (!response) {
                alert("Failed to update timebox");
              }
            }}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
