import { KanbanColumn } from "./kanban-column"
import type { Task } from "./kanban-column"

// Sample task data
const sampleTasks: {
  backlog: Task[]
  todo: Task[]
  inProgress: Task[]
  done: Task[]
} = {
  backlog: [
    {
      id: "1",
      title: "User Authentication System",
      description: "Implement login and registration functionality with JWT tokens",
      category: "Backend",
      assignee: { name: "Alice Johnson", avatar: "/placeholder.svg?height=32&width=32", initials: "AJ" },
      priority: "high",
    },
    {
      id: "2",
      title: "Database Schema Design",
      description: "Design and implement the database schema for user management",
      category: "Database",
      assignee: { name: "Bob Smith", avatar: "/placeholder.svg?height=32&width=32", initials: "BS" },
      priority: "medium",
    },
    {
      id: "3",
      title: "API Documentation",
      description: "Create comprehensive API documentation using Swagger",
      category: "Documentation",
      assignee: null,
      priority: "low",
    },
  ],
  todo: [
    {
      id: "4",
      title: "Responsive Navigation",
      description: "Make the navigation menu responsive for mobile devices",
      category: "Frontend",
      assignee: { name: "Carol Davis", avatar: "/placeholder.svg?height=32&width=32", initials: "CD" },
      priority: "high",
    },
    {
      id: "5",
      title: "Form Validation",
      description: "Add client-side and server-side validation for all forms",
      category: "Frontend",
      assignee: { name: "David Wilson", avatar: "/placeholder.svg?height=32&width=32", initials: "DW" },
      priority: "medium",
    },
  ],
  inProgress: [
    {
      id: "6",
      title: "Payment Integration",
      description: "Integrate Stripe payment gateway for subscription management",
      category: "Backend",
      assignee: { name: "Eve Brown", avatar: "/placeholder.svg?height=32&width=32", initials: "EB" },
      priority: "high",
    },
    {
      id: "7",
      title: "Dashboard Analytics",
      description: "Create analytics dashboard with charts and metrics",
      category: "Frontend",
      assignee: { name: "Frank Miller", avatar: "/placeholder.svg?height=32&width=32", initials: "FM" },
      priority: "medium",
    },
  ],
  done: [
    {
      id: "8",
      title: "Project Setup",
      description: "Initialize Next.js project with TypeScript and Tailwind CSS",
      category: "Setup",
      assignee: { name: "Grace Lee", avatar: "/placeholder.svg?height=32&width=32", initials: "GL" },
      priority: "high",
    },
    {
      id: "9",
      title: "UI Component Library",
      description: "Set up ShadCN UI components and design system",
      category: "Frontend",
      assignee: { name: "Henry Taylor", avatar: "/placeholder.svg?height=32&width=32", initials: "HT" },
      priority: "medium",
    },
    {
      id: "10",
      title: "Git Repository Setup",
      description: "Initialize Git repository and set up branch protection rules",
      category: "DevOps",
      assignee: { name: "Ivy Chen", avatar: "/placeholder.svg?height=32&width=32", initials: "IC" },
      priority: "low",
    },
  ],
}

const columns = [
  { id: "backlog", title: "Backlog", tasks: sampleTasks.backlog },
  { id: "todo", title: "To Do", tasks: sampleTasks.todo },
  { id: "inProgress", title: "In Progress", tasks: sampleTasks.inProgress },
  { id: "done", title: "Done", tasks: sampleTasks.done },
]

export function KanbanBoard() {
  return (
    <div className="flex h-full gap-6 p-6 overflow-x-auto">
      {columns.map((column) => (
        <KanbanColumn key={column.id} title={column.title} tasks={column.tasks} taskCount={column.tasks.length} />
      ))}
    </div>
  )
}
