import NextImage, { ImageProps } from "next/image";

export default function Img(props: ImageProps) {
  return <NextImage width={1000} height={1000} {...props} />;
}
