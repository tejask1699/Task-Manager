'use client'

import CreateTaskModal from '@/components/dashboard/create-task';
import { KanbanBoard } from '@/components/dashboard/kanban-board';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const router = useRouter()
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }
  }, [router])
  
  useEffect(() => {
   const user_id = localStorage.getItem('userID') || ""
  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/all?user_id=${user_id}`, {
        method: 'GET'
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      setTasks(data)
      console.log("Fetched data:", data); // Or set state
    } catch (error) {
  const message =
    error instanceof Error
      ? error.message
      : "An unexpected error occurred. Please try again."
  toast.error(message)
}
  };

  fetchData();
}, []);
  return (

    <>
      <div className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Task Manager</h1>
          <p className="text-sm text-muted-foreground">Manage your tasks effectively</p>
        </div>

        <div className='flex gap-4'>

          <CreateTaskModal />
          <Button
            variant="outline"
            className="px-4 py-2 border border-red-300 rounded-md bg-white text-red-700 hover:bg-red-100 transition duration-300"
            onClick={() => {
              localStorage.removeItem('token');
              router.push('/login');
            }}
          >Sign Out
          </Button>
        </div>
      </div>
      <main className="flex-1 overflow-hidden">
        <KanbanBoard tasks={tasks || []}/>
      </main>
    </>
  );
};

export default Dashboard;
