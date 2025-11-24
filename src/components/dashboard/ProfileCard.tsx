'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function ProfileCard() {
  const { user } = useAuth();

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-gradient-to-br from-[#BDD0D2] to-[#A8BFC1] rounded-[20px] p-6 w-[330px] shadow-lg hover:shadow-xl transition-all hover:scale-105">
      <h3 className="text-xl font-bold text-black text-center mb-4 flex items-center justify-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        Profile
      </h3>
      <div className="flex flex-col items-center">
        <div className="w-[60px] h-[60px] bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mb-3 shadow-md ring-4 ring-white">
          <span className="text-xl font-bold text-white">
            {user?.name ? getInitials(user.name) : 'U'}
          </span>
        </div>
        <p className="text-xl font-bold text-black">
          {user?.name || 'User'}
        </p>
        {user?.keyStage && (
          <p className="text-base text-gray-700 mt-1 font-medium">
            Key Stage {user.keyStage}
          </p>
        )}
      </div>
    </div>
  );
}
