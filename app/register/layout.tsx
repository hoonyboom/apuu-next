import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="container h-fullscreen overflow-hidden px-3 pb-2">
      {/* <div className="blurred sticky top-0 w-full py-2">
        <h2>파티원 모집</h2>
      </div> */}
      <Card className="size-full max-h-full overflow-y-hidden pb-10">
        <CardHeader>
          <CardTitle>기본 정보를 입력해주세요</CardTitle>
        </CardHeader>
        <CardContent className="px-0">{children}</CardContent>
      </Card>
    </div>
  );
}
