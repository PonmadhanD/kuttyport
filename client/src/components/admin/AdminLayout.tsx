import { ReactNode, useEffect } from 'react';
import { Link, useLocation } from 'wouter';

// Material Icons component to load the stylesheet
const MaterialIcons = () => {
  useEffect(() => {
    // Add Material Icons stylesheet
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return null;
};

interface NavItemProps {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const NavItem = ({ icon, label, href, active = false, onClick }: NavItemProps & { onClick?: (e: React.MouseEvent) => void }) => (
  <Link
    href={href}
    onClick={onClick}
    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
      active
        ? 'bg-blue-50 text-blue-600 font-semibold'
        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 font-medium'
    }`}
  >
    <span className="material-symbols-outlined">{icon}</span>
    <span>{label}</span>
  </Link>
);

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [location] = useLocation();

  const navItems = [
    { icon: 'dashboard', label: 'Dashboard', href: '/admin' },
    { icon: 'people', label: 'Users', href: '/admin/users' },
    { icon: 'warehouse', label: 'Hubs', href: '/admin/hubs' },
    { icon: 'inventory_2', label: 'Operations', href: '/admin/operations' },
    { icon: 'payments', label: 'Finance', href: '/admin/finance' },
    { icon: 'assessment', label: 'Reports', href: '/admin/reports' },
    { icon: 'insights', label: 'Analytics', href: '/admin/analytics' },
    { icon: 'bug_report', label: 'Issues', href: '/admin/issues' },
    { icon: 'smart_toy', label: 'AI Insights', href: '/admin/ai-insights' },
  ];

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    // Add any logout logic here (e.g., clear auth tokens)
    window.location.href = '/';
  };

  const bottomNavItems = [
    { icon: 'settings', label: 'Settings', href: '/admin/settings' },
    { icon: 'logout', label: 'Logout', href: '/', onClick: handleLogout },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location === path;
    }
    return location.startsWith(path);
  };

  return (
    <>
      <MaterialIcons />
      <div className="relative flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 z-40 h-screen w-64 flex-col border-r border-gray-200 bg-white flex">
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <img 
                src="/favicon.png" 
                alt="KuttyPort Logo" 
                className="h-8 w-8 rounded-md object-contain"
              />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-gray-900">KuttyPort</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={isActive(item.href)}
            />
          ))}
        </nav>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-gray-200 space-y-1">
          {bottomNavItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={isActive(item.href)}
            />
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col ml-64">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-sm px-6">
          <div className="flex-1">
            <label className="relative flex items-center text-gray-400 focus-within:text-gray-600">
              <span className="material-symbols-outlined absolute left-3">search</span>
              <input
                className="flex w-full max-w-md min-w-0 flex-1 resize-none overflow-hidden rounded-lg bg-gray-100 focus:outline-0 focus:ring-2 focus:ring-blue-100 h-10 pl-10 pr-4 text-sm font-normal text-gray-900"
                placeholder="Global Search..."
              />
            </label>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-gray-200 rounded-full w-10 h-10"></div>
              <div className="text-sm hidden sm:block">
                <p className="font-semibold text-gray-900">Jane Doe</p>
                <p className="text-gray-500">System Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      {/* AI Assistant Button */}
      <div className="fixed bottom-6 right-6 z-20">
        <button className="flex items-center gap-3 bg-blue-600 text-white rounded-full shadow-lg h-14 px-5 hover:bg-blue-700">
          <span className="material-symbols-outlined">smart_toy</span>
          <span className="font-semibold">AI Co-Pilot</span>
        </button>
      </div>
      </div>
    </>
  );
};
