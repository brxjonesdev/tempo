"use client";

import { useState } from 'react';
type TimeboxState = {
    goal: string;
    duration: number; // in seconds
}
export default function useTimebox() {
    const [currentTimebox, setCurrentTimebox] = useState<TimeboxState | null>(null);
  
    return {
        currentTimebox,
        setCurrentTimebox,
    }
}
