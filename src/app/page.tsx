'use client';

import Queue from '@/features/timeline-queue/components/queue';
import Timer from '@/features/timebox/components/timebox-timer';
import useTimebox from '@/features/timebox/use-timebox';
import QuickStart from '@/features/timebox/components/quick-start';




export default function Home() {
  const { currentTimebox } = useTimebox();

  return (
    <main className="bg-[#d6fcff] flex flex-col items-center p-4 w-full font-body font-medium gap-2 h-full">
      <div className="max-w-6xl w-full space-y-4 lg:space-y-0 lg:flex gap-3 flex-1 flex-col h-full">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#93bdc0]">Tempo</h2>
        </div>

        <section className="lg:grid  grid-cols-[40%_60%] gap-4 flex-1 overflow-hidden space-y-6 lg:space-y-0">
          <div>
            {currentTimebox ? (
            <Timer goal={currentTimebox.goal} duration={currentTimebox.duration} />
          ) : (
            <QuickStart/>
          )}
          </div>
          <div className="flex flex-col flex-1 min-h-0">
            <Queue />
          </div>
          
        </section>
      </div>
    </main>
  );
}

