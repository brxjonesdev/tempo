"use client"
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/shared/components/ui/toggle-group"

export default function CreateTimeblock({ onStart }: { onStart: (goal: string, duration: number) => void }) {
  return (
    <section className="space-y-6 flex-1">
    <div>
      <Label htmlFor="timeblock-name" className="font-semibold -tracking-wide">What would you like to focus on?</Label>
      <Input id="timeblock-name" placeholder="e.g. Write a blog post" className="mt-2 w-full bg-white" />
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
    <div className="space-y-4">
       <Button className="w-full py-8 lg:py-6 text-md" >
        Start Timeblock
      </Button>
      <Button className="w-full py-8 lg:py-6 text-md" variant="secondary">
        Schedule Later
      </Button>
    </div>
    </section>
  )
}
