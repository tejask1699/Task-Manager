'use client'

import { KanbanBoard } from '@/components/dashboard/kanban-board';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Dashboard = () => {
  const router = useRouter()
  return (

    <>
      <div className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Task Manager</h1>
          <p className="text-sm text-muted-foreground">Manage your tasks effectively</p>
        </div>

        <div className='flex gap-4'>
          <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
        <Button
          variant="outline"
          className="px-4 py-2 border border-red-300 rounded-md bg-white text-red-700 hover:bg-red-100 transition duration-300"
          onClick={() => {
            localStorage.removeItem('token');
            router.push('/login');
          }}
        >
          Sign Out
        </Button>
        </div>
      </div>
      <main className="flex-1 overflow-hidden">
        <KanbanBoard />
      </main>
    </>
  );
};

export default Dashboard;
