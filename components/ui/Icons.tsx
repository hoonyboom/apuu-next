import { CheckIcon, Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";

const Icons = {
  hamburger: (props: IconProps) => <HamburgerMenuIcon {...props} />,
  close: (props: IconProps) => <Cross1Icon {...props} />,
  check: (props: IconProps) => <CheckIcon {...props} />,
};

export default Icons;
