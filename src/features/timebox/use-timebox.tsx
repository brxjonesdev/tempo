'use client';

import { useEffect, useState } from 'react';
import { updateTimebox } from './services/updateTimeboxById';
import { err } from '@/lib/result';
import { deleteTimeboxByID } from './services/deleteTimeboxByID';
import { addTimeboxToQueue } from './services/addTimeboxToQueue';
import { fetchTimeboxesFromDB } from './services/fetchTimeboxes';

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
  const [timeboxes, setTimeboxes] = useState<Timebox[]>([]);
  const [currentTimebox, setCurrentTimebox] = useState<Timebox | null>(null);

  useEffect(() => {
  async function loadTimeboxes() {
      const result = fetchTimeboxes();
      if (!result.ok) {
        console.error("Failed to load timeboxes:", result.error);
        return;
      }
      setTimeboxes(result.data);
}
    loadTimeboxes();
    return () => {
      setCurrentTimebox(null);
    };
  }, []);

  function fetchTimeboxes(){
    const result = fetchTimeboxesFromDB()
    if (!result.ok) {
      return err(result.error);
    }
    return result;
  }
  function scheduleTimebox(goal: string, duration: number) {
    const newTimebox: Timebox = {
      id: Date.now().toString(),
      goal,
      duration,
      isCompleted: false,
      isActive: false,
    };
    setTimeboxes((prev) => [...prev, newTimebox]);
    const response = addTimeboxToQueue(newTimebox);
    if (!response.ok) {
      setTimeboxes((prev) => prev.filter((tb) => tb.id !== newTimebox.id));
      return err(response.error);
    }
  }

  function startTimebox(timebox: Timebox) {
    selectTimeboxFromQueue(timebox);
  }

  function timeboxControls(intent: string) {
    if (!currentTimebox) return;

    switch (intent) {
      case 'complete':
        setCurrentTimebox((prev) => ({
          ...prev!,
          isCompleted: true,
          isActive: false,
        }));
      case 'reset':
        setCurrentTimebox(null);
        setTimeboxes((prev) => prev.map((tb) => ({ ...tb, isActive: false })));
        break;
    }
  }

  function selectTimeboxFromQueue(timebox: Timebox) {
    console.log('Selected timebox:', timebox);
    setCurrentTimebox({ ...timebox, isActive: true });
    setTimeboxes((prev) =>
      prev.map((tb) =>
        tb.id === timebox.id ? { ...tb, isActive: true } : { ...tb, isActive: false },
      ),
    );
  }

  function updateTimeboxById(timeboxId: string, updatedTimebox: Partial<Timebox>) {
    setTimeboxes((prev) =>
      prev.map((tb) => (tb.id === timeboxId ? { ...tb, ...updatedTimebox } : tb)),
    );
    const response = updateTimebox({
      id: timeboxId,
      updatedTimebox,
    })
    if (!response.ok) {
      // revert the state if update fails
      setTimeboxes((prev) =>
        prev.map((tb) => (tb.id === timeboxId ? { ...tb, ...updatedTimebox } : tb)),
      );
      return err(response.error);
    }
  }

  function deleteTimebox(timeboxId: string) {
    const timeboxToDelete = timeboxes.find((tb) => tb.id === timeboxId);
    if (!timeboxToDelete) return err("Timebox not found");

    setTimeboxes((prev) => prev.filter((tb) => tb.id !== timeboxId));
    const response = deleteTimeboxByID(timeboxId);
    if (!response.ok) {
      setTimeboxes((prev) => [...prev, timeboxToDelete]);
      return err(response.error);
    }
  }

  return {
    currentTimebox,
    scheduleTimebox,
    selectTimeboxFromQueue,
    setTimeboxes,
    startTimebox,
    timeboxControls,
    timeboxes,
    updateTimeboxById,
    deleteTimebox,
  };
}
