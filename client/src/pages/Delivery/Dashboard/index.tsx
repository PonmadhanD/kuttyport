import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';

// Dashboard Components
import Overview from './Overview';
import Tasks from './Tasks';
import Earnings from './Earnings';
import Profile from './Profile';

type MenuItem = {
  name: string;
  icon: string;
  path: string;
  component: React.ComponentType;
};

const menuItems: MenuItem[] = [
  { name: 'Dashboard', icon: '📊', path: '/delivery/dashboard', component: Overview },
  { name: 'Live Route', icon: '🗺️', path: '/delivery/route', component: () => {
      window.location.href = '/delivery/route';
      return null;
    } 
  },
  { name: 'Earnings', icon: '💰', path: '/delivery/earnings', component: Earnings },
  { name: 'Profile', icon: '👤', path: '/delivery/profile', component: Profile },
];

export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  
  // Find the active path that matches the current location
  const activePath = menuItems.find(item => location.startsWith(item.path))?.path || '/delivery/dashboard';
  
  // Get active component
  const ActiveComponent = menuItems.find(item => item.path === activePath)?.component || Overview;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Mobile menu button */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside 
        className={`${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
                  md:translate-x-0 fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="flex items-center gap-3 p-3 mb-6">
            <div className="text-2xl">🚚</div>
            <h1 className="text-xl font-bold">KuttyPort</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <div 
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                            ${activePath === item.path 
                              ? 'bg-blue-50 text-blue-700' 
                              : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            ))}
          </nav>

          {/* User profile */}
          <div className="pt-4 mt-auto border-t border-gray-200">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                👤
              </div>
              <div>
                <p className="font-medium">Delivery Partner</p>
                <p className="text-sm text-gray-500">ID: DP-12345</p>
              </div>
            </div>
            
            {/* Logout Button */}
            <Link href="/" className="block w-full">
              <div className="flex items-center gap-3 p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer">
                <span className="text-xl">🚪</span>
                <span className="font-medium">Logout</span>
              </div>
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 md:ml-64 overflow-y-auto h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4">
            <ActiveComponent />
          </div>
        </div>
      </main>
    </div>
  );
}
