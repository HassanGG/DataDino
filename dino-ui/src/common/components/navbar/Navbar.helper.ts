import { User } from "common/data/user"

export enum UserNavbarItemName {
  Login = "LOGIN",
  Admin = "ADMIN",
  Profile = "PROFILE",
}

export const getUserNavbarItemName = (user: User | null) => {
  if (!user) return UserNavbarItemName.Login
  if (user.isAdmin) return UserNavbarItemName.Admin
  return UserNavbarItemName.Profile
}
