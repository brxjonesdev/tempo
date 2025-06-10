"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import { Clock, MessageSquare, CheckCircle2, Play, Target } from "lucide-react"

// Assuming this is your Timebox type
type Timebox = {
  goal: string
  duration: number
  isActive: boolean
  isCompleted: boolean
  postBoxReview?: string
}

type TimeboxCardProps = Timebox & {
  onSelect: (timebox: Timebox) => void
  onDelete?: () => void
  onUpdate?: (updatedTimebox: Partial<Timebox>) => void
}

export default function TimeboxCard({
  goal,
  duration,
  isActive,
  isCompleted,
  postBoxReview,
  onSelect,
  onDelete,
  onUpdate,
}: TimeboxCardProps) {
  const [showReviewHover, setShowReviewHover] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedGoal, setEditedGoal] = useState(goal)
  const [editedDuration, setEditedDuration] = useState(duration)

  // Format duration from seconds to readable format
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`
    } else {
      return `${remainingSeconds}s`
    }
  }

  const handleCardClick = () => {
    if (isActive || isCompleted) {
      return
    }
    onSelect({
      goal,
      duration,
      isActive,
      isCompleted,
      postBoxReview,
    })
  }

  const getCardStyles = () => {
    let baseStyles = "w-full transition-all duration-300 cursor-pointer group relative overflow-hidden py-2 gap-0"

    if (isActive) {
      baseStyles += " ring-2 ring-blue-500 shadow-lg bg-blue-50/50 border-blue-200"
    } else if (isCompleted) {
      baseStyles += " bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-sm"
    } else {
      baseStyles += " hover:shadow-md hover:border-gray-300"
    }

    if (isHovered) {
      baseStyles += " scale-[1.02] shadow-lg"
    }

    return baseStyles
  }

  const getStatusIcon = () => {
    if (isCompleted) return <CheckCircle2 className="w-4 h-4 text-green-600" />
    if (isActive) return <Play className="w-4 h-4 text-blue-600" />
    return <Target className="w-4 h-4 text-gray-500" />
  }

  const getStatusBadge = () => {
    if (isActive) {
      return (
        <Badge className="bg-blue-500 hover:bg-blue-600 text-white shadow-sm">
          <Play className="w-3 h-3 mr-1" />
          Active
        </Badge>
      )
    }
    if (isCompleted) {
      return (
        <Badge className="bg-green-500 hover:bg-green-600 text-white shadow-sm">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Completed
        </Badge>
      )
    }
    return null
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditing(true)
  }

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onUpdate) {
      onUpdate({
        goal: editedGoal,
        duration: editedDuration,
      })
    }
    setIsEditing(false)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onDelete) {
      onDelete()
    }
  }

  const handleDurationChange = (value: string) => {
    // Convert input like "30m" to seconds
    const match = value.match(/^(\d+)(h|m|s)?$/)
    if (match) {
      const num = Number.parseInt(match[1], 10)
      const unit = match[2] || "s"

      let seconds = num
      if (unit === "m") seconds = num * 60
      if (unit === "h") seconds = num * 60 * 60

      setEditedDuration(seconds)
    }
  }

  return (
    <Card
      className={getCardStyles()}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role={"button"}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleCardClick()
        }
      }}
    >
      {/* Subtle background pattern for active/completed states */}
      {(isActive || isCompleted) && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent" />
        </div>
      )}

      <CardHeader className="relative py-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="mt-1 flex-shrink-0">{getStatusIcon()}</div>
            {isEditing ? (
              <input
                type="text"
                value={editedGoal}
                onChange={(e) => setEditedGoal(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="text-lg font-semibold leading-tight w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                autoFocus
              />
            ) : (
              <CardTitle className="text-lg font-semibold leading-tight line-clamp-2 text-gray-900 group-hover:text-gray-700 transition-colors">
                {goal}
              </CardTitle>
            )}
          </div>
          <div className="flex-shrink-0 flex gap-2">
            {isEditing ? (
              <Button size="sm" variant="outline" onClick={handleSave} className="h-7 px-2">
                Save
              </Button>
            ) : (
              <>
                {getStatusBadge()}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="ghost" onClick={handleEdit} className="h-7 w-7 p-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-pencil"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    </svg>
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleDelete}
                    className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-trash-2"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" x2="10" y1="11" y2="17" />
                      <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative">
        {/* Duration */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={formatDuration(editedDuration).replace(" ", "")}
                onChange={(e) => handleDurationChange(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="w-20 border-b border-gray-300 focus:border-blue-500 focus:outline-none text-sm px-2 py-1"
                placeholder="30m, 1h, etc."
              />
              <span className="text-xs text-gray-500">Format: 30m, 1h, 45s</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="font-medium">{formatDuration(duration)}</span>
            </div>
          )}
        </div>

        {/* Post-box Review Section */}
        {isCompleted && postBoxReview && (
          <div className="border-t border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <MessageSquare className="w-4 h-4 text-green-600" />
                Review Available
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-green-50 hover:border-green-300 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Review
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                      Post-box Review
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-4 space-y-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Goal:</p>
                      <p className="font-medium text-gray-900">{goal}</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Review:</p>
                      <p className="text-sm leading-relaxed text-gray-800">{postBoxReview}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Hover Preview */}
            <div
              className="relative"
              onMouseEnter={() => setShowReviewHover(true)}
              onMouseLeave={() => setShowReviewHover(false)}
            >
              <div className="text-xs text-gray-500 cursor-help border-b border-dotted border-gray-400 inline-block hover:text-gray-700 transition-colors">
                Hover for preview
              </div>

              {showReviewHover && (
                <div className="absolute z-20 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-xl max-w-xs left-0 animate-in fade-in-0 zoom-in-95 duration-200">
                  <p className="text-sm line-clamp-3 text-gray-700 mb-2">{postBoxReview}</p>
                  <p className="text-xs text-gray-500">Click &ldquo;View Review&quot; for full text</p>
                  <div className="absolute -top-1 left-4 w-2 h-2 bg-white border-l border-t border-gray-200 rotate-45" />
                </div>
              )}
            </div>
          </div>
        )}

        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-2 h-2 bg-blue-500 rounded-full" />
        </div>
      </CardContent>
    </Card>
  )
}
