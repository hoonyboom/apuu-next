import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-start gap-8 px-4">
      <div className="blurred sticky top-0 w-full py-2">
        <h2>팀원 모집하기</h2>
      </div>
      {children}
    </div>
  );
}
