'use client';

import Image from 'next/image';

interface ImageObject {
  url: string;
  width: number;
  height: number;
  alt: string;
}

interface ContentRendererProps {
  content: string | ImageObject | null | undefined;
}

function isImageObject(content: any): content is ImageObject {
  return (
    content &&
    typeof content === 'object' &&
    'url' in content &&
    'width' in content &&
    'height' in content
  );
}

export function ContentRenderer({ content }: ContentRendererProps) {
  if (isImageObject(content)) {
    return (
      <div className="my-2">
        <Image
          src={content.url}
          width={content.width}
          height={content.height}
          alt={content.alt || 'Quiz image'}
          className="max-w-full rounded-lg"
        />
      </div>
    );
  }

  if (typeof content === 'string') {
    // Using dangerouslySetInnerHTML to support potential HTML content from the API
    return <span dangerouslySetInnerHTML={{ __html: content }} />;
  }

  return null;
}
