import { useState } from 'react';
import { Link } from 'wouter';

// Insight type definition
interface Insight {
  id: string;
  title: string;
  description: string;
  category: 'prediction' | 'anomaly' | 'recommendation' | 'trend';
  status: 'new' | 'in_review' | 'addressed' | 'dismissed';
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  date: string;
  relatedEntities: string[];
}

const AIInsightsPage = () => {
  // Sample insights data
  const [insights] = useState<Insight[]>([
    {
      id: 'INS-001',
      title: 'Unusual Shipping Delay Pattern Detected',
      description: 'Detected a 35% increase in shipping delays on the Mumbai-Delhi route compared to historical data. This may be due to ongoing road construction.',
      category: 'anomaly',
      status: 'new',
      confidence: 87,
      impact: 'high',
      date: '2024-03-10T14:30:00',
      relatedEntities: ['ROUTE-001', 'HUB-001', 'HUB-002']
    },
    {
      id: 'INS-002',
      title: 'Seasonal Demand Surge Prediction',
      description: 'AI predicts a 42% increase in package volume for the upcoming festival season. Consider increasing workforce and vehicle allocation.',
      category: 'prediction',
      status: 'in_review',
      confidence: 92,
      impact: 'high',
      date: '2024-03-09T09:15:00',
      relatedEntities: ['REGION-ALL']
    },
    {
      id: 'INS-003',
      title: 'Route Optimization Opportunity',
      description: 'Identified potential to reduce delivery time by 18% by reorganizing the delivery routes in Bangalore South region.',
      category: 'recommendation',
      status: 'new',
      confidence: 78,
      impact: 'medium',
      date: '2024-03-11T11:20:00',
      relatedEntities: ['ROUTE-045', 'HUB-003']
    },
    {
      id: 'INS-004',
      title: 'Customer Satisfaction Trend',
      description: 'Customer satisfaction scores have been decreasing by an average of 2.3% per week over the last month in the Chennai region.',
      category: 'trend',
      status: 'in_review',
      confidence: 85,
      impact: 'medium',
      date: '2024-03-08T16:45:00',
      relatedEntities: ['REGION-CHN']
    },
    {
      id: 'INS-005',
      title: 'Fuel Efficiency Anomaly',
      description: 'Fuel consumption has increased by 15% on average across all vehicles in the Delhi NCR region without a corresponding increase in distance traveled.',
      category: 'anomaly',
      status: 'new',
      confidence: 91,
      impact: 'high',
      date: '2024-03-12T10:10:00',
      relatedEntities: ['REGION-DEL', 'FLEET-DEL-ALL']
    }
  ]);

  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [impactFilter, setImpactFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Filter insights based on search and filters
  const filteredInsights = insights.filter(insight => {
    const matchesSearch = 
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || insight.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || insight.status === statusFilter;
    const matchesImpact = impactFilter === 'all' || insight.impact === impactFilter;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesImpact;
  });

  // Get category icon and color
  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'prediction':
        return { 
          icon: 'trending_up', 
          color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
          label: 'Prediction'
        };
      case 'anomaly':
        return { 
          icon: 'warning', 
          color: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
          label: 'Anomaly'
        };
      case 'recommendation':
        return { 
          icon: 'lightbulb', 
          color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
          label: 'Recommendation'
        };
      case 'trend':
        return { 
          icon: 'timeline', 
          color: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
          label: 'Trend'
        };
      default:
        return { 
          icon: 'insights', 
          color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
          label: 'Insight'
        };
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusClasses = {
      new: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
      in_review: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
      addressed: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
      dismissed: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    };
    
    const statusLabels = {
      new: 'New',
      in_review: 'In Review',
      addressed: 'Addressed',
      dismissed: 'Dismissed',
    };

    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClasses[status as keyof typeof statusClasses]}`}>
        {statusLabels[status as keyof typeof statusLabels] || status}
      </span>
    );
  };

  // Get impact badge
  const getImpactBadge = (impact: string) => {
    const impactClasses = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
      low: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    };

    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${impactClasses[impact as keyof typeof impactClasses]}`}>
        {impact.charAt(0).toUpperCase() + impact.slice(1)} Impact
      </span>
    );
  };

  // Get confidence bar
  const ConfidenceBar = ({ percentage }: { percentage: number }) => {
    const getBarColor = () => {
      if (percentage > 80) return 'bg-green-500';
      if (percentage > 50) return 'bg-yellow-500';
      return 'bg-red-500';
    };

    return (
      <div className="flex items-center">
        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 mr-2">
          <div 
            className={`h-2 rounded-full ${getBarColor()}`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{percentage}%</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">AI Insights</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            AI-powered insights and recommendations for your logistics operations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className={`inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium ${viewMode === 'grid' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}
            onClick={() => setViewMode('grid')}
          >
            <span className="material-symbols-outlined mr-1 text-base">grid_view</span>
            Grid
          </button>
          <button
            type="button"
            className={`inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium ${viewMode === 'list' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}
            onClick={() => setViewMode('list')}
          >
            <span className="material-symbols-outlined mr-1 text-base">view_list</span>
            List
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="material-symbols-outlined mr-1 text-lg">refresh</span>
            Refresh Insights
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
              <span className="material-symbols-outlined text-2xl">insights</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Insights</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{insights.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
          <div className="flex items-center">
            <div className="rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-900/50 dark:text-red-400">
              <span className="material-symbols-outlined text-2xl">warning</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">High Impact</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {insights.filter(i => i.impact === 'high').length}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
          <div className="flex items-center">
            <div className="rounded-full bg-yellow-100 p-3 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-400">
              <span className="material-symbols-outlined text-2xl">trending_up</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Predictions</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {insights.filter(i => i.category === 'prediction').length}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/50 dark:text-green-400">
              <span className="material-symbols-outlined text-2xl">lightbulb</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Recommendations</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {insights.filter(i => i.category === 'recommendation').length}
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
                placeholder="Search insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="prediction">Predictions</option>
              <option value="anomaly">Anomalies</option>
              <option value="recommendation">Recommendations</option>
              <option value="trend">Trends</option>
            </select>
            
            <select
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="in_review">In Review</option>
              <option value="addressed">Addressed</option>
              <option value="dismissed">Dismissed</option>
            </select>
            
            <select
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              value={impactFilter}
              onChange={(e) => setImpactFilter(e.target.value)}
            >
              <option value="all">All Impact Levels</option>
              <option value="high">High Impact</option>
              <option value="medium">Medium Impact</option>
              <option value="low">Low Impact</option>
            </select>
          </div>
        </div>
      </div>

      {/* Insights List View */}
      {viewMode === 'list' ? (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-800">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Insight
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Impact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Confidence
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900/50">
                {filteredInsights.map((insight) => {
                  const categoryInfo = getCategoryInfo(insight.category);
                  
                  return (
                    <tr 
                      key={insight.id}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-800/30 cursor-pointer ${selectedInsight?.id === insight.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                      onClick={() => setSelectedInsight(insight)}
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{insight.title}</div>
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                          {insight.description}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {insight.relatedEntities.map((entity, idx) => (
                            <span key={idx} className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                              {entity}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryInfo.color}`}>
                          <span className="material-symbols-outlined mr-1 text-xs">
                            {categoryInfo.icon}
                          </span>
                          {categoryInfo.label}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {getStatusBadge(insight.status)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {getImpactBadge(insight.impact)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <ConfidenceBar percentage={insight.confidence} />
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
                        </div>
                      </td>
                    </tr>
                  );
                })}
                
                {filteredInsights.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center">
                      <div className="mx-auto flex flex-col items-center justify-center text-gray-400">
                        <span className="material-symbols-outlined mb-2 text-4xl">insights</span>
                        <p className="text-sm font-medium">No insights found</p>
                        <p className="mt-1 text-xs">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredInsights.length > 0 ? (
            filteredInsights.map((insight) => {
              const categoryInfo = getCategoryInfo(insight.category);
              
              return (
                <div 
                  key={insight.id}
                  className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow dark:border-gray-800 dark:bg-gray-900/50"
                >
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryInfo.color}`}>
                        <span className="material-symbols-outlined mr-1 text-xs">
                          {categoryInfo.icon}
                        </span>
                        {categoryInfo.label}
                      </span>
                      <div className="flex space-x-2">
                        {getStatusBadge(insight.status)}
                        {getImpactBadge(insight.impact)}
                      </div>
                    </div>
                    
                    <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">
                      {insight.title}
                    </h3>
                    
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                      {insight.description}
                    </p>
                    
                    <div className="mt-4">
                      <div className="mb-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>Confidence</span>
                        <span>{insight.confidence}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                        <div 
                          className={`h-1.5 rounded-full ${
                            insight.confidence > 80 
                              ? 'bg-green-500' 
                              : insight.confidence > 50 
                                ? 'bg-yellow-500' 
                                : 'bg-red-500'
                          }`}
                          style={{ width: `${insight.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {insight.relatedEntities.length > 0 && (
                      <div className="mt-4">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Related</div>
                        <div className="flex flex-wrap gap-1">
                          {insight.relatedEntities.map((entity, idx) => (
                            <span key={idx} className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                              {entity}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-200 bg-gray-50 px-5 py-3 dark:border-gray-800 dark:bg-gray-800/50">
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Detected {new Date(insight.date).toLocaleDateString()}</span>
                      <button 
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        onClick={() => setSelectedInsight(insight)}
                      >
                        View details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
              <span className="material-symbols-outlined mb-4 text-4xl text-gray-400">insights</span>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">No insights found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Insight Detail Panel */}
      {selectedInsight && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedInsight.title}</h3>
                <div className="ml-3">
                  {getStatusBadge(selectedInsight.status)}
                </div>
                <div className="ml-2">
                  {getImpactBadge(selectedInsight.impact)}
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Detected on {new Date(selectedInsight.date).toLocaleString()}
              </p>
            </div>
            <button 
              onClick={() => setSelectedInsight(null)}
              className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="prose max-w-none dark:prose-invert">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h4>
                <p className="mt-1 text-gray-700 dark:text-gray-300">
                  {selectedInsight.description}
                </p>
                
                <h4 className="mt-6 text-sm font-medium text-gray-500 dark:text-gray-400">Details</h4>
                <div className="mt-2 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p>This insight was generated by our AI based on recent data patterns and historical analysis.</p>
                  <p>It has been reviewed by our system with {selectedInsight.confidence}% confidence level.</p>
                </div>
                
                {selectedInsight.relatedEntities.length > 0 && (
                  <>
                    <h4 className="mt-6 text-sm font-medium text-gray-500 dark:text-gray-400">Related Entities</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedInsight.relatedEntities.map((entity, idx) => (
                        <span 
                          key={idx} 
                          className="inline-flex items-center rounded bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        >
                          {entity}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              <div className="mt-8">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Recommended Actions</h4>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-start">
                    <span className="material-symbols-outlined mr-2 mt-0.5 text-green-500">check_circle</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Review the detailed analysis of this insight in the analytics dashboard.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined mr-2 mt-0.5 text-green-500">check_circle</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Consider adjusting your logistics strategy based on this insight.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined mr-2 mt-0.5 text-green-500">check_circle</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Share this insight with relevant team members for review.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Insight Details</h4>
                <dl className="mt-2 space-y-3">
                  <div>
                    <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">Category</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryInfo(selectedInsight.category).color}`}>
                        <span className="material-symbols-outlined mr-1 text-xs">
                          {getCategoryInfo(selectedInsight.category).icon}
                        </span>
                        {getCategoryInfo(selectedInsight.category).label}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">Confidence</dt>
                    <dd className="mt-1">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-2">
                          <div 
                            className={`h-2.5 rounded-full ${
                              selectedInsight.confidence > 80 
                                ? 'bg-green-500' 
                                : selectedInsight.confidence > 50 
                                  ? 'bg-yellow-500' 
                                  : 'bg-red-500'
                            }`} 
                            style={{ width: `${selectedInsight.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {selectedInsight.confidence}%
                        </span>
                      </div>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">First Detected</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {new Date(selectedInsight.date).toLocaleString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">Last Updated</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {new Date(selectedInsight.date).toLocaleString()}
                    </dd>
                  </div>
                </dl>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Actions</h4>
                <div className="mt-3 space-y-2">
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <span className="material-symbols-outlined mr-2 text-lg">edit</span>
                    Update Status
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <span className="material-symbols-outlined mr-2 text-lg">share</span>
                    Share Insight
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <span className="material-symbols-outlined mr-2 text-lg">download</span>
                    Export as PDF
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-red-700 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    <span className="material-symbols-outlined mr-2 text-lg">delete</span>
                    Dismiss Insight
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3 border-t border-gray-200 pt-6 dark:border-gray-800">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => setSelectedInsight(null)}
            >
              Close
            </button>
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span className="material-symbols-outlined mr-2 text-lg">check_circle</span>
              Mark as Reviewed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsightsPage;
