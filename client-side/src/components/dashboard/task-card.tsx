"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { format } from "date-fns"
import { Calendar, GripVertical, MoreHorizontal, Pencil, Trash2, User } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Task } from "@/types/dashboard"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

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

  const handleEdit = (id: number) => {
  console.log("Edit task", id)
}

const handleDelete = async (id: number) => {
  try {
    const res = await fetch(`http://localhost:5000/api/delete/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error(`Failed to delete task with ID ${id}`);
    }
    console.log(`Task with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};
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
    <div className="grid grid-cols-[1fr_auto] gap-2">
      <h4 className="font-medium leading-tight text-sm sm:text-base break-words">{task.title}</h4>

      <div className="flex items-start gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
          {...listeners}
        >
          <GripVertical className="h-3 w-3" />
        </Button>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="bg-white shadow-md border rounded text-sm z-50"
              sideOffset={5}
              align="end"
              side="bottom"
            >
              <DropdownMenu.Item
                className="px-2 py-1.5 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                onSelect={() => handleEdit(task.id)}
              >
                <Pencil className="w-4 h-4" />
                Edit
              </DropdownMenu.Item>

              <DropdownMenu.Item
                className="px-2 py-1.5 hover:bg-gray-100 flex items-center gap-2 cursor-pointer text-red-600"
                onSelect={() => handleDelete(task.id)}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  </CardHeader>

  <CardContent className="pt-0 space-y-3">
    <p className="text-sm sm:text-base text-muted-foreground line-clamp-2">{task.description}</p>

    {/* Priority + User */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <Badge variant="outline" className={priorityColors[task.priority]}>
        {task.priority}
      </Badge>

      <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground justify-start sm:justify-end">
        <User className="h-3 w-3 sm:h-4 sm:w-4" />
        <span>User {task.user_id}</span>
      </div>
    </div>

    {/* Due Date */}
    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
      <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
      <span className={isOverdue ? "text-red-500 font-medium" : ""}>
        Due: {format(dueDate, "MMM dd, yyyy")}
      </span>
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
