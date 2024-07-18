import Image, { ImageProps } from "next/image";

type AvatarProps = Partial<ImageProps>;

export default function Avatar({
  src = "/assets/svgs/default_profile.svg",
  alt = "프로필 사진",
  ...props
}: AvatarProps) {
  return <Image src={src} alt={alt} width={32} height={32} {...props} />;
}
