'use client';

import { useState } from 'react';

export type Timebox = {
  id: string;
  goal: string;
  duration: number; // in seconds
  isActive: boolean;
  isCompleted: boolean;
  postBoxReview?: string;
  onSelect?: (timebox: Timebox) => void;
};

export default function useTimebox() {
  const [timeboxes, setTimeboxes] = useState<Timebox[]>([
    {
      id: '1',
      goal: 'Complete project report',
      duration: 3600,
      isCompleted: true,
      isActive: false,
      postBoxReview: "meow meow meow",
    },
    {
      id: '2',
      goal: 'Study for exams',
      duration: 7200,
      isCompleted: false,
      isActive: false,
    },
    {
      id: '3',
      goal: 'Exercise',
      duration: 1800,
      isCompleted: false,
      isActive: false,
    },
  ]);

  const [currentTimebox, setCurrentTimebox] = useState<Timebox | null>(null);

  function scheduleTimebox(goal: string, duration: number) {
    const newTimebox: Timebox = {
      id: Date.now().toString(),
      goal,
      duration,
      isCompleted: false,
      isActive: false,
    };
    setTimeboxes((prev) => [...prev, newTimebox]);
  }

  function startTimebox(timebox: Timebox) {
    selectTimeboxFromQueue(timebox);
  }

  function timeboxControls(intent: string) {
    if (!currentTimebox) return;

    switch (intent) {
      case 'start':
        setCurrentTimebox((prev) => ({ ...prev!, isActive: true }));
        break;
      case 'pause':
        setCurrentTimebox((prev) => ({ ...prev!, isActive: false }));
        break;
      case 'reset':
        setCurrentTimebox(null);
        setTimeboxes((prev) =>
          prev.map((tb) => ({ ...tb, isActive: false }))
        );
        break;
    }
  }

  function selectTimeboxFromQueue(timebox: Timebox) {
    console.log('Selected timebox:', timebox);
    setCurrentTimebox({ ...timebox, isActive: true });
    setTimeboxes((prev) =>
      prev.map((tb) =>
        tb.id === timebox.id
          ? { ...tb, isActive: true }
          : { ...tb, isActive: false }
      )
    );
  }

  return {
    currentTimebox,
    scheduleTimebox,
    selectTimeboxFromQueue,
    setTimeboxes,
    startTimebox,
    timeboxControls,
    timeboxes,
  };
}
