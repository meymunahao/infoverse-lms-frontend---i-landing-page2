'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import type { LessonAssets } from '@/types/oak-api.types';

interface AssetDownloadsProps {
  assets: LessonAssets | null;
}

export function AssetDownloads({ assets }: AssetDownloadsProps) {
  if (!assets?.assets || assets.assets.length === 0) {
    return null;
  }

  // Filter out video and quiz assets as they're shown separately
  const downloadableAssets = assets.assets.filter(a =>
    a.type !== 'video' &&
    !a.type.includes('Quiz')
  );

  if (downloadableAssets.length === 0) {
    return null;
  }

  const getAssetIcon = (assetType: string) => {
    switch (assetType) {
      case 'slideDeck':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6M9 17h3" />
          </svg>
        );
      case 'worksheet':
      case 'worksheetAnswers':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Lesson Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {downloadableAssets.map((asset, index) => (
            <a
              key={index}
              href={asset.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                {getAssetIcon(asset.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text-dark truncate">
                  {asset.label}
                </p>
                <p className="text-sm text-text-light">
                  Download
                </p>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
