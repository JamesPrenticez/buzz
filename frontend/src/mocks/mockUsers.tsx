import { IUserSubscription, IUserPermissions, type IUser } from "@models";

export const mockUsers: IUser[] = [
  {
    id: "cltt7mpu70000jddangndeh81",
    email: "jamesprenticez@gmail.com",
    firstName: "james",
    lastName: "prentice",
    phone: "123456789",
    profilePicture: "https://images.unsplash.com/photo-1568162603664-fcd658421851?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D",
    permissions: [IUserPermissions.ADMIN],
    subscription: IUserSubscription.FREE,
    dateCreated: "2024-03-13T21:39:06.947Z",
    lastModified: "2024-03-13T21:39:06.947Z"
  }
]
