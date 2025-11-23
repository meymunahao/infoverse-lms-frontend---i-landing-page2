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
    <div className="bg-[#BDD0D2] rounded-[15px] p-6 w-[330px]">
      <h3 className="text-xl font-semibold text-black text-center mb-4">
        Profile
      </h3>
      <div className="flex flex-col items-center">
        <div className="w-[50px] h-[50px] bg-primary rounded-full flex items-center justify-center mb-2">
          <span className="text-lg font-bold text-white">
            {user?.name ? getInitials(user.name) : 'U'}
          </span>
        </div>
        <p className="text-xl font-semibold text-black">
          {user?.name || 'User'}
        </p>
        {user?.keyStage && (
          <p className="text-sm text-text-light mt-1">
            Key Stage {user.keyStage}
          </p>
        )}
      </div>
    </div>
  );
}
