import  { TaskUnit, type IUserTasks } from "@models";

export const mockUserTasks: IUserTasks[] = [
  {
    id: "1",
    title: "Exercise",
    description: "Be active for 30mins",
    target: "120000",
    unit: TaskUnit.MS,
    data: [
      // 1 minute 1 second
      { id: "1", user_id: "1", task_id: "1", date: "1993-07-16T12:00:00.000Z", measurement: "61000" },
      { id: "2", user_id: "1", task_id: "2", date: "1993-07-17T12:00:00.000Z", measurement: "121000" }
    ]
  },
  {
    id: "2",
    title: "Meditation",
    description: "Calm the mid for 10mins",
    target: "121000",
    unit: TaskUnit.MS,
    data: [ 
      { id: "1", user_id: "1", task_id: "2", date: "1993-07-17T12:00:00.000Z", measurement: "121000" },
      { id: "1", user_id: "1", task_id: "2", date: "1993-07-18T12:00:00.000Z", measurement: "121000" },
    ]
  }
]
