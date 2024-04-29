import { ITask, ITaskData } from "@models/task/ITask";

export interface IUser {
  id: string,
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  profilePicture?: string;
  permissions?: IUserPermissions[];
  subscription?: IUserSubscription;
  dateCreated: string;
  lastModified: string;
  tasks: IUserTasks[];
}

export interface IUserTasks {
  title: ITask["title"];
  description: ITask["description"]; 
  data: ITaskData[];
}


export enum IUserPermissions {
  ADMIN = 'ADMIN',
}

export enum IUserSubscription {
  FREE = 'FREE',
}