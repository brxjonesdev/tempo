import React from 'react'
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
 
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"

export default function Queue() {
  return (
    <Card className="min-h-full bg-white/70">
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
   
  </CardContent>

      </Card>
  )
}
