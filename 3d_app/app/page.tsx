'use client';

import dynamic from 'next/dynamic';

const SakuraViewer = dynamic(() => import('./components/SakuraViewer'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="relative">
      <div className="fixed inset-0 w-screen h-screen">
        <SakuraViewer />
      </div>
      <div className="relative z-10 pointer-events-none">
        <div className="h-[300vh]">
          <div className="h-screen flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              Scroll to rotate
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
