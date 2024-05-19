import {
  type ITask,
  type ITaskData,
  TaskUnit
} from "@models/task/ITask";

export interface IUser {
  id: string,
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  profile_picture?: string;
  permissions?: IUserPermissions[];
  subscription?: IUserSubscription;
  date_created: string;
  last_modified: string;
  country?: string;
  tasks?: IUserTasks[];
}

export interface IUserTasks {
  id: string;
  title: ITask["title"];
  description: ITask["description"]; 
  target: string;
  unit: TaskUnit;
  data: ITaskData[];
}

export enum IUserPermissions {
  ADMIN = 'ADMIN',
}

export enum IUserSubscription {
  FREE = 'FREE',
}