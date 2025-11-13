import { useState } from 'react';

// Issue type definition
interface Issue {
  id: string;
  title: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  type: 'bug' | 'feature' | 'enhancement' | 'task';
  assignedTo: string;
  reporter: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  description: string;
  comments: number;
  attachments: number;
}

const IssuesPage = () => {
  // Sample issues data
  const [issues] = useState<Issue[]>([
    {
      id: 'ISSUE-001',
      title: 'Login page not loading on mobile devices',
      status: 'open',
      priority: 'high',
      type: 'bug',
      assignedTo: 'John Doe',
      reporter: 'Jane Smith',
      createdAt: '2024-03-10T09:15:00',
      updatedAt: '2024-03-10T14:30:00',
      dueDate: '2024-03-15',
      description: 'Users are reporting that the login page is not loading on mobile devices. The issue seems to be related to the responsive design breakpoints.',
      comments: 3,
      attachments: 2
    },
    {
      id: 'ISSUE-002',
      title: 'Add dark mode support',
      status: 'in_progress',
      priority: 'medium',
      type: 'enhancement',
      assignedTo: 'Alex Johnson',
      reporter: 'Mike Wilson',
      createdAt: '2024-03-08T11:20:00',
      updatedAt: '2024-03-11T10:45:00',
      description: 'Implement dark mode across the application to improve user experience in low-light conditions.',
      comments: 5,
      attachments: 1
    },
    {
      id: 'ISSUE-003',
      title: 'Payment gateway integration failing for international cards',
      status: 'open',
      priority: 'critical',
      type: 'bug',
      assignedTo: 'Sarah Williams',
      reporter: 'Customer Support',
      createdAt: '2024-03-12T15:45:00',
      updatedAt: '2024-03-12T16:20:00',
      description: 'Customers are unable to complete payments using international credit cards. The transaction fails with a generic error message.',
      comments: 8,
      attachments: 4
    },
    {
      id: 'ISSUE-004',
      title: 'Update user profile page design',
      status: 'open',
      priority: 'low',
      type: 'enhancement',
      assignedTo: 'Unassigned',
      reporter: 'Design Team',
      createdAt: '2024-03-05T14:10:00',
      updatedAt: '2024-03-05T14:10:00',
      description: 'Redesign the user profile page to match the new design system and improve usability.',
      comments: 2,
      attachments: 3
    },
    {
      id: 'ISSUE-005',
      title: 'Export reports to PDF functionality',
      status: 'in_progress',
      priority: 'medium',
      type: 'feature',
      assignedTo: 'David Kim',
      reporter: 'Product Manager',
      createdAt: '2024-02-28T10:30:00',
      updatedAt: '2024-03-10T11:15:00',
      dueDate: '2024-03-20',
      description: 'Add the ability to export reports to PDF format for better sharing and printing capabilities.',
      comments: 4,
      attachments: 0
    },
    {
      id: 'ISSUE-006',
      title: 'Performance optimization for dashboard',
      status: 'open',
      priority: 'high',
      type: 'task',
      assignedTo: 'Unassigned',
      reporter: 'System Admin',
      createdAt: '2024-03-11T16:20:00',
      updatedAt: '2024-03-11T16:20:00',
      description: 'The admin dashboard is experiencing slow load times. Need to optimize queries and implement pagination.',
      comments: 1,
      attachments: 0
    },
    {
      id: 'ISSUE-007',
      title: 'Add user role management',
      status: 'open',
      priority: 'medium',
      type: 'feature',
      assignedTo: 'Emma Davis',
      reporter: 'Admin',
      createdAt: '2024-03-01T09:45:00',
      updatedAt: '2024-03-10T13:20:00',
      description: 'Implement role-based access control with the ability to assign different permission levels to users.',
      comments: 7,
      attachments: 2
    },
    {
      id: 'ISSUE-008',
      title: 'Fix image upload validation',
      status: 'resolved',
      priority: 'medium',
      type: 'bug',
      assignedTo: 'Ryan Chen',
      reporter: 'Customer Support',
      createdAt: '2024-02-25T11:10:00',
      updatedAt: '2024-03-05T14:45:00',
      description: 'The image uploader is not properly validating file types and sizes, allowing users to upload invalid files.',
      comments: 3,
      attachments: 1
    }
  ]);

  // State for filters and search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [assignedToFilter, setAssignedToFilter] = useState('all');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  // Filter issues based on search and filters
  const filteredIssues = issues.filter(issue => {
    const matchesSearch = 
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || issue.priority === priorityFilter;
    const matchesType = typeFilter === 'all' || issue.type === typeFilter;
    const matchesAssignedTo = assignedToFilter === 'all' || issue.assignedTo === assignedToFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesType && matchesAssignedTo;
  });

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusClasses = {
      open: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      in_progress: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      resolved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      closed: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    };
    
    const statusLabels = {
      open: 'Open',
      in_progress: 'In Progress',
      resolved: 'Resolved',
      closed: 'Closed'
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
      low: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      medium: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      high: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      critical: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    };
    
    const priorityIcons = {
      low: 'arrow_downward',
      medium: 'remove',
      high: 'arrow_upward',
      critical: 'priority_high'
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

  // Get type badge
  const getTypeBadge = (type: string) => {
    const typeClasses = {
      bug: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      feature: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      enhancement: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      task: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
    };
    
    const typeIcons = {
      bug: 'bug_report',
      feature: 'star',
      enhancement: 'auto_awesome',
      task: 'assignment'
    };

    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${typeClasses[type as keyof typeof typeClasses]}`}>
        <span className="material-symbols-outlined mr-1 text-xs">
          {typeIcons[type as keyof typeof typeIcons]}
        </span>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Format date without time
  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Get assignee initials
  const getInitials = (name: string) => {
    if (name === 'Unassigned') return 'UA';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  // Get assignee color
  const getAssigneeColor = (name: string) => {
    if (name === 'Unassigned') return 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    
    // Simple hash function for consistent colors
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const colors = [
      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    ];
    
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Issue Tracker</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track and manage all your project issues in one place
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="material-symbols-outlined mr-1 text-lg">add</span>
            New Issue
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <span className="material-symbols-outlined mr-1 text-base">filter_alt</span>
            Filter
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <span className="material-symbols-outlined mr-1 text-base">download</span>
            Export
          </button>
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
                placeholder="Search issues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <select
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            
            <select
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
            
            <select
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="bug">Bug</option>
              <option value="feature">Feature</option>
              <option value="enhancement">Enhancement</option>
              <option value="task">Task</option>
            </select>
            
            <select
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              value={assignedToFilter}
              onChange={(e) => setAssignedToFilter(e.target.value)}
            >
              <option value="all">All Assignees</option>
              <option value="Unassigned">Unassigned</option>
              {Array.from(new Set(issues.map(issue => issue.assignedTo))).map(assignee => (
                <option key={assignee} value={assignee}>{assignee}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Issues List */}
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-800">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Issue
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Priority
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Assigned To
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Created
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900/50">
              {filteredIssues.length > 0 ? (
                filteredIssues.map((issue) => (
                  <tr 
                    key={issue.id}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-800/30 ${selectedIssue?.id === issue.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                    onClick={() => setSelectedIssue(issue)}
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {getTypeBadge(issue.type)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {issue.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {issue.id} • Opened by {issue.reporter} • {formatDateShort(issue.createdAt)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {getTypeBadge(issue.type)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {getPriorityBadge(issue.priority)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {getStatusBadge(issue.status)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${getAssigneeColor(issue.assignedTo)}`}>
                          {getInitials(issue.assignedTo)}
                        </span>
                        <span className="ml-2 text-sm text-gray-900 dark:text-white">
                          {issue.assignedTo}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(issue.createdAt)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle view action
                            setSelectedIssue(issue);
                          }}
                        >
                          <span className="material-symbols-outlined">visibility</span>
                        </button>
                        <button 
                          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
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
                      <p className="text-sm font-medium">No issues found</p>
                      <p className="mt-1 text-xs">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900/50 sm:px-6">
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
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredIssues.length}</span> of{' '}
                <span className="font-medium">{filteredIssues.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-gray-700">
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
                <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-gray-700">
                  <span className="sr-only">Next</span>
                  <span className="material-symbols-outlined h-5 w-5">chevron_right</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Issue Detail Panel */}
      {selectedIssue && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setSelectedIssue(null)}></div>
            
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:align-middle dark:bg-gray-900">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-900">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white" id="modal-title">
                          {selectedIssue.title}
                        </h3>
                        <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                          {selectedIssue.id}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none dark:bg-gray-900 dark:text-gray-500 dark:hover:text-gray-300"
                        onClick={() => setSelectedIssue(null)}
                      >
                        <span className="sr-only">Close</span>
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
                    
                    <div className="mt-2">
                      <div className="mt-4 flex items-center space-x-4">
                        <div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</span>
                          <div className="mt-1">
                            {getStatusBadge(selectedIssue.status)}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Priority</span>
                          <div className="mt-1">
                            {getPriorityBadge(selectedIssue.priority)}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</span>
                          <div className="mt-1">
                            {getTypeBadge(selectedIssue.type)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h4>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {selectedIssue.description}
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Assigned To</h4>
                            <div className="mt-1 flex items-center">
                              <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${getAssigneeColor(selectedIssue.assignedTo)}`}>
                                {getInitials(selectedIssue.assignedTo)}
                              </span>
                              <span className="ml-2 text-sm text-gray-900 dark:text-white">
                                {selectedIssue.assignedTo}
                              </span>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Reporter</h4>
                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                              {selectedIssue.reporter}
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</h4>
                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                              {formatDate(selectedIssue.createdAt)}
                            </p>
                          </div>
                          
                          {selectedIssue.dueDate && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Due Date</h4>
                              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                {formatDateShort(selectedIssue.dueDate)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Comments Section */}
                      <div className="mt-8">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Comments ({selectedIssue.comments})</h4>
                        <div className="mt-4 space-y-4">
                          {[1, 2, 3].map((comment) => (
                            <div key={comment} className="flex items-start space-x-3">
                              <div className="flex-shrink-0">
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                                  {['JD', 'JS', 'AW'][comment - 1]}
                                </span>
                              </div>
                              <div className="flex-1 rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    {['John Doe', 'Jane Smith', 'Alex Wilson'][comment - 1]}
                                  </span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {['2 hours ago', '1 day ago', '2 days ago'][comment - 1]}
                                  </span>
                                </div>
                                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                                  {[
                                    'I\'ve been looking into this issue and found that it\'s related to the mobile viewport settings.',
                                    'Thanks for the update. When can we expect a fix for this?',
                                    'I\'ve assigned this to our mobile team. They\'ll prioritize it.'
                                  ][comment - 1]}
                                </p>
                              </div>
                            </div>
                          ))}
                          
                          <div className="mt-4">
                            <label htmlFor="comment" className="sr-only">Add a comment</label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <input
                                type="text"
                                name="comment"
                                id="comment"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
                                placeholder="Add a comment..."
                              />
                              <button
                                type="button"
                                className="ml-3 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              >
                                Comment
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Attachments */}
                      {selectedIssue.attachments > 0 && (
                        <div className="mt-8">
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Attachments ({selectedIssue.attachments})</h4>
                          <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3].slice(0, selectedIssue.attachments).map((attachment) => (
                              <li key={attachment} className="col-span-1 flex rounded-md shadow-sm">
                                <div className="flex flex-1 items-center justify-between truncate rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                                  <div className="flex-1 truncate px-4 py-2 text-sm">
                                    <p className="font-medium text-gray-900 dark:text-white">
                                      Screenshot_{attachment}.png
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-400">
                                      {['1.2 MB', '850 KB', '2.3 MB'][attachment - 1]}
                                    </p>
                                  </div>
                                  <div className="flex-shrink-0 pr-2">
                                    <button
                                      type="button"
                                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800"
                                    >
                                      <span className="material-symbols-outlined">download</span>
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                      >
                        <span className="material-symbols-outlined mr-2">check</span>
                        Mark as Resolved
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        onClick={() => setSelectedIssue(null)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssuesPage;
