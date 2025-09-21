import React from "react";

export default function LoginLoading() {
  return (
    <div className="min-h-screen w-full bg-neutral-100 px-4 py-12">
      <div className="mx-auto flex w-full max-w-[1400px] animate-pulse flex-col overflow-hidden rounded-[30px] bg-[#33A1CD] shadow-2xl lg:flex-row">
        <div className="hidden flex-1 bg-[#33A1CD] lg:block" />
        <div className="flex w-full max-w-xl flex-col gap-6 bg-[#F9F9F9] px-8 py-10">
          <div className="h-6 w-2/3 rounded-full bg-neutral-200" />
          <div className="h-10 w-1/2 rounded-full bg-neutral-200" />
          <div className="space-y-4">
            <div className="h-14 w-full rounded-2xl bg-neutral-200" />
            <div className="h-14 w-full rounded-2xl bg-neutral-200" />
            <div className="h-12 w-full rounded-2xl bg-neutral-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
