export interface ITask {
  id: string;
  title: string;
  description: string;
}

export interface ITaskData {
  id: string;
  user_id: string;
  task_id: string;
  date: string;
  measurement: string;
  unit: string;
}
