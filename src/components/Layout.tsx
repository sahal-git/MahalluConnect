import { ReactNode } from 'react';
import { TopNav } from './TopNav';
import { BottomNav } from './BottomNav';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <TopNav />
      <main className="flex-1 overflow-y-auto pt-16 pb-20">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
