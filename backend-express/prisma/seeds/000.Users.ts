import { User } from '@prisma/client'

export const users: User[] = [
  {
    id: "1",
    email: "admin@admin.com",
    password_hash: "",
    first_name: "james",
    last_name: "prentice",
    phone: "027 123 456",
    profile_picture: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    locale: "en-gb",
    country: "New Zealand",
    permissions: "[ADMIN]",
    subscription: "FREE",
    date_created: new Date(),
    last_modified: new Date(),
  }
]



