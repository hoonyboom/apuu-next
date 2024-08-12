import { UserEntity } from "@/types/zod.schema"
import { deleteCookie } from "cookies-next"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type UserStore = {
  user: UserEntity | null
  setLoginUser: (user: UserEntity) => void
  setLogoutUser: () => void
}

export const useUserStore = create(
  persist<UserStore>(
    (set, get) => ({
      user: null,
      setLoginUser: (user: UserEntity) => set({ user }),
      setLogoutUser: () => {
        set({ user: null })
        deleteCookie("user")
        deleteCookie("refreshToken")
      },
      updateUser: (user: Partial<UserEntity>) =>
        set({ user: { ...get().user!, ...user } }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
