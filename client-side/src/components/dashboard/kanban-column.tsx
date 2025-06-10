import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TaskCard } from "./task-card"

export interface Task {
  id: string
  title: string
  description: string
  category: string
  assignee: {
    name: string
    avatar: string
    initials: string
  } | null
  priority: "low" | "medium" | "high"
}

interface KanbanColumnProps {
  title: string
  tasks: Task[]
  taskCount: number
}

export function KanbanColumn({ title, tasks, taskCount }: KanbanColumnProps) {
  return (
    <div className="flex min-w-[300px] flex-col rounded-lg border bg-muted/50 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <Badge variant="secondary" className="ml-2">
          {taskCount}
        </Badge>
      </div>

      <ScrollArea className="flex-1 pr-2">
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </ScrollArea>

      {/* Placeholder for drag-and-drop zone */}
      <div className="mt-4 rounded-lg border-2 border-dashed border-muted-foreground/25 p-4 text-center text-sm text-muted-foreground opacity-0 transition-opacity hover:opacity-100">
        Drop tasks here
      </div>
    </div>
  )
}
