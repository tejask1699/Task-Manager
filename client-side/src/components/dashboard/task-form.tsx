import React from 'react'
import { Button } from '../ui/button'
import { Controller, useForm } from 'react-hook-form'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import toast from 'react-hot-toast';

interface CreateTaskData {
    title: string;
    description: string;
    dueDate: Date;
    priority: string;
}
const TaskForm = ({ onSuccess }: { onSuccess?: () => void }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control
    } = useForm<CreateTaskData>({
        defaultValues: {
      priority: "medium",
    },
    })
    const id = localStorage.getItem('userID')
    const onSubmit = async (data: CreateTaskData) => {
        const formattedData = {
          user_id:id,
          ...data
        }
        console.log(formattedData)
        try {
        const res = await fetch('http://localhost:5000/api/create-task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedData)
        })

        if (res.status === 200) {
          if (onSuccess) onSuccess();
          toast.success("Task Created successfully")
          reset()
        } else {
            toast.error("Task creation failed, Internal server error")
        }
    } catch (error) {
  const message =
    error instanceof Error
      ? error.message
      : "An unexpected error occurred. Please try again."
  toast.error(message)
}
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Task Title */}
            <div>
                <Label className="block text-sm font-medium">Title</Label>
                <Input
                    type="text"
                    placeholder="Enter your Title"
                    {...register('title', { required: 'Title is required' })}
                    className="w-full border p-2 rounded"
                />
                {errors.title && (
                    <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
            </div>

            {/* Description */}
            <div>
                <Label className="block text-sm font-medium">Description</Label>
                <Textarea
                placeholder='Enter description'
                    {...register('description')}
                    className="w-full border-gray-500 p-2 rounded"
                />
            </div>

            {/* Due Date */}
            <div>
  <Label className="block text-sm font-medium">Due Date</Label>
  <Controller
    control={control}
    name="dueDate"
    render={({ field }) => (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={`w-full border-gray-500 justify-start text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {field.value ? format(field.value, "PPP") : <span>Select date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
          />
        </PopoverContent>
      </Popover>
    )}
  />
</div>

            {/* Priority */}
            <div>
        <Label className="block text-sm font-medium">Priority</Label>
        <Controller
          control={control}
          name="priority"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full border-gray-500">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Priority</SelectLabel>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
                Create
            </Button>
        </form>
    )
}

export default TaskForm
