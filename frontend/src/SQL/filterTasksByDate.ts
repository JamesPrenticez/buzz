import { type IUserTasks } from "@models";

export const filterTasksByDate = (tasks: IUserTasks[], startISOString: string, endISOString: string): IUserTasks[] => {
  const startDate = new Date(startISOString);
  const endDate = new Date(endISOString);
  
  return tasks.filter(task => {
    return task.data.some(data => {
      const dataDate = new Date(data.date);
      return dataDate >= startDate && dataDate <= endDate;
    });
  });
};
