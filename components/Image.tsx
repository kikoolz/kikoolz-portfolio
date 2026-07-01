"use client";

import NextImage, { type StaticImageData } from "next/image";

type ImageProps = {
  imgUrl: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function Image({
  imgUrl,
  alt,
  width = 960,
  height = 480,
  className,
}: ImageProps) {
  // Handle undefined/null imgUrl
  if (!imgUrl) {
    console.warn('Image component received undefined imgUrl');
    return <div className={`bg-zinc-200 dark:bg-zinc-800 rounded-lg ${className}`} />;
  }

  // For uploaded images, use regular img tag to avoid Next.js Image restrictions
  const isUploadedImage = typeof imgUrl === 'string' && imgUrl.startsWith('/uploads/');
  const isExternalUrl = typeof imgUrl === 'string' && (imgUrl.startsWith('http://') || imgUrl.startsWith('https://'));
  
  if (isUploadedImage || isExternalUrl) {
    return (
      <img
        src={imgUrl}
        alt={alt}
        className={className}
        onError={(e) => {
          console.error('Image failed to load:', imgUrl);
          e.currentTarget.src = '/placeholder.jpg'; // Fallback image
        }}
      />
    );
  }

  // For static images, use Next.js Image component
  return (
    <NextImage
      src={imgUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={(e) => {
        console.error('NextImage failed to load:', imgUrl);
      }}
    />
  );
}

