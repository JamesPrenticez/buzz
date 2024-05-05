import { type IUserTasks } from "@models";
import { ITaskData } from "@models/task/ITask";

export const mockUserTasks: IUserTasks[] = [
  {
    id: "1",
    title: "Exercise",
    description: "Be active for 30mins every day",
    data: [
      {
        id: "1",
        user_id: "1",
        task_id: "1",
        date: "1993-07-16T12:00:00.000Z",
        measurement: "61000", // 1 minute 1 second
        unit: "ms",
      }
    ]
  },
  {
    id: "2",
    title: "Exercise",
    description: "Be active for 30mins every day",
    data: [
      {
        id: "1",
        user_id: "1",
        task_id: "2",
        date: "1993-07-17T12:00:00.000Z",
        measurement: "121000", // 1 minute 1 second
        unit: "ms",
      }
    ]
  }
]



// const mockUserTaskExerciseData: ITaskData[] = [
//   {
//     id: "1",
//     user_id: "1",
//     task_id: "1",
//     date: "";
//     measurement: string;
//     unit: string;

//   }
// ]