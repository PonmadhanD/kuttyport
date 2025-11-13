import { useState, useCallback, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { Button } from "@/components/ui/button";
import DeliveryMap from "@/components/DeliveryMap";

// Mock data for stops
const stops = [
  {
    id: 1,
    type: 'pickup',
    name: 'NYC-HUB-04',
    status: 'pending',
    time: '10:45 AM',
    details: 'Weight: 15 kg',
    address: '123 Main St, New York, NY 10001',
    completed: false,
    lat: 40.7128,
    lng: -74.0060
  },
  {
    id: 2,
    type: 'dropoff',
    name: 'BKLN-RES-12',
    status: 'in-progress',
    time: '11:30 AM',
    details: 'Items: 2',
    address: '456 Atlantic Ave, Brooklyn, NY 11217',
    completed: false,
    lat: 40.6846,
    lng: -73.9765
  },
  {
    id: 3,
    type: 'pickup',
    name: 'QNS-COM-01',
    status: 'completed',
    time: '12:15 PM',
    details: 'Completed',
    address: '789 Broadway, Queens, NY 11106',
    completed: true,
    lat: 40.7421,
    lng: -73.9483
  },
  {
    id: 4,
    type: 'pickup',
    name: 'MAN-HUB-02',
    status: 'pending',
    time: '01:05 PM',
    details: 'Weight: 8 kg',
    address: '321 Park Ave, New York, NY 10022',
    completed: false,
    lat: 40.7580,
    lng: -73.9855
  }
];

export default function LiveRoute() {
  const [, setLocation] = useLocation();
  const [selectedStopId, setSelectedStopId] = useState<number | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Simulated geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCurrentLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setCurrentLocation({ lat: 40.730610, lng: -73.935242 })
      );
    } else {
      setCurrentLocation({ lat: 40.730610, lng: -73.935242 });
    }
  }, []);

  const handleLocationClick = useCallback((loc: any) => {
    setSelectedStopId(loc.id);
  }, []);

  const handleAccept = (id: number) => console.log('Accepted stop:', id);
  const handleReject = (id: number) => console.log('Rejected stop:', id);

  const getStatusText = (status: string) =>
    status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('-');

  const generateRoutePath = useCallback(() => {
    const path: Array<[number, number]> = [];
    if (currentLocation) path.push([currentLocation.lat, currentLocation.lng]);
    stops.forEach(s => path.push([s.lat, s.lng]));
    return path;
  }, [currentLocation]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
      >
        ☰
      </button>

      {/* Sidebar */}
      <div className={`${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
                    md:translate-x-0 fixed md:static z-40 w-72 h-screen bg-white border-r border-gray-200 
                    transition-transform duration-300 ease-in-out flex flex-col`}>
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="flex items-center gap-3 p-3 mb-6">
            <div className="text-2xl">🚚</div>
            <h1 className="text-xl font-bold">KuttyPort</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            <Link href="/delivery/dashboard" className="w-full">
              <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-100 text-gray-700">
                <span className="text-xl">📊</span>
                <span className="font-medium">Dashboard</span>
              </div>
            </Link>
            <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors bg-blue-50 text-blue-700">
              <span className="text-xl">🗺️</span>
              <span className="font-medium">Live Route</span>
              <span className="ml-auto bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">4</span>
            </div>
            <Link href="/delivery/earnings" className="w-full">
              <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-100 text-gray-700">
                <span className="text-xl">💰</span>
                <span className="font-medium">Earnings</span>
              </div>
            </Link>
            <Link href="/delivery/profile" className="w-full">
              <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-100 text-gray-700">
                <span className="text-xl">👤</span>
                <span className="font-medium">Profile</span>
              </div>
            </Link>
          </nav>

          {/* Progress */}
          <div className="mt-8 p-4 bg-blue-50 rounded-xl">
            <div className="flex justify-between text-xs text-blue-800 mb-2">
              <span>Route Progress</span>
              <span>60%</span>
            </div>
            <div className="w-full bg-blue-100 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <div className="mt-4 flex justify-between text-xs text-blue-800">
              <span>4/10 Stops</span>
              <span>2h 15m left</span>
            </div>
          </div>

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
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Today's Delivery Route
              </h1>
              <p className="text-gray-600 mt-1 text-sm">
                Live Updates • {new Date().toLocaleDateString()} • Last updated: {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <div className="w-full h-[500px] bg-white rounded-lg border border-gray-200 overflow-hidden">
                {currentLocation ? (
                  <DeliveryMap
                    locations={stops.map(s => ({
                      ...s,
                      type: s.type as 'pickup' | 'dropoff',
                      status: s.status as 'pending' | 'in-progress' | 'completed'
                    }))}
                    onLocationClick={handleLocationClick}
                    selectedLocationId={selectedStopId}
                    routePath={generateRoutePath()}
                    currentLocation={currentLocation}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-600">Loading map...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Task List */}
            <div className="space-y-3">
              {selectedStopId && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4 transition-all duration-300 transform hover:shadow-md">
                  <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg text-sm font-medium text-blue-800">
                        {stops.find(s => s.id === selectedStopId)?.type === 'pickup' ? '📦' : '🚛'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {stops.find(s => s.id === selectedStopId)?.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                            {stops.find(s => s.id === selectedStopId)?.type === 'pickup' ? 'Pickup' : 'Drop-off'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {stops.find(s => s.id === selectedStopId)?.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <span>📍</span>
                          <span>{stops.find(s => s.id === selectedStopId)?.address}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span>ℹ️</span>
                          <span>{stops.find(s => s.id === selectedStopId)?.details}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-3 mt-3 border-t border-gray-100">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReject(selectedStopId);
                          }}
                        >
                          ❌ Reject
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 gap-1 bg-blue-600 hover:bg-blue-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAccept(selectedStopId);
                          }}
                        >
                          ✓ Accept
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                {stops.map(stop => (
                  <div
                    key={stop.id}
                    className={`bg-white p-3 rounded-lg border transition-all cursor-pointer ${
                      selectedStopId === stop.id 
                        ? 'border-blue-300 bg-blue-50 ring-2 ring-blue-100' 
                        : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/50'
                    }`}
                    onClick={() => setSelectedStopId(stop.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-9 h-9 flex items-center justify-center rounded-lg ${
                          stop.status === 'completed'
                            ? 'bg-green-100 text-green-600'
                            : stop.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {stop.type === 'pickup' ? '📦' : '🚛'}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">{stop.name}</p>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{stop.time}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-0.5 truncate">
                          {stop.type === 'pickup' ? 'Pickup' : 'Drop-off'} • {stop.details}
                        </p>
                        
                        {stop.status === 'in-progress' && (
                          <div className="mt-1.5">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">In Progress</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
