import AgreementModal from "../Provision/AgreementModal"
import PrivacyPolicyModal from "../Provision/PrivacyPolicyModal"

export default function Footer() {
  return (
    <footer className="fixed bottom-0 grid max-h-40 w-full place-items-center bg-gray-50 px-10">
      <div className="flex w-full items-center justify-between gap-4 p-10">
        <div className="flex flex-col">
          <h3 className="mb-2">Apuu</h3>
          <span className="text-2xs">Contact apuu.official@gmail.com</span>
          <span className="text-2xs">&copy;2024 Apuu. All rights reserved</span>
        </div>
        <div className="flex items-center gap-8 text-xs">
          <AgreementModal />
          <PrivacyPolicyModal />
        </div>
      </div>
    </footer>
  )
}
