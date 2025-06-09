'use client';

import { useEffect, useState } from 'react';
import { updatePersistedTimebox} from '../services/updateTimeboxById';
import { err, Result, ok } from '@/lib/result';
import { deleteTimeboxByID } from '../services/deleteTimeboxByID';
import { addTimeboxToQueue } from '../services/addTimeboxToQueue';
import { fetchTimeboxesFromDB } from '../services/fetchTimeboxes';
import { nanoid } from 'nanoid';

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
  const [status, setStatus] = useState({
    loading: false,
    error: null as string | null,
  })
  useEffect(() => {
  async function loadTimeboxes() {
      const result = await fetchTimeboxes();
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

  async function fetchTimeboxes(){
    const result =  await fetchTimeboxesFromDB()
    if (!result.ok) {
      return err(result.error);
    }
    return result;
  }

  function updateTimeboxById(timeboxId: string, updatedTimebox: Partial<Timebox>){
    const existingTimebox = timeboxes.find((tb) => tb.id === timeboxId);
    setTimeboxes((prev) =>
      prev.map((tb) => (tb.id === timeboxId ? { ...tb, ...updatedTimebox } : tb)),
    );
  const response = updatePersistedTimebox( timeboxId, updatedTimebox );
    if (!response.ok) {
    setTimeboxes((prev) =>
        prev.map((tb) => (tb.id === timeboxId ? { ...tb, ...existingTimebox } : tb)),
      );
      return err(response.error);
    }
    return ok(true);
  }

  function deleteTimebox(timeboxId: string)  {
    const timeboxToDelete = timeboxes.find((tb) => tb.id === timeboxId);
    if (!timeboxToDelete) return err("Timebox not found");

    setTimeboxes((prev) => prev.filter((tb) => tb.id !== timeboxId));
    const response = deleteTimeboxByID(timeboxId);
    if (!response.ok) {
      setTimeboxes((prev) => [...prev, timeboxToDelete]);
      return err(response.error);
    }
  }

  function persistTimebox( goal: string, duration: number): Result<Timebox, string> {
  if (!goal || duration <= 0) {
        return err("Invalid goal or duration");
      }
    const timebox: Timebox = {
        id: `${nanoid(21)}-timeboxes`,
        goal,
        duration,
        isActive: false,
        isCompleted: false,
    }
    setTimeboxes((prev) => [...prev, timebox]);
    const result = addTimeboxToQueue(timebox);
    if (!result.ok) {
        setTimeboxes((prev) => prev.filter((tb) => tb.id !== timebox.id));
        return err(result.error);
    }
    return ok(timebox);
  }

  function selectTimebox(timebox: Timebox) {

    if (!timebox) {
      return err("Timebox not found");
    }
    setCurrentTimebox({ ...timebox, isActive: true });
    setTimeboxes((prev) =>
      prev.map((tb) =>
        tb.id === timebox.id ? { ...tb, isActive: true } : { ...tb, isActive: false },
      ),
    );
  }

  function reset(){
    setCurrentTimebox(null);
    setTimeboxes((prev) => prev.map((tb) => ({ ...tb, isActive: false })));
  }

  function completeTimebox(timeboxId: string) {
    const timebox = timeboxes.find(tb => tb.id === timeboxId);
    if (!timebox) return err("Timebox not found");

    const updatedTimebox = { ...timebox, isCompleted: true };
    const response = updateTimeboxById(timeboxId, updatedTimebox);
    if (!response) {
      setTimeboxes((prev) => prev.map((tb) => (tb.id === timeboxId ? { ...tb, isCompleted: false } : tb)));
      setCurrentTimebox(null);
      return err("Failed to complete timebox");
    }
    setCurrentTimebox(null);
  }


  return {
    currentTimebox,
    persistTimebox,
    selectTimebox,
    setTimeboxes,
    reset,
    completeTimebox,
    timeboxes,
    updateTimeboxById,
    deleteTimebox,
    status,
  };
}
