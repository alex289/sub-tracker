import { BarChart3, CreditCard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import AboutDialog from './about-dialog';
import { ModeToggle } from './mode-toggle';

export function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    {
      name: 'Subscriptions',
      href: '/',
      icon: <CreditCard className="h-4 w-4" />,
    },
    {
      name: 'Statistics',
      href: '/statistics',
      icon: <BarChart3 className="h-4 w-4" />,
    },
  ];

  return (
    <header className="border-b">
      <div className="flex h-14 items-center px-6">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <CreditCard className="h-6 w-6" />
            <span className="font-bold">SubTracker</span>
          </Link>
        </div>
        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'hover:text-primary flex items-center gap-1 text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'text-foreground'
                  : 'text-muted-foreground',
              )}>
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <AboutDialog />
        </div>
      </div>
    </header>
  );
}
