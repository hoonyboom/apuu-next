import { UseMutationOptions } from "@tanstack/react-query"
import { authAPI } from "./AuthService"

const mutationKey = {
  login: ["login"],
  register: ["register"],
  send_code: ["send_code"],
  verify_code: ["verify_code"],
}

export const queryOptions = {
  send_code: (email: string) => ({
    mutationKey: mutationKey.send_code,
    mutationFn: () => authAPI.postSendCode(email),
  }),
} satisfies Record<string, (param: any) => UseMutationOptions>
