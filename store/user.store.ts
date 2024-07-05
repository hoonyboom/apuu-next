import { UserType } from "@/lib/zod.schema";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserStore = {
  user: UserType | null;
  setLoginUser: (user: UserType) => void;
  setLogoutUser: () => void;
};

export const useUserStore = create(
  persist<UserStore>(
    (set, get) => ({
      user: null,
      setLoginUser: (user: UserType) => set({ user }),
      setLogoutUser: () => set({ user: null }),
      updateUser: (user: Partial<UserType>) => set({ user: { ...get().user!, ...user } }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
