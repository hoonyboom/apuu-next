import Link, { LinkProps } from "next/link"
import { Icon, IconProps } from "../ui/Icon"

type SidebarLinkProps = {
  text: string
  icon: IconProps["name"]
} & LinkProps

export default function SidebarLink({ href, text, icon, ...props }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className="flex w-full items-center gap-3 rounded-xl px-4 py-2 transition duration-300 hover:bg-accent hover:font-semibold hover:text-accent-foreground"
      {...props}
    >
      <Icon name={icon} />
      <p>{text}</p>
    </Link>
  )
}
