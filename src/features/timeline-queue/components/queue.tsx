import React from 'react';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import TimeboxCard, { TimeboxCardProps } from './timebox-card';

export default function Queue() {
  const timeblocks: TimeboxCardProps[] = [
  
  ];

  return (
   <Card className="flex flex-col flex-1 bg-white/70 overflow-hidden ">
      <CardHeader>
        <CardTitle>Timeblock Queue</CardTitle>
        <CardDescription className='font-heading font-normal'>Upcoming timeblocks will appear here.</CardDescription>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Sort</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="font-heading">
              <DropdownMenuItem>Completed</DropdownMenuItem>
              <DropdownMenuItem>In Progress</DropdownMenuItem>
              <DropdownMenuItem>Upcoming</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>

      <CardContent className="overflow-y-scroll p-4 space-y-4 flex-1 flex flex-col">
        {timeblocks
        .splice(0, 4) // Limit to 5 for display
        .map((timeblock, index) => (
          <TimeboxCard key={index} {...timeblock} />
        ))}
        { timeblocks.length === 0 && (
          <div className="text-center text-gray-500 flex-1 flex flex-col justify-center items-center text-lg font-heading font-normal">
            <p>No upcoming timeblocks.</p>
            <p>Start a new timebox to add to the queue!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
