import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PropsWithChildren } from "react"

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="h-fullscreen overflow-hidden px-3 pb-2 @container/register @lg/register:h-full">
      <Card className="size-full max-h-full overflow-y-hidden pb-10 @lg/register:max-h-none @lg/register:overflow-auto @lg/register:pb-0">
        <CardHeader>
          <CardTitle>기본 정보를 입력해주세요</CardTitle>
        </CardHeader>
        <CardContent className="mt-2 px-0 @lg/register:px-4">{children}</CardContent>
      </Card>
    </div>
  )
}
