"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Column, Task } from "@/types/dashboard"
import { TaskCard } from "./task-card"

interface KanbanColumnProps {
  column: Column
  tasks: Task[]
}

export function KanbanColumn({ column, tasks }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  })

  return (
    <div className="flex min-w-[400px] flex-col rounded-lg border bg-muted/50 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-foreground">{column.title}</h3>
        <Badge variant="secondary" className="ml-2">
          {tasks.length}
        </Badge>
      </div>

      <ScrollArea className="flex-1 pr-2">
        <div
          ref={setNodeRef}
          className={`space-y-3 min-h-[200px] rounded-lg p-2 transition-colors ${isOver ? "bg-muted/80" : ""}`}
        >
          <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>

          {tasks.length === 0 && (
            <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 text-sm text-muted-foreground">
              Drop tasks here
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
