'use client'

import { useEffect, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import { KanbanColumn } from './kanban-column'
import { TaskCard } from './task-card'
import { Column, Task } from '@/types/dashboard'

interface Props {
  tasks: Task[]
}

const initialColumns: Column[] = [
  { id: 'backlog', title: 'Backlog', tasks: [] },
  { id: 'todo', title: 'To Do', tasks: [] },
  { id: 'inProgress', title: 'In Progress', tasks: [] },
  { id: 'done', title: 'Done', tasks: [] },
]

export function KanbanBoard({ tasks }: Props) {
  const [columns, setColumns] = useState<Column[]>(initialColumns)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  // Update columns whenever tasks change
  useEffect(() => {
    const columnsWithTasks = initialColumns.map((column) => ({
      ...column,
      tasks: tasks.filter((task) => task.status === column.id),
    }))
    setColumns(columnsWithTasks)
  }, [tasks])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const task = tasks.find((t) => t.id === active.id)
    if (task) {
      setActiveTask(task)
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    const activeTask = tasks.find((t) => t.id === activeId)
    if (!activeTask) return

    const activeColumn = columns.find((col) =>
      col.tasks.some((task) => task.id === activeId),
    )
    const overColumn =
      columns.find((col) => col.id === overId) ||
      columns.find((col) => col.tasks.some((task) => task.id === overId))

    if (!activeColumn || !overColumn || activeColumn.id === overColumn.id)
      return

    setColumns((prevColumns) =>
      prevColumns.map((col) => {
        if (col.id === activeColumn.id) {
          return {
            ...col,
            tasks: col.tasks.filter((task) => task.id !== activeId),
          }
        }
        if (col.id === overColumn.id) {
          return {
            ...col,
            tasks: [
              ...col.tasks,
              { ...activeTask, status: overColumn.id as Task['status'] },
            ],
          }
        }
        return col
      }),
    )
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveTask(null)
    if (!over || active.id === over.id) return

    const activeTask = tasks.find((t) => t.id === active.id)
    if (!activeTask) return

    const activeColumn = columns.find((col) =>
      col.tasks.some((task) => task.id === active.id),
    )
    const overColumn = columns.find((col) =>
      col.tasks.some((task) => task.id === over.id),
    )

    if (activeColumn && overColumn && activeColumn.id === overColumn.id) {
      setColumns((prevColumns) =>
        prevColumns.map((col) => {
          if (col.id === activeColumn.id) {
            const oldIndex = col.tasks.findIndex((task) => task.id === active.id)
            const newIndex = col.tasks.findIndex((task) => task.id === over.id)
            return {
              ...col,
              tasks: arrayMove(col.tasks, oldIndex, newIndex),
            }
          }
          return col
        }),
      )
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-full gap-6 p-6 overflow-x-auto">
        <SortableContext items={columns.map((col) => col.id)}>
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={column.tasks}
            />
          ))}
        </SortableContext>
      </div>

      {typeof window !== 'undefined' &&
        createPortal(
          <DragOverlay>
            {activeTask ? (
              <div className="rotate-5 opacity-80">
                <TaskCard task={activeTask} isDragging />
              </div>
            ) : null}
          </DragOverlay>,
          document.body,
        )}
    </DndContext>
  )
}
