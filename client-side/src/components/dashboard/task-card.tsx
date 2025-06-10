import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Task {
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

interface TaskCardProps {
  task: Task
}

const priorityColors = {
  low: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  high: "bg-red-100 text-red-800 hover:bg-red-100",
}

const categoryColors = {
  Frontend: "bg-green-100 text-green-800 hover:bg-green-100",
  Backend: "bg-purple-100 text-purple-800 hover:bg-purple-100",
  Database: "bg-orange-100 text-orange-800 hover:bg-orange-100",
  Documentation: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  Setup: "bg-cyan-100 text-cyan-800 hover:bg-cyan-100",
  DevOps: "bg-pink-100 text-pink-800 hover:bg-pink-100",
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="group cursor-pointer transition-all hover:shadow-md hover:shadow-black/5">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h4 className="font-medium leading-tight">{task.title}</h4>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <MoreHorizontal className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{task.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Badge variant="secondary" className={categoryColors[task.category as keyof typeof categoryColors] || ""}>
              {task.category}
            </Badge>
            <Badge variant="outline" className={priorityColors[task.priority]}>
              {task.priority}
            </Badge>
          </div>

          {task.assignee && (
            <Avatar className="h-6 w-6">
              <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
              <AvatarFallback className="text-xs">{task.assignee.initials}</AvatarFallback>
            </Avatar>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
