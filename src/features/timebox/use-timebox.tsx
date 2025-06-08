'use client';

import { time } from 'console';
import { useState } from 'react';


export type Timebox = {
  id : string;
  goal: string;
  duration: number; // in seconds
  completionDate: Date | null;
  priority: number; // 1-5 scale
  isActive: boolean;
  isCompleted?: boolean; // optional for future use
  postBoxReview?: string; // optional for future use
  onSelect?: (timebox: Timebox) => void; // callback for selection

}
export default function useTimebox() {
  const [timeboxes, setTimeboxes] = useState<Timebox[]>([
    {
  id: '1',
        goal: 'Complete project report',
        duration: 3600, // 1 hour
        completionDate: null,
        priority: 3,
        isActive: false,
      },
      {
        id: '2',
        goal: 'Study for exams',
        duration: 7200, // 2 hours
        completionDate: null,
        priority: 4,
        isActive: false,
      },
      {
        id: '3',
        goal: 'Exercise',
        duration: 1800, // 30 minutes
        completionDate: null,
        priority: 2,
        isActive: false,
    }
  ]);
  const [currentTimebox, setCurrentTimebox] = useState<Timebox | null>(null);
  const [isTimeboxActive, setIsTimeboxActive] = useState(false);


  function scheduleTimebox(timebox: Partial<Timebox>){
    setTimeboxes((prev) => {
      const newTimebox: Timebox = {
        id: (prev.length + 1).toString(),
        goal: timebox.goal || '',
        duration: timebox.duration || 3600, // default to 1 hour if not provided
        completionDate: null,
        priority: timebox.priority || 3, // default priority
        isActive: false,
      };
      return [...prev, newTimebox];
    });
  }

  function startPreset(preset: Timebox) {
    setCurrentTimebox({
      ...preset,
      isActive: true,
    });
    setIsTimeboxActive(true);
  }
  
  function timeboxControls(intent: string) {
    if (!currentTimebox) return;

    switch (intent) {
      case 'start':
        setCurrentTimebox((prev) => ({ ...prev!, isActive: true }));
        setIsTimeboxActive(true);
        break;
      case 'pause':
        setCurrentTimebox((prev) => ({ ...prev!, isActive: false }));
        setIsTimeboxActive(false);
        break;
      case 'reset':
        setCurrentTimebox(null)
        break;
      default:
        break;
    }
  }


  return {
    currentTimebox,
    timeboxes,
    setTimeboxes,
    scheduleTimebox,
    startPreset,
    timeboxControls,
  };
}
