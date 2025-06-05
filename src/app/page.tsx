"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Separator } from "@/shared/components/ui/separator";
import Presets from "@/features/timebox/components/presets";
import CreateTimeblock from "@/features/timebox/components/create-timeblock";
import Queue from "@/features/timeline-queue/components/queue";
import Timer from "@/features/timebox/components/timebox-timer";
import useTimebox from "@/features/timebox/use-timebox";


export default function Home() {
  const { currentTimebox, setCurrentTimebox } = useTimebox()

  
  return (
   <main className="bg-[#e1f5f3] min-h-screen flex flex-col items-center p-4 w-full font-body font-medium gap-4 overflow-hidden">
   

    <section className="max-w-7xl w-full space-y-4 lg:space-y-0 lg:flex gap-4 flex-1 flex-col">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
          Tempo
        </h2>
      </div>
      <div className="lg:grid grid-cols-2 gap-4 space-y-4 flex-1">


  {currentTimebox ? (
    <Timer
  goal="Focus on your task"
  duration={25 * 60}
    />
  ) : <Card className="flex-1 h-full">
      <CardHeader>
        <CardTitle>Quick Start</CardTitle>
        <CardDescription>Creating a new timeblock</CardDescription>
      </CardHeader>
      <CardContent>
        <Presets/>
        <Separator className="my-6"/>
        <CreateTimeblock
          onStart={(goal, duration) => setCurrentTimebox({ goal, duration })} 
        />
      </CardContent>
    </Card> }



      <Queue/>
      </div>
    </section>
   

   </main>
  );
}
