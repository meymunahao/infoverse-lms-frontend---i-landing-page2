import type { ImgHTMLAttributes } from 'react';

type NextImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  blurDataURL?: string;
  placeholder?: string;
};

export default function NextImage({ fill, blurDataURL, placeholder, ...props }: NextImageProps) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...props} />;
}
