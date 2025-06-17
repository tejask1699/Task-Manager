'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import TaskForm from './task-form';
const CreateTaskModal = () => {
    const [open,setOpen] = useState(false)

    const handleSuccess = () => {
    setOpen(false);
  };
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Task
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Task</DialogTitle>
                        <DialogDescription>
                            Add a new task to your list. Fill in the details to stay organized and on track.
                        </DialogDescription>
                    </DialogHeader>
                        <TaskForm onSuccess={handleSuccess} />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateTaskModal