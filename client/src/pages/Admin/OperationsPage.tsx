import { useState } from 'react';
import { Link } from 'wouter';

// Operation type definition
interface Operation {
  id: string;
  type: 'pickup' | 'delivery' | 'transfer' | 'inventory';
  status: 'pending' | 'in_progress' | 'completed' | 'delayed' | 'cancelled';
  reference: string;
  origin: string;
  destination: string;
  scheduledTime: string;
  actualTime: string | null;
  assignedTo: string;
  priority: 'high' | 'medium' | 'low';
}

const OperationsPage = () => {
  // Sample operations data
  const [operations] = useState<Operation[]>([
    {
      id: 'OP-001',
      type: 'delivery',
      status: 'in_progress',
      reference: 'ORD-1001',
      origin: 'Mumbai Hub',
      destination: 'Andheri East, Mumbai',
      scheduledTime: '2024-03-11T10:00:00',
      actualTime: '2024-03-11T10:15:00',
      assignedTo: 'Rajesh Kumar',
      priority: 'high'
    },
    {
      id: 'OP-002',
      type: 'pickup',
      status: 'pending',
      reference: 'PICK-2045',
      origin: 'Bandra West, Mumbai',
      destination: 'Mumbai Hub',
      scheduledTime: '2024-03-11T14:30:00',
      actualTime: null,
      assignedTo: 'Amit Patel',
      priority: 'medium'
    },
    {
      id: 'OP-003',
      type: 'transfer',
      status: 'delayed',
      reference: 'XFER-3056',
      origin: 'Mumbai Hub',
      destination: 'Pune Hub',
      scheduledTime: '2024-03-10T08:00:00',
      actualTime: null,
      assignedTo: 'Vikram Singh',
      priority: 'high'
    },
    {
      id: 'OP-004',
      type: 'inventory',
      status: 'completed',
      reference: 'INV-4098',
      origin: 'Mumbai Hub',
      destination: 'Mumbai Hub',
      scheduledTime: '2024-03-09T09:00:00',
      actualTime: '2024-03-09T10:30:00',
      assignedTo: 'Priya Sharma',
      priority: 'low'
    },
    {
      id: 'OP-005',
      type: 'delivery',
      status: 'in_progress',
      reference: 'ORD-1002',
      origin: 'Mumbai Hub',
      destination: 'Thane West',
      scheduledTime: '2024-03-11T11:30:00',
      actualTime: '2024-03-11T11:45:00',
      assignedTo: 'Rahul Verma',
      priority: 'high'
    }
  ]);

  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  // Filter operations based on search and filters
  const filteredOperations = operations.filter(operation => {
    const matchesSearch = 
      operation.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      operation.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      operation.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      operation.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || operation.status === statusFilter;
    const matchesType = typeFilter === 'all' || operation.type === typeFilter;
    const matchesPriority = priorityFilter === 'all' || operation.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
      in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
      completed: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
      delayed: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
      cancelled: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    };
    
    const statusLabels = {
      pending: 'Pending',
      in_progress: 'In Progress',
      completed: 'Completed',
      delayed: 'Delayed',
      cancelled: 'Cancelled',
    };

    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClasses[status as keyof typeof statusClasses]}`}>
        {statusLabels[status as keyof typeof statusLabels] || status}
      </span>
    );
  };

  // Get priority badge
  const getPriorityBadge = (priority: string) => {
    const priorityClasses = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
      low: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    };

    const priorityIcons = {
      high: 'arrow_upward',
      medium: 'horizontal_rule',
      low: 'arrow_downward',
    };

    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityClasses[priority as keyof typeof priorityClasses]}`}>
        <span className="material-symbols-outlined mr-1 text-xs">
          {priorityIcons[priority as keyof typeof priorityIcons]}
        </span>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  // Get operation type icon
  const getOperationTypeIcon = (type: string) => {
    const typeIcons = {
      pickup: 'upload',
      delivery: 'download',
      transfer: 'sync_alt',
      inventory: 'inventory_2',
    };

    const typeColors = {
      pickup: 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400',
      delivery: 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400',
      transfer: 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400',
      inventory: 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400',
    };

    return (
      <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${typeColors[type as keyof typeof typeColors]}`}>
        <span className="material-symbols-outlined text-sm">
          {typeIcons[type as keyof typeof typeIcons]}
        </span>
      </span>
    );
  };

  // Format date and time
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Operations</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and track all logistics operations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className={`inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium ${viewMode === 'list' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}
            onClick={() => setViewMode('list')}
          >
            <span className="material-symbols-outlined mr-1 text-base">view_list</span>
            List View
          </button>
          <button
            type="button"
            className={`inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium ${viewMode === 'calendar' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}
            onClick={() => setViewMode('calendar')}
          >
            <span className="material-symbols-outlined mr-1 text-base">calendar_today</span>
            Calendar View
          </button>
          <Link 
            href="/admin/operations/new" 
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="material-symbols-outlined mr-1 text-lg">add</span>
            New Operation
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
              <span className="material-symbols-outlined text-2xl">pending_actions</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {operations.filter(op => op.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
          <div className="flex items-center">
            <div className="rounded-full bg-yellow-100 p-3 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-400">
              <span className="material-symbols-outlined text-2xl">pending</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">In Progress</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {operations.filter(op => op.status === 'in_progress').length}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/50 dark:text-green-400">
              <span className="material-symbols-outlined text-2xl">check_circle</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {operations.filter(op => op.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
          <div className="flex items-center">
            <div className="rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-900/50 dark:text-red-400">
              <span className="material-symbols-outlined text-2xl">warning</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Delayed</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {operations.filter(op => op.status === 'delayed').length}
              </p>
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
                placeholder="Search operations..."
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
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="delayed">Delayed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <select
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="pickup">Pickup</option>
              <option value="delivery">Delivery</option>
              <option value="transfer">Transfer</option>
              <option value="inventory">Inventory</option>
            </select>
            
            <select
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <span className="material-symbols-outlined mr-1 text-base">filter_alt</span>
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Operations Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-800">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Operation
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Reference
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Route
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Schedule
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Assigned To
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900/50">
              {filteredOperations.length > 0 ? (
                filteredOperations.map((operation) => (
                  <tr 
                    key={operation.id}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-800/30 ${selectedOperation?.id === operation.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                    onClick={() => setSelectedOperation(operation)}
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {getOperationTypeIcon(operation.type)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {operation.type.charAt(0).toUpperCase() + operation.type.slice(1)}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {operation.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {operation.reference}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        <div className="flex items-center">
                          <span className="material-symbols-outlined mr-1 text-green-500" style={{ fontSize: '1rem' }}>location_on</span>
                          <span>{operation.origin}</span>
                        </div>
                        <div className="ml-4 flex items-center">
                          <span className="material-symbols-outlined mr-1 text-red-500" style={{ fontSize: '1rem' }}>location_on</span>
                          <span>{operation.destination}</span>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        <div>Scheduled: {formatDateTime(operation.scheduledTime)}</div>
                        {operation.actualTime && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Actual: {formatDateTime(operation.actualTime)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {operation.assignedTo}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="space-y-1">
                        {getStatusBadge(operation.status)}
                        {getPriorityBadge(operation.priority)}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle view action
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
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center">
                    <div className="mx-auto flex flex-col items-center justify-center text-gray-400">
                      <span className="material-symbols-outlined mb-2 text-4xl">search_off</span>
                      <p className="text-sm font-medium">No operations found</p>
                      <p className="mt-1 text-xs">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Previous
          </button>
          <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
              <span className="font-medium">24</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Previous</span>
                <span className="material-symbols-outlined h-5 w-5">chevron_left</span>
              </button>
              <button
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                1
              </button>
              <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-white">
                2
              </button>
              <button className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-white md:inline-flex">
                3
              </button>
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                ...
              </span>
              <button className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-white md:inline-flex">
                5
              </button>
              <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Next</span>
                <span className="material-symbols-outlined h-5 w-5">chevron_right</span>
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Operation Detail Panel */}
      {selectedOperation && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedOperation.type.charAt(0).toUpperCase() + selectedOperation.type.slice(1)} Operation
                </h3>
                <div className="ml-3">
                  {getStatusBadge(selectedOperation.status)}
                </div>
                <div className="ml-2">
                  {getPriorityBadge(selectedOperation.priority)}
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {selectedOperation.id} • {selectedOperation.reference}
              </p>
            </div>
            <button 
              onClick={() => setSelectedOperation(null)}
              className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Operation Details</h4>
                <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">Type</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {selectedOperation.type.charAt(0).toUpperCase() + selectedOperation.type.slice(1)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">Scheduled Time</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {formatDateTime(selectedOperation.scheduledTime)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">Status</dt>
                    <dd className="mt-1">
                      {getStatusBadge(selectedOperation.status)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">Priority</dt>
                    <dd className="mt-1">
                      {getPriorityBadge(selectedOperation.priority)}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">Assigned To</dt>
                    <dd className="mt-1 flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 dark:bg-gray-700 dark:text-gray-300">
                        {selectedOperation.assignedTo.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <span className="ml-2 text-sm text-gray-900 dark:text-white">
                        {selectedOperation.assignedTo}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
              
              <div className="mt-6 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Route Information</h4>
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="flex items-center">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Origin</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{selectedOperation.origin}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-3 border-l-2 border-gray-200 pl-4 pt-1 dark:border-gray-700">
                    <div className="h-4 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Destination</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{selectedOperation.destination}</p>
                      </div>
                    </div>
                  </div>
                  
                  {selectedOperation.actualTime && (
                    <div className="mt-4 rounded-md bg-blue-50 p-3 dark:bg-blue-900/20">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <span className="material-symbols-outlined text-blue-400">schedule</span>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Actual Time</h3>
                          <div className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                            {formatDateTime(selectedOperation.actualTime)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Activity Log</h4>
                <div className="mt-4 space-y-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-900/50 dark:text-blue-300">
                        <span className="material-symbols-outlined text-sm">add</span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Operation created</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(selectedOperation.scheduledTime).toLocaleString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  {selectedOperation.status === 'in_progress' || selectedOperation.status === 'completed' ? (
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 dark:bg-green-900/50 dark:text-green-300">
                          <span className="material-symbols-outlined text-sm">play_arrow</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Operation started</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {selectedOperation.actualTime && new Date(selectedOperation.actualTime).toLocaleString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ) : null}
                  
                  {selectedOperation.status === 'completed' ? (
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 dark:bg-purple-900/50 dark:text-purple-300">
                          <span className="material-symbols-outlined text-sm">check_circle</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Operation completed</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date().toLocaleString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Quick Actions</h4>
                <div className="mt-4 space-y-2">
                  {selectedOperation.status === 'pending' && (
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <span className="material-symbols-outlined mr-2 text-lg">play_arrow</span>
                      Start Operation
                    </button>
                  )}
                  
                  {selectedOperation.status === 'in_progress' && (
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      <span className="material-symbols-outlined mr-2 text-lg">check_circle</span>
                      Mark as Complete
                    </button>
                  )}
                  
                  {selectedOperation.status === 'delayed' && (
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <span className="material-symbols-outlined mr-2 text-lg">update</span>
                      Update Status
                    </button>
                  )}
                  
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <span className="material-symbols-outlined mr-2 text-lg">edit</span>
                    Edit Operation
                  </button>
                  
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <span className="material-symbols-outlined mr-2 text-lg">share</span>
                    Share Details
                  </button>
                  
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-red-700 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    <span className="material-symbols-outlined mr-2 text-lg">delete</span>
                    Cancel Operation
                  </button>
                </div>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Operation Details</h4>
                <dl className="mt-2 space-y-2">
                  <div>
                    <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">Created By</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">System</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">Created On</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {new Date(selectedOperation.scheduledTime).toLocaleString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">Last Updated</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {new Date().toLocaleString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </dd>
                  </div>
                </dl>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Documents</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between rounded-md border border-gray-200 p-2 dark:border-gray-700">
                    <div className="flex items-center">
                      <span className="material-symbols-outlined mr-2 text-blue-500">description</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Packing Slip</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                      <span className="material-symbols-outlined">download</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between rounded-md border border-gray-200 p-2 dark:border-gray-700">
                    <div className="flex items-center">
                      <span className="material-symbols-outlined mr-2 text-green-500">receipt</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Invoice</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                      <span className="material-symbols-outlined">download</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between rounded-md border border-gray-200 p-2 dark:border-gray-700">
                    <div className="flex items-center">
                      <span className="material-symbols-outlined mr-2 text-purple-500">local_shipping</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Shipping Label</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                      <span className="material-symbols-outlined">download</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3 border-t border-gray-200 pt-6 dark:border-gray-800">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => setSelectedOperation(null)}
            >
              Close
            </button>
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span className="material-symbols-outlined mr-2 text-lg">save</span>
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OperationsPage;
