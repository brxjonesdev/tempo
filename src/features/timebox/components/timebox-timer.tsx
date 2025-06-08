'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

type TimerProps = {
  goal: string;
  duration: number; // duration in seconds
  onComplete?: () => void; // callback for completion
  onReset?: () => void; // callback for reset
};

export default function Timer({
  goal,
  duration,
  onComplete,
  onReset,
}: TimerProps) {
  console.log('Timer rendered with goal:', goal, 'and duration:', duration);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Calculate progress percentage
  const progress = ((duration - timeLeft) / duration) * 100;
  const circumference = 2 * Math.PI * 130; // radius of 130
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start timer
  const startTimer = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
      const id = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setIntervalId(id);
    }
  };

  // Pause timer
  const pauseTimer = () => {
    setIsRunning(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  // Reset timer
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(duration);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  // Complete task manually
  const completeTask = () => {
    setIsRunning(false);
    setTimeLeft(0);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  // Toggle play/pause
  const toggleTimer = () => {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  // Timer completion effect
  const isCompleted = timeLeft === 0;

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white/70 rounded-3xl shadow-xl  min-h-full">
      {/* Goal */}
      <motion.h2
        className="text-2xl font-semibold text-gray-800 mb-10 text-center leading-relaxed"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {goal}
      </motion.h2>

      {/* Circular Timer */}
      <div className="relative mb-12">
        <motion.div
          className="relative"
          animate={isCompleted ? { scale: [1, 1.05, 1] } : {}}
          transition={{
            duration: 0.6,
            repeat: isCompleted ? Number.POSITIVE_INFINITY : 0,
            repeatDelay: 0.5,
          }}
        >
          <svg width="300" height="300" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="150"
              cy="150"
              r="130"
              stroke="#cceaec"
              strokeWidth="12"
              fill="transparent"
            />

            {/* Progress circle */}
            <motion.circle
              cx="150"
              cy="150"
              r="130"
              stroke={isCompleted ? '#50696b' : '#50696b'}
              strokeWidth="12"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </svg>

          {/* Time display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center font-heading">
            <AnimatePresence mode="wait">
              <motion.div
                key={timeLeft}
                className={`text-6xl font-bold ${isCompleted ? 'text-green-600' : 'text-gray-800'}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isCompleted ? null : formatTime(timeLeft)}
              </motion.div>
            </AnimatePresence>

            {isCompleted && (
              <motion.p
                className="text-xl text-green-600 font-medium "
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Task Complete!
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mb-8">
        <Button
          onClick={toggleTimer}
          disabled={isCompleted}
          size="lg"
          className={`rounded-full w-20 h-20 ${
            isRunning
              ? 'bg-orange-500 hover:bg-orange-600'
              : 'bg-cyan-500 hover:bg-cyan-600'
          } transition-colors duration-200`}
        >
          <motion.div whileTap={{ scale: 0.9 }} transition={{ duration: 0.1 }}>
            {isRunning ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white ml-1" />
            )}
          </motion.div>
        </Button>

        <Button
          onClick={completeTask}
          disabled={isCompleted}
          size="lg"
          className="rounded-full w-20 h-20 bg-green-500 hover:bg-green-600 transition-colors duration-200"
        >
          <motion.div whileTap={{ scale: 0.9 }} transition={{ duration: 0.1 }}>
            <CheckCircle className="w-8 h-8 text-white" />
          </motion.div>
        </Button>

        <Button
          onClick={resetTimer}
          variant="outline"
          size="lg"
          className="rounded-full w-20 h-20 border-2 hover:bg-gray-50 transition-colors duration-200"
        >
          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ rotate: -180 }}
            transition={{ duration: 0.3 }}
          >
            <RotateCcw className="w-8 h-8 text-gray-600" />
          </motion.div>
        </Button>
      </div>

      <motion.div
        whileTap={{ scale: 0.9 }}
        onClick={onReset}
        className="text-sm text-gray-600 font-medium hover:underline cursor-pointer mb-4 transition-colors duration-200 mt-3"
      >
        Clear Timebox
      </motion.div>
    </div>
  );
}
