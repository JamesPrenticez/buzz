import { IUser, IUserPermissions } from "@models";

export function userHasPermission(user: IUser | undefined, permissionId: IUserPermissions): boolean {
  if(user?.permissions === undefined) return false
  return user.permissions.some(permission => permission === permissionId);
}