"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function PrivacyPolicyModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="ghost">
          개인정보처리방침
        </Button>
      </DialogTrigger>
      <DialogContent className="scrollbar-thin max-h-fullscreen overflow-y-scroll sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">개인정보처리방침</DialogTitle>
        </DialogHeader>
        <p>
          {`Apuu(이하 "당사")는 개인정보보호법 등 관련 법령상의 개인정보 보호규정을
          준수하며, 이용자의 개인정보를 소중하게 생각하고 있습니다. 이에 개인정보
          처리방침을 다음과 같이 공지합니다.`}
        </p>

        <div className="space-y-2">
          <h4 className="mt-3">1. 개인정보의 처리 목적</h4>
          <p>당사는 이용자의 개인정보를 다음의 목적을 위해 처리합니다.</p>
          <ul>
            <li>회원 가입 및 관리</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="mt-3">2. 수집하는 개인정보 항목</h4>
          <p>
            당사는 회원 가입, 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고
            있습니다.
          </p>
          <ul>
            <li>회원정보: 이메일</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="mt-3">3. 개인정보의 보유 및 이용기간</h4>
          <p>
            당사는 이용자가 회원에서 탈퇴하거나 개인정보의 수집 및 이용목적이 달성되었을
            때 지체없이 파기합니다. 단, 관련 법령의 규정에 의하여 보존할 필요가 있는
            경우에는 일정기간 동안 회원정보를 안전하게 보관합니다.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="mt-3">4. 개인정보의 파기절차 및 방법</h4>
          <p>
            이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체없이
            파기됩니다. 파기절차 및 방법은 다음과 같습니다.
          </p>
          <ul>
            <li>
              파기절차: 이용자가 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의
              DB에 옮겨져 (종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한
              정보보호 사유에 따라 (보유 및 이용기간 참조) 일정기간 저장된 후 파기됩니다.
              별도 DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 보유되는 이외의
              다른 목적으로 이용되지 않습니다.
            </li>
            <li>
              파기방법: 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을
              사용하여 삭제합니다.
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="mt-3">5. 개인정보 제공</h4>
          <p>
            당사는 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 아래의 경우에는
            예외로 합니다.
          </p>
          <ul>
            <li>이용자들이 사전에 동의한 경우</li>
            <li>
              법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라
              수사기관의 요구가 있는 경우
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="mt-3">6. 개인정보처리 위탁</h4>
          <p>
            당사는 서비스 이행을 위하여 필요한 경우 이용자의 개인정보 처리를 위탁할 수
            있으며, 이 경우 위탁받는 자와 위탁업무 내용 등을 미리 이용자에게 고지합니다.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="mt-3">7. 이용자의 권리와 그 행사방법</h4>
          <p>
            이용자는 개인정보에 대해 언제든지 열람, 정정, 삭제를 요청할 수 있으며 당사는
            이에 대해 지체없이 조치합니다. 이용자가 개인정보의 삭제를 요청하는 경우, 회원
            탈퇴 절차를 진행합니다.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="mt-3">8. 개인정보의 안전성 확보 조치</h4>
          <p>
            당사는 개인정보보호법 등 관련 법령에서 요구하는 수준 이상의 안전성 확보를 위해
            다음과 같은 조치를 취하고 있습니다.
          </p>
          <ul>
            <li>개인정보처리시스템 접근 제한</li>
            <li>개인정보의 암호화</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="mt-3">9. 개인정보관리책임자 및 담당자</h4>
          <p>당사의 개인정보관리책임자와 담당자는 다음과 같습니다.</p>
          <ul>
            <li>개인정보관리책임자: 박광훈, apuu.offical@gmail.com, 010-7351-0097</li>
            <li>개인정보보호담당자: 박광훈, apuu.offical@gmail.com, 010-7351-0097</li>
          </ul>
          <p>
            이용자들은 개인정보보호와 관련하여 불만이나 문의사항이 있을 경우에는
            개인정보관리책임자 혹은 담당자에게 연락할 수 있습니다.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
