'use client';
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, RotateCcw, CheckCircle } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog"
import { Textarea } from "@/shared/components/ui/textarea"
import { Label } from "@/shared/components/ui/label"
import { presets } from "./presets";

type TimerProps = {
  goal: string
  duration: number // duration in seconds
  onComplete: (postBoxReview?: string) => void // callback for completion
  onReset: () => void // callback for reset
}

export default function Timer({ goal, duration, onComplete, onReset }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isRunning, setIsRunning] = useState(false)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [reviewText, setReviewText] = useState("")

  // Calculate progress percentage
  const progress = ((duration - timeLeft) / duration) * 100
  const circumference = 2 * Math.PI * 130 // radius of 130
  const strokeDashoffset = circumference - (progress / 100) * circumference

  // update time left when duration changes
  useEffect(() => {
    setTimeLeft(duration)
  }, [duration])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Start timer
  const startTimer = () => {
    if (timeLeft > 0) {
      setIsRunning(true)
      const id = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            // Show modal when timer reaches 0
            setShowReviewModal(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      setIntervalId(id)
    }
  }

  // Pause timer
  const pauseTimer = () => {
    setIsRunning(false)
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
    }
  }

  // Reset timer
  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(duration)
    setShowReviewModal(false)
    setReviewText("")
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
    }
  }

  // Complete task manually
  const completeTask = () => {
    setIsRunning(false)
    setTimeLeft(0)
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
    }
    // Show modal for manual completion
    setTimeout(() => {
      if (presets.map(p => p.title).includes(goal)) {
        onComplete()
      }else{
      setShowReviewModal(true)
    }
    }, 1000)
  }

  // Handle review submission
  const handleReviewSubmit = () => {
    onComplete(reviewText)
    setShowReviewModal(false)
    setReviewText("")
  }

  // Handle modal close without submitting
  const handleModalClose = () => {
    onComplete("")
    setShowReviewModal(false)
    setReviewText("")
  }

  // Toggle play/pause
  const toggleTimer = () => {
    if (isRunning) {
      pauseTimer()
    } else {
      startTimer()
    }
  }

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [intervalId])

  const isCompleted = timeLeft === 0

  return (
    <>
      <div className="flex flex-col items-center justify-center p-12 bg-white/70 rounded-3xl shadow-xl min-h-full">
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
              <circle cx="150" cy="150" r="130" stroke="#cceaec" strokeWidth="12" fill="transparent" />

              {/* Progress circle */}
              <motion.circle
                cx="150"
                cy="150"
                r="130"
                stroke={isCompleted ? "#50696b" : "#50696b"}
                strokeWidth="12"
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </svg>

            {/* Time display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center font-heading">
              <AnimatePresence mode="wait">
                <motion.div
                  key={timeLeft}
                  className={`text-6xl font-bold ${isCompleted ? "text-green-600" : "text-gray-800"}`}
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
                  className="text-xl text-green-600 font-medium"
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
              isRunning ? "bg-orange-500 hover:bg-orange-600" : "bg-cyan-500 hover:bg-cyan-600"
            } transition-colors duration-200`}
          >
            <motion.div whileTap={{ scale: 0.9 }} transition={{ duration: 0.1 }}>
              {isRunning ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
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
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ rotate: -180 }} transition={{ duration: 0.3 }}>
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

      {/* Review Modal */}
      <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
        <DialogContent className="sm:max-w-lg font-heading bg-[#5ca7ae] text-[#eef6f7] border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle>Post-Box Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 font-body">
            <div>
              <Label htmlFor="review" className="text-sm font-medium">
                How did this timebox session go? What did you accomplish?
              </Label>
              <Textarea
                id="review"
                placeholder="Reflect on your progress, challenges, and achievements during this timebox session..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="mt-2 min-h-[120px] resize-none border-[#eef6f7] border-2 text-[#eef6f7] placeholder:text-[#eef6f7]"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleModalClose} className="bg-[#5ca7ae] border-none shadow-none hover:text-[#5ca7ae] cursor-pointer">
                Skip Review
              </Button>
              <Button onClick={handleReviewSubmit}
                className="bg-[#7cb3ba] border-none  hover:text-[#5ca7ae] transition-colors duration-200  cursor-pointer"
              >Complete Session</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
