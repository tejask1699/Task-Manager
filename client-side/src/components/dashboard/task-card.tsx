"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { format } from "date-fns"
import { Calendar, GripVertical, MoreHorizontal, User } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Task } from "@/types/dashboard"

interface TaskCardProps {
  task: Task
  isDragging?: boolean
}

const priorityColors = {
  low: "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400",
  medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400",
  high: "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400",
}

export function TaskCard({ task, isDragging = false }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: task.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const dueDate = new Date(task.due_date)
  const isOverdue = dueDate < new Date()

  if (isDragging) {
    return (
      <Card className="cursor-grabbing opacity-80 rotate-5 shadow-lg">
        <CardHeader className="pb-3">
          <h4 className="font-medium leading-tight">{task.title}</h4>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`group cursor-grab transition-all hover:shadow-md hover:shadow-black/5 ${
        isSortableDragging ? "opacity-50" : ""
      }`}
      {...attributes}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h4 className="font-medium leading-tight flex-1">{task.title}</h4>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
              {...listeners}
            >
              <GripVertical className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Badge variant="outline" className={priorityColors[task.priority]}>
              {task.priority}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <User className="h-3 w-3" />
            <span>User {task.user_id}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span className={isOverdue ? "text-red-500 font-medium" : ""}>Due: {format(dueDate, "MMM dd, yyyy")}</span>
          {isOverdue && (
            <Badge variant="destructive" className="text-xs px-1 py-0">
              Overdue
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
