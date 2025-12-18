'use client';

import { useState } from 'react';
import AiChatModal from './AiChatModal';

interface AiHelperButtonProps {
  lessonContext: string;
  lessonTitle?: string;
}

export function AiHelperButton({ lessonContext, lessonTitle }: AiHelperButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
        style={{
          background: 'linear-gradient(135deg, #4285f4 0%, #8b5cf6 100%)',
        }}
        aria-label="Open AI Helper"
      >
        <svg
          className="w-7 h-7 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>

        {/* Tooltip */}
        <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          AI Helper
        </span>

        {/* Pulse animation ring */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{
          background: 'linear-gradient(135deg, #4285f4 0%, #8b5cf6 100%)',
        }} />
      </button>

      {/* Chat Modal */}
      <AiChatModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        lessonContext={lessonContext}
        lessonTitle={lessonTitle}
      />
    </>
  );
}

export default AiHelperButton;
