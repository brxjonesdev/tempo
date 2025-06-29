'use client';
import { Button } from '@/shared/components/ui/button';
import { CardContent } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

export default function CreateTimeblock({
  onQuickStart,
  onSchedule,
}: {
  onQuickStart: (goal: string, duration: number) => void;
  onSchedule: (goal: string, duration: number) => void;
}) {
  const [selectedTime, setSelectedTime] = useState({ hours: 1, minutes: 30 });
  const [goal, setGoal] = useState('');

  function handleQuickStart() {
    const totalDuration = selectedTime.hours * 60 + selectedTime.minutes;
    if (goal.trim() && totalDuration > 0) {
      onQuickStart(goal.trim(), totalDuration * 60); // convert to seconds
      setGoal('');
      setSelectedTime({ hours: 1, minutes: 30 }); // reset to default
    }
  }

  function handleScheduleLater() {
    const totalDuration = selectedTime.hours * 60 + selectedTime.minutes;
    if (goal.trim() && totalDuration > 0) {
      onSchedule(goal.trim(), totalDuration * 60); // convert to seconds
      setGoal('');
      setSelectedTime({ hours: 1, minutes: 30 }); // reset to default
    }
  }
  return (
    <section className="space-y-6 flex-1 flex flex-col font-heading font-normal">
      <div className="space-y-3">
        <Label htmlFor="timeblock-name" className="-tracking-wide">
          What would you like to focus on?
        </Label>
        <Input
          id="timeblock-name"
          placeholder="e.g. Write a blog post"
          className="mt-2 w-full bg-white"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
      </div>
      <div className="space-y-3">
        <Label htmlFor="timeblock-duration" className=" -tracking-wide mt-4">
          How long will it take?
        </Label>
        <CardContent>
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center space-y-2">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setSelectedTime((prev) => ({
                      ...prev,
                      hours: Math.max(0, prev.hours - 1),
                    }))
                  }
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-16 text-center">
                  <Input
                    type="number"
                    value={selectedTime.hours}
                    onChange={(e) =>
                      setSelectedTime((prev) => ({
                        ...prev,
                        hours: Math.max(0, Number.parseInt(e.target.value) || 0),
                      }))
                    }
                    className="text-center font-bold h-16 border-none focus:border-0"
                    min="0"
                    max="23"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setSelectedTime((prev) => ({
                      ...prev,
                      hours: Math.min(23, prev.hours + 1),
                    }))
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="text-2xl font-bold text-muted-foreground">:</div>

            <div className="text-center space-y-2">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className=""
                  onClick={() =>
                    setSelectedTime((prev) => ({
                      ...prev,
                      minutes: Math.max(0, prev.minutes - 5),
                    }))
                  }
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-16 text-center">
                  <Input
                    type="number"
                    value={selectedTime.minutes}
                    onChange={(e) =>
                      setSelectedTime((prev) => ({
                        ...prev,
                        minutes: Math.max(
                          0,
                          Math.min(59, Number.parseInt(e.target.value) || 0),
                        ),
                      }))
                    }
                    className="text-center font-bold h-16 border-none focus:border-0 "
                    min="0"
                    max="59"
                    step="5"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setSelectedTime((prev) => ({
                      ...prev,
                      minutes: Math.min(59, prev.minutes + 5),
                    }))
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
      <div className=" flex-1 flex flex-col font-heading gap-4">
        <Button
          onClick={handleQuickStart}
          disabled={
            !goal.trim() || (selectedTime.hours === 0 && selectedTime.minutes === 0)
          }
          className="py-4 bg-[#6aacaf] text-[#f8f8f8]"
          size={'lg'}
        >
          Start {selectedTime.hours > 0 && `${selectedTime.hours}h`}
          {selectedTime.minutes > 0 && `${selectedTime.minutes}min`} Timeblock
        </Button>
        <Button
          onClick={handleScheduleLater}
          disabled={
            !goal.trim() || (selectedTime.hours === 0 && selectedTime.minutes === 0)
          }
          className="py-4"
          variant="secondary"
        >
          Schedule Later
        </Button>
      </div>
    </section>
  );
}
