import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'
import { Status } from '../enums/Status'

interface Task {
  id: string
  title: string
  description: string
  status: Status
  attachment: string
}

interface TasksContextProps {
  tasks: Task[]
  setTasks: Dispatch<SetStateAction<Task[]>>
}

export const TasksContext = createContext<TasksContextProps>({} as TasksContextProps)

export const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([])

  return (
    <TasksContext.Provider value={{ tasks: tasks, setTasks }}>{children}</TasksContext.Provider>
  )
}
