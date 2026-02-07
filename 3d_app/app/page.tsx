'use client';

import dynamic from 'next/dynamic';

const SakuraViewer = dynamic(() => import('./components/SakuraViewer'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <SakuraViewer />
    </div>
  );
}
