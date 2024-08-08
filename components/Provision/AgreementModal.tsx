"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function AgreementModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="ghost">
          이용약관
        </Button>
      </DialogTrigger>
      <DialogContent className="scrollbar-thin max-h-fullscreen overflow-y-scroll sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">이용약관</DialogTitle>
        </DialogHeader>
        <p>
          {`본 약관은 Apuu(이하 "회사")와 서비스 이용자간의 이용 계약 관련 규정을 정하는
          것을 목적으로 합니다.`}
        </p>

        <div className="space-y-2">
          <h4 className="mt-3">제1조(목적)</h4>
          <p>
            {`본 약관은 회사가 제공하는 Apuu 등의 서비스(이하 "서비스"라 함)를 이용함에 있어
            권리, 의무, 책임 및 기타 필요한 사항을 규정함을 목적으로 합니다.`}
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="mt-3">제2조(약관의 효력과 변경)</h4>
          <ol className="flex flex-col gap-2">
            <li>
              본 약관은 서비스를 이용하고자 하는 모든 사용자에게 그 적용을 받습니다.
            </li>
            <li>
              회사는 필요하다고 인정되는 경우 본 약관을 변경할 수 있으며, 변경된 약관은
              서비스 내 공지사항에 게시함으로써 효력을 발생합니다.
            </li>
            <li>
              회원은 변경된 약관에 대해 동의하지 않을 권리가 있으며, 동의하지 않을 경우
              서비스 이용이 제한될 수 있습니다.
            </li>
          </ol>
        </div>

        <div className="space-y-2">
          <h4 className="mt-3">제3조(회원가입 및 계정 관리)</h4>
          <ol className="flex flex-col gap-2">
            <li>본 서비스를 이용하려면 회원 가입이 필요합니다.</li>
            <li>
              회사는 회원에 대한 정보를 관리하기 위해 개인정보를 수집하며, 이에 대한
              내용은 개인정보 처리방침에서 규정합니다.
            </li>
            <li>회원은 개인정보가 변경되었을 경우 즉시 회사에게 알려야 합니다.</li>
            <li>
              회원은 자신의 ID와 비밀번호를 관리할 책임이 있으며, 이를 타인에게 양도 및
              대여할 수 없습니다.
            </li>
          </ol>
        </div>

        <div className="space-y-2">
          <h4 className="mt-3">제4조(서비스 이용)</h4>
          <ol className="flex flex-col gap-2">
            <li>
              회원은 서비스 이용시 이 약관에서 규정한 사항 및 회사가 공지한 사항을
              준수해야 하며, 법령과 공공질서에 위배되는 행위는 금지됩니다.
            </li>
            <li>
              회원은 회사의 명시적인 동의 없이 서비스를 이용하여 얻은 정보를 상업적으로
              이용하거나 타인에게 제공할 수 없습니다.
            </li>
            <li>
              회사는 불량 게시물 및 자료에 대하여 모니터링의 책임이 있으며, 이를
              발견하거나 신고를 받을시 해당 게시물 및 자료를 삭제하고 이를 등록한 회원에게
              제재를 가할 수 있습니다.
            </li>
            <ul>
              <li>다른 회원에게 심한 모욕을 주거나 명예를 손상하는 내용인 경우</li>
              <li>공공질서 및 미풍양속에 위반되는 내용을 유포하거나 링크시키는 경우</li>
              <li>불법 복제 또는 해킹을 조장하는 내용인 경우</li>
              <li>영리를 목적으로 하는 광고일 경우</li>
              <li>다른 이용자 또는 제3자의 저작권 등 기타 권리를 침해하는 경우</li>
              <li>기타 관계 법령에 위배된다고 판단하는 경우</li>
            </ul>
            <li>회사는 회원이 서비스 이용 중 발생한 문제에 대해 책임을 지지 않습니다.</li>
          </ol>
        </div>

        <div className="space-y-2">
          <h4 className="mt-3">제5조(서비스 제공의 중지)</h4>
          <ol className="flex flex-col gap-2">
            <li>회사는 다음과 같은 경우 서비스 제공을 중지할 수 있습니다.</li>
            <ul>
              <li>서비스 설비의 보수 등 공사로 인해 부득이한 경우</li>
              <li>
                서비스 이용량의 폭주 등이 원인이 되어 서비스 안정성 확보를 위해 필요한
                경우
              </li>
            </ul>
            <li>회사는 제1항의 경우 사전에 회원에게 공지할 수 있습니다.</li>
            <li>
              회사는 불가피한 사정으로 서비스를 중단하게 될 경우, 게시물의 이전 및 백업을
              돕기 위해 조치하려 노력합니다.
            </li>
          </ol>
        </div>

        <div className="space-y-2">
          <h4 className="mt-3">제6조(면책조항)</h4>
          <ol className="flex flex-col gap-2">
            <li>
              회사는 천재지변, 전쟁, 테러, 해킹 등 불가항력적인 사유로 인하여 서비스를
              제공할 수 없는 경우 책임을 지지 않습니다.
            </li>
            <li>
              회사는 회원의 귀책사유로 인해 발생한 서비스 이용 장애에 대해 책임을 지지
              않습니다.
            </li>
            <li>
              회사는 회원의 저장, 게시 또는 전송한 자료와 관련하여 일체의 책임을 지지
              않습니다.
            </li>
            <li>
              회사는 회원 상호 간 또는 회원과 제3자 상호 간에 서비스를 매개로 하여
              물품거래 등을 한 경우에 그로부터 발생하는 일체의 손해에 대하여 책임지지
              않습니다.
            </li>
            <li>
              회사는 운영자의 귀책 사유 없이 회원간에 발생한 일체의 분쟁에 대하여 책임지지
              않습니다.
            </li>
          </ol>
        </div>

        <div className="space-y-2">
          <h4 className="mt-3">제7조(재판권 및 준거법)</h4>
          <ol className="flex flex-col gap-2">
            <li>
              서비스 이용에 관한 분쟁은 회사와 회원간의 합의에 의해 원만히 해결하여야
              합니다.
            </li>
            <li>
              본 약관에 정한 사항에 관하여 소송이 제기될 경우 민사소송법 등 관련 법령에
              따른 법원을 관할 법원으로 합니다.
            </li>
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  )
}
