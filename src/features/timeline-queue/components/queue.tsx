import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import TimeboxCard from './timebox-card';
import { Timebox } from '@/features/timebox/hooks/use-timeboxes';


export default function Queue({
  timeboxes,
  onSelectTimebox,
  onUpdateTimebox,
  onDeleteTimebox,
}: {
  timeboxes: Timebox[];
  onSelectTimebox: (timebox: Timebox) => void;
  onUpdateTimebox: (updatedTimebox: Partial<Timebox>) => void;
  onDeleteTimebox: (timeboxId: string) => void;
}) {
  return (
    <Card className="flex flex-col flex-1 bg-white/70 overflow-hidden ">
      <CardHeader>
        <CardTitle>Timeblock Queue</CardTitle>
        <CardDescription className="font-heading font-normal">
          Upcoming timeblocks will appear here.
        </CardDescription>
      </CardHeader>

      <CardContent className="overflow-y-scroll p-4 space-y-4 flex-1 flex flex-col">
        {timeboxes.map((timebox, index) => (
          <TimeboxCard
            key={index}
            {...timebox}
            onSelect={() => {
              onSelectTimebox(timebox);
            }}
            onUpdate={(updatedTimebox: Partial<Timebox>) => {
              onUpdateTimebox({ id: timebox.id, ...updatedTimebox });
            }}
            onDelete={() => {
              onDeleteTimebox(timebox.id);
            }}
          />
        ))}
        {timeboxes.length === 0 && (
          <div className="text-center text-gray-500 flex-1 flex flex-col justify-center items-center text-lg font-heading font-normal">
            <p>No upcoming timeblocks.</p>
            <p>Start a new timebox to add to the queue!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
