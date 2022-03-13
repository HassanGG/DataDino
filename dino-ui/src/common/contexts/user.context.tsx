import { createContext, useState } from "react"
import { User } from "common/data/user"
import { useSessionStorage } from "react-use-storage"

interface UserContext {
  user: User | undefined
  setUser: (u: User | undefined) => void
}

export const UserContext = createContext<UserContext>({} as any)

export const UserContextProvider = (props: any) => {
  const key = "dino-ui-session-storage-user-data"
  const [user, setUser] = useSessionStorage<User | undefined>(key)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}
