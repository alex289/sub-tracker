import type { ReactNode } from 'react';
import { Navbar } from './navbar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 px-6">{children}</main>
    </div>
  );
}
