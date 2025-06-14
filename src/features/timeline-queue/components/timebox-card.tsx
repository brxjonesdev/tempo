"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import { Clock, MessageSquare, CheckCircle2, Play, Target, Edit2, Trash2, AlertTriangle } from "lucide-react"
import { Input } from "@/shared/components/ui/input"

type Timebox = {
  id: string
  goal: string
  duration: number
  isActive: boolean
  isCompleted: boolean
  postBoxReview?: string
}

type TimeboxCardProps = Timebox & {
  onSelect: (timebox: Timebox) => void
  onDelete: (timeboxID: string) => void
  onUpdate: (updatedTimebox: Partial<Timebox>) => void
}

export default function TimeboxCard({
  id,
  goal,
  duration,
  isActive,
  isCompleted,
  postBoxReview,
  onSelect,
  onDelete,
  onUpdate,
}: TimeboxCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedGoal, setEditedGoal] = useState(goal)
  const [editedDuration, setEditedDuration] = useState(duration)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else if (minutes > 0) {
      return `${minutes}m`
    } else {
      return `${remainingSeconds}s`
    }
  }

  const handleCardClick = () => {
    if (isActive || isCompleted || isEditing) return
    onSelect({ id, goal, duration, isActive, isCompleted, postBoxReview })
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditing(true)
  }

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    onUpdate({ goal: editedGoal, duration: editedDuration })
    setIsEditing(false)
  }

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation()
    setEditedGoal(goal)
    setEditedDuration(duration)
    setIsEditing(false)
  }

  const handleDurationChange = (value: string) => {
    // Simple parsing - just extract numbers and assume minutes
    const numericValue = value.replace(/[^\d]/g, "")
    const minutes = Number.parseInt(numericValue) || 0
    setEditedDuration(minutes * 60) // Convert to seconds
  }

  const getStatusIcon = () => {
    if (isCompleted) return <CheckCircle2 className="w-4 h-4 text-green-600" />
    if (isActive) return <Play className="w-4 h-4 text-blue-600" />
    return <Target className="w-4 h-4 text-gray-400" />
  }

  const getCardStyles = () => {
    let styles = "group cursor-pointer transition-all duration-200 hover:shadow-md"

    if (isActive) {
      styles += " border-blue-200 bg-blue-50/30"
    } else if (isCompleted) {
      styles += " border-green-200 bg-green-50/30"
    } else {
      styles += " hover:border-gray-300"
    }

    return styles
  }

  return (
    <Card className={getCardStyles()} onClick={handleCardClick}>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {getStatusIcon()}
              {isEditing ? (
                <Input
                  value={editedGoal}
                  onChange={(e) => setEditedGoal(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="text-base font-medium border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-gray-400"
                  autoFocus
                />
              ) : (
                <h3 className="text-base font-medium text-gray-900 leading-tight line-clamp-2">{goal}</h3>
              )}
            </div>

            {/* Status & Actions */}
            <div className="flex items-center gap-2">
              {isActive && (
                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 border-blue-200">
                  Active
                </Badge>
              )}
              {isCompleted && (
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
                  Done
                </Badge>
              )}

              {isEditing ? (
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={handleCancel} className="h-7 px-2 text-xs">
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave} className="h-7 px-2 text-xs">
                    Save
                  </Button>
                </div>
              ) : (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <Button size="sm" variant="ghost" onClick={handleEdit} className="h-7 w-7 p-0">
                    <Edit2 className="w-3 h-3" />
                  </Button>
                  <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => e.stopPropagation()}
                        className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-sm">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-red-600">
                          <AlertTriangle className="w-4 h-4" />
                          Delete Timebox
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">Are you sure you want to delete &quot;{goal}&quot;?</p>
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" size="sm" onClick={() => setShowDeleteConfirm(false)}>
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              onDelete(id)
                              setShowDeleteConfirm(false)
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </div>

          {/* Duration */}
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-gray-400" />
              <div className="flex items-center gap-1">
                <Input
                  value={Math.floor(editedDuration / 60).toString()}
                  onChange={(e) => handleDurationChange(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-12 h-6 text-xs border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-gray-400 text-center"
                  placeholder="30"
                />
                <span className="text-xs text-gray-500">min</span>
              </div>
              <div className="flex gap-1">
                {[15, 30, 45, 60, 90].map((minutes) => (
                  <Button
                    key={minutes}
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      setEditedDuration(minutes * 60)
                    }}
                    className="h-5 px-1 text-xs text-gray-500 hover:text-gray-700"
                  >
                    {minutes}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-sm text-gray-600">{formatDuration(duration)}</span>
            </div>
          )}

          {/* Review Section */}
          {isCompleted && postBoxReview && (
            <div className="pt-2 border-t border-gray-100">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-left justify-start text-green-700 hover:text-green-800"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MessageSquare className="w-3 h-3 mr-2" />
                    <span className="text-xs">View review</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-green-600" />
                      Review
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      <strong>{goal}</strong>
                    </div>
                    <div className="text-sm leading-relaxed text-gray-800 bg-gray-50 p-3 rounded-lg">
                      {postBoxReview}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
