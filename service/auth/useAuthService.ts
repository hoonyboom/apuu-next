import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryOptions } from "./queries";

export function useMutateVerificationCode({ email }: { email: string }) {
  const queryClient = useQueryClient();

  return useMutation({
    ...queryOptions.send_code(email),
    onMutate: async (newCode: string) => {
      await queryClient.cancelQueries({ queryKey: ["send_code"] });
      const previousCodes = queryClient.getQueryData<string[]>(["send_code"]);
      await queryClient.setQueryData(["send_code"], (old: string[]) => [...old, newCode]);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["send_code"] });
    },
  });
}
