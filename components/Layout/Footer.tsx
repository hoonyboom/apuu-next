import AgreementModal from "../Provision/AgreementModal"
import PrivacyPolicyModal from "../Provision/PrivacyPolicyModal"

export default function Footer() {
  return (
    <footer className="hidden w-full place-items-center bg-gray-50 sm:grid sm:px-2 md:px-10">
      <div className="flex w-full items-center justify-between gap-4 p-10">
        <div className="flex flex-col [&_span]:text-2xs">
          <h3 className="mb-2">Apuu</h3>
          <span>Contact apuu.official@gmail.com</span>
          <span>&copy;2024 Apuu. All rights reserved</span>
        </div>
        <div className="flex items-center gap-8 text-xs">
          <AgreementModal />
          <PrivacyPolicyModal />
        </div>
      </div>
    </footer>
  )
}
