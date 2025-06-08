'use client';

import { useState } from 'react';
type TimeboxState = {
  goal: string;
  duration: number; // in seconds
};
export default function useTimebox() {
  const [currentTimebox, setCurrentTimebox] = useState<TimeboxState | null>(null);
  const [isTimeboxActive, setIsTimeboxActive] = useState(false);


  const updateDuration = (duration: number) => {
  if (currentTimebox) {
      setCurrentTimebox({
        ...currentTimebox,
        duration: duration,
      });
    } else {
      return {error: "No current timebox to update duration"};
    }
  }


  const updateGoal = (goal: string) => {
  if (currentTimebox) {
      setCurrentTimebox({
        ...currentTimebox,
        goal: goal,
      });
    } else {
      return {error: "No current timebox to update goal"};
    }
  }

  return {
    currentTimebox,
  };
}
