import { TaskData } from '@prisma/client'

export const tasksData: TaskData[] = [
  {
    id: "1",
    user_id: "1",
    task_id: "1", // Sleep
    date_created: new Date(),
    quantity: "8",
    unit: "hr"
  },
  {
    id: "2",
    user_id: "1",
    task_id: "2", // Meditate
    date_created: new Date(),
    quantity: "15",
    unit: "min"
  },
  {
    id: "3",
    user_id: "1",
    task_id: "3", // Exercise
    date_created: new Date(),
    quantity: "30",
    unit: "min"
  },
  {
    id: "4",
    user_id: "1",
    task_id: "4", // Work
    date_created: new Date(),
    quantity: "1",
    unit: "hr"
  },
]
