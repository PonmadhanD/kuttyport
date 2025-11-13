import { useState } from 'react';
import { Link } from 'wouter';

// Hub type definition
interface Hub {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'maintenance' | 'inactive';
  capacity: number;
  currentLoad: number;
  manager: string;
  lastUpdated: string;
}

const HubsPage = () => {
  // Sample hub data
  const [hubs] = useState<Hub[]>([
    {
      id: 'HUB-001',
      name: 'Mumbai Central Hub',
      location: 'Mumbai, India',
      status: 'active',
      capacity: 5000,
      currentLoad: 3200,
      manager: 'Rajesh Kumar',
      lastUpdated: '2024-03-10T14:30:00',
    },
    {
      id: 'HUB-002',
      name: 'Delhi North Hub',
      location: 'New Delhi, India',
      status: 'active',
      capacity: 4500,
      currentLoad: 2800,
      manager: 'Priya Sharma',
      lastUpdated: '2024-03-11T09:15:00',
    },
    {
      id: 'HUB-003',
      name: 'Bangalore South Hub',
      location: 'Bangalore, India',
      status: 'maintenance',
      capacity: 3800,
      currentLoad: 0,
      manager: 'Vikram Patel',
      lastUpdated: '2024-03-09T16:45:00',
    },
    {
      id: 'HUB-004',
      name: 'Chennai East Hub',
      location: 'Chennai, India',
      status: 'inactive',
      capacity: 4200,
      currentLoad: 0,
      manager: 'Ananya Reddy',
      lastUpdated: '2024-03-08T11:20:00',
    },
  ]);

  const [selectedHub, setSelectedHub] = useState<Hub | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  // Filter hubs based on search and filters
  const filteredHubs = hubs.filter(hub => {
    const matchesSearch = 
      hub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hub.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hub.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || hub.status === statusFilter;
    const matchesLocation = locationFilter === 'all' || hub.location === locationFilter;
    
    return matchesSearch && matchesStatus && matchesLocation;
  });

  // Calculate capacity percentage
  const getCapacityPercentage = (current: number, total: number) => {
    return Math.round((current / total) * 100);
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
      maintenance: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
      inactive: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    };

    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClasses[status as keyof typeof statusClasses] || ''}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Capacity bar component
  const CapacityBar = ({ percentage, status }: { percentage: number; status: string }) => {
    const getBarColor = () => {
      if (status === 'inactive') return 'bg-gray-200 dark:bg-gray-700';
      if (percentage > 80) return 'bg-red-500';
      if (percentage > 50) return 'bg-yellow-500';
      return 'bg-green-500';
    };

    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div 
          className={`h-2.5 rounded-full ${getBarColor()}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Hub Management</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Monitor and manage distribution hubs
          </p>
        </div>
        <Link 
          href="/admin/hubs/new" 
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          <span>Add New Hub</span>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
              <span className="material-symbols-outlined text-2xl">warehouse</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Hubs</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">4</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/50 dark:text-green-400">
              <span className="material-symbols-outlined text-2xl">check_circle</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Hubs</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">2</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
          <div className="flex items-center">
            <div className="rounded-full bg-yellow-100 p-3 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-400">
              <span className="material-symbols-outlined text-2xl">engineering</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Under Maintenance</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">1</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
          <div className="flex items-center">
            <div className="rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-900/50 dark:text-red-400">
              <span className="material-symbols-outlined text-2xl">dangerous</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Inactive Hubs</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="material-symbols-outlined text-gray-400">search</span>
              </div>
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-white p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                placeholder="Search hubs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
              <option value="inactive">Inactive</option>
            </select>
            
            <select
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="all">All Locations</option>
              <option value="Mumbai, India">Mumbai</option>
              <option value="New Delhi, India">Delhi</option>
              <option value="Bangalore, India">Bangalore</option>
              <option value="Chennai, India">Chennai</option>
            </select>
          </div>
        </div>
      </div>

      {/* Hubs Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-800">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Hub ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Hub Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Capacity
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900/50">
              {filteredHubs.map((hub) => {
                const capacityPercentage = getCapacityPercentage(hub.currentLoad, hub.capacity);
                
                return (
                  <tr 
                    key={hub.id} 
                    className={`hover:bg-gray-50 dark:hover:bg-gray-800/30 cursor-pointer ${selectedHub?.id === hub.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                    onClick={() => setSelectedHub(hub)}
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-blue-600 dark:text-blue-400">{hub.id}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{hub.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Manager: {hub.manager}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <span className="material-symbols-outlined mr-1 text-gray-400" style={{ fontSize: '1rem' }}>location_on</span>
                        <span className="text-sm text-gray-900 dark:text-white">{hub.location}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <StatusBadge status={hub.status} />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {hub.currentLoad.toLocaleString()} / {hub.capacity.toLocaleString()} units
                      </div>
                      <div className="mt-1 w-full">
                        <CapacityBar 
                          percentage={capacityPercentage} 
                          status={hub.status}
                        />
                        <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>{capacityPercentage}% utilized</span>
                          <span>{hub.capacity - hub.currentLoad} available</span>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle view details action
                          }}
                        >
                          <span className="material-symbols-outlined">visibility</span>
                        </button>
                        <button 
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle edit action
                          }}
                        >
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hub Details Panel */}
      {selectedHub && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Hub Details</h3>
            <button 
              onClick={() => setSelectedHub(null)}
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Hub ID</h4>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedHub.id}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Hub Name</h4>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedHub.name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</h4>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedHub.location}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</h4>
              <div className="mt-1">
                <StatusBadge status={selectedHub.status} />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Manager</h4>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedHub.manager}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</h4>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {new Date(selectedHub.lastUpdated).toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Capacity Utilization</h4>
            <div className="mt-2">
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
              <div className="mt-1 w-full">
                <CapacityBar 
                  percentage={getCapacityPercentage(selectedHub.currentLoad, selectedHub.capacity)} 
                  status={selectedHub.status}
                />
                <div className="mt-1 flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    {selectedHub.currentLoad.toLocaleString()} units used
                  </span>
                  <span className="text-gray-900 font-medium dark:text-white">
                    {getCapacityPercentage(selectedHub.currentLoad, selectedHub.capacity)}% utilized
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => setSelectedHub(null)}
            >
              Close
            </button>
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span className="material-symbols-outlined mr-2 text-lg">edit</span>
              Edit Hub
            </button>
          </div>
        </div>
      )}
      
      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <span className="material-symbols-outlined mr-2 text-blue-600 dark:text-blue-400">download</span>
          Export Data
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <span className="material-symbols-outlined mr-2 text-green-600 dark:text-green-400">print</span>
          Print Report
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <span className="material-symbols-outlined mr-2 text-purple-600 dark:text-purple-400">settings</span>
          Hub Settings
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <span className="material-symbols-outlined mr-2 text-lg">add</span>
          Add New Hub
        </button>
      </div>
    </div>
  );
};

export default HubsPage;
