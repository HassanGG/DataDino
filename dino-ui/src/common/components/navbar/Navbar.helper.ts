import { User } from "common/data/user"

export enum UserNavbarItemName {
  Login = "LOGIN",
  Admin = "ADMIN",
  Profile = "PROFILE"
}

export const getUserNavbarItemName = (user: User | undefined) => { 
  if (!user) return UserNavbarItemName.Login
  if (user.isOwner) return UserNavbarItemName.Admin
  return UserNavbarItemName.Profile
}