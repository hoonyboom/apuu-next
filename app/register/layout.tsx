import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="@container/register @lg/register:h-full h-fullscreen overflow-hidden px-3 pb-2">
      <Card className="@lg/register:max-h-none @lg/register:overflow-auto @lg/register:pb-0 size-full max-h-full overflow-y-hidden pb-10">
        <CardHeader>
          <CardTitle>기본 정보를 입력해주세요</CardTitle>
        </CardHeader>
        <CardContent className="@lg/register:px-4 mt-2 px-0">{children}</CardContent>
      </Card>
    </div>
  );
}
