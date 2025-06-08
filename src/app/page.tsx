'use client';

import Queue from '@/features/timeline-queue/components/queue';
import Timer from '@/features/timebox/components/timebox-timer';
import useTimebox from '@/features/timebox/use-timebox';
import QuickStart from '@/features/timebox/components/quick-start';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/components/ui/card'
import Presets from '@/features/timebox/components/presets';
import { Separator } from '@/shared/components/ui/separator';
import CreateTimeblock from '@/features/timebox/components/create-timeblock';



export default function Home() {
  const { currentTimebox, timeboxes, setTimeboxes, startPreset, timeboxControls} = useTimebox();

  return (
    <main className="bg-[#d6fcff] flex flex-col items-center p-4 w-full font-body font-medium gap-2 h-full">
      <div className="max-w-7xl w-full space-y-4 lg:space-y-0 lg:flex gap-3 flex-1 flex-col h-full">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#93bdc0]">Tempo</h2>
        </div>

        <section className="lg:grid grid-cols-3 gap-4 flex-1 overflow-hidden space-y-6 lg:space-y-0">
          <div>
            {currentTimebox ? (
            <Timer 
            goal={currentTimebox.goal} 
            duration={currentTimebox.duration}
            onComplete={() => timeboxControls('complete')}
            onPause={() => timeboxControls('pause')}
            onResume={() => timeboxControls('resume')}
            onStart={() => timeboxControls('start')}
            onReset={() => timeboxControls('reset')}
             />
          ) : (
              <Card className="flex flex-col flex-1 bg-white/70 overflow-hidden">
                  <CardHeader>
                    <CardTitle>Quick Start</CardTitle>
                    <CardDescription className='font-heading font-normal'>Creating a new timeblock</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1 overflow-y-auto">
                    <Presets onSelect={startPreset}/>
                    <Separator className="my-6" />
                    <CreateTimeblock />
                  </CardContent>
                </Card>
          )}
          </div>
          <div className="flex flex-col flex-1 min-h-0 col-span-2">
            <Queue
            timeboxes={timeboxes}
            onSelectTimebox={ (timebox) => {
              setTimeboxes((prev) => prev.map(tb => tb.id === timebox.id ? { ...tb, isActive: true } : { ...tb, isActive: false }));
            }}
            />
          </div>
          
        </section>
      </div>
    </main>
  );
}

