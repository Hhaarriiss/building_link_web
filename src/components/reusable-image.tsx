import Image from "next/image"
import { cn } from "@/lib/utils"

interface ReusableImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fill?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export function ReusableImage({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  fill = false,
  objectFit = "cover",
}: ReusableImageProps) {
  const imageProps = fill
    ? {
        fill: true,
        style: { objectFit },
      }
    : {
        width: width || 500,
        height: height || 500,
      }

  return (
    <Image
      src={src}
      alt={alt}
      className={cn(className)}
      priority={priority}
      {...imageProps}
    />
  )
}
