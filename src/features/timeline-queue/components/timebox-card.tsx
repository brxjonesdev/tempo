"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import { Clock, Target, Calendar, Star, MessageSquare } from "lucide-react"

export type TimeboxCardProps = {
  goal: string
  duration: number // in seconds
  completionDate: Date | null
  priority: number // 1-5 scale
  isActive: boolean
  isCompleted?: boolean // optional for future use
  postBoxReview?: string
}

export default function TimeboxCard({
  goal,
  duration,
  completionDate,
  priority,
  isActive,
  isCompleted = false,
  postBoxReview,
}: TimeboxCardProps) {
  const [showReviewHover, setShowReviewHover] = useState(false)

  // Format duration from seconds to readable format
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`
    } else {
      return `${remainingSeconds}s`
    }
  }

  // Get priority color and label
  const getPriorityInfo = (priority: number) => {
    const priorities = {
      1: { label: "Very Low", color: "bg-gray-100 text-gray-800" },
      2: { label: "Low", color: "bg-blue-100 text-blue-800" },
      3: { label: "Medium", color: "bg-yellow-100 text-yellow-800" },
      4: { label: "High", color: "bg-orange-100 text-orange-800" },
      5: { label: "Very High", color: "bg-red-100 text-red-800" },
    }
    return priorities[priority as keyof typeof priorities] || priorities[3]
  }

  const priorityInfo = getPriorityInfo(priority)

  return (
    <Card
      className={`w-full  transition-all duration-200 hover:shadow-lg ${
        isActive ? "ring-2 ring-blue-500 shadow-md" : ""
      } ${isCompleted ? "bg-green-50 border-green-200" : ""}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold line-clamp-2 flex-1">{goal}</CardTitle>
          <div className="flex flex-col gap-2 ml-3">
            {isActive && (
              <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">
                Active
              </Badge>
            )}
            {isCompleted && (
              <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                Completed
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Duration */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{formatDuration(duration)}</span>
        </div>

        {/* Priority */}
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-muted-foreground" />
          <Badge className={priorityInfo.color}>{priorityInfo.label}</Badge>
          <div className="flex gap-1 ml-2">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < priority ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
        </div>

        {/* Completion Date */}
        {completionDate && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Completed: {completionDate.toLocaleDateString()}</span>
          </div>
        )}

        {/* Post-box Review (only for completed timeboxes) */}
        {isCompleted && postBoxReview && (
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Review Available
              </span>

              {/* Modal Trigger */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    View Review
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Post-box Review</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Goal: {goal}</p>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm leading-relaxed">{postBoxReview}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Hover Preview */}
            <div
              className="relative mt-2"
              onMouseEnter={() => setShowReviewHover(true)}
              onMouseLeave={() => setShowReviewHover(false)}
            >
              <div className="text-xs text-muted-foreground cursor-help border-b border-dotted border-muted-foreground inline-block">
                Hover for preview
              </div>

              {showReviewHover && (
                <div className="absolute z-10 mt-2 p-3 bg-popover border rounded-lg shadow-lg max-w-xs">
                  <p className="text-sm line-clamp-3">{postBoxReview}</p>
                  <p className="text-xs text-muted-foreground mt-2">Click &quot;View Review&quot; for full text</p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
