export interface Task {
  id: number
  title: string
  description: string
  due_date: string
  priority: "low" | "medium" | "high"
  user_id: number
  status?: "backlog" | "todo" | "inProgress" | "done" | null
}

export interface Column {
  id: string
  title: string
  tasks: Task[]
}
