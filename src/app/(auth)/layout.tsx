import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F3F3F3]">
      {/* Left Panel - Blue Background */}
      <div className="hidden lg:flex lg:w-1/3 bg-[#33A1CD] rounded-[30px] m-8 relative">
        <div className="absolute top-8 left-8">
          {/* Logo */}
          <Link href="/">
            <div className="w-[115px] h-[115px] bg-white rounded-[56px] flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <span className="text-xl font-bold text-primary">Infoverse</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="text-center">
            <p className="text-2xl text-white font-semibold">
              Welcome to Infoverse Digital-Ed
            </p>
            <p className="text-lg text-white/80 mt-4">
              Your gateway to quality education
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form Area */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-[754px]">{children}</div>
      </div>

      {/* Help Button - Bottom Right */}
      <div className="fixed bottom-8 right-8 z-10">
        <Link href="/help">
          <button className="flex items-center gap-2 text-xl text-black hover:text-primary transition-colors">
            <span className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center text-base font-semibold hover:border-primary">
              ?
            </span>
            Help
          </button>
        </Link>
      </div>
    </div>
  );
}
