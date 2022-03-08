import { createContext, useState } from "react"
import { User } from "common/data/user"

interface contextType {
  user: User | undefined
  setUser: (u: User | undefined) => void
}

export const UserContext = createContext<contextType>({} as any)

export const UserContextProvider = (props: any) => {
  const [user, setUser] = useState<User>()

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}
