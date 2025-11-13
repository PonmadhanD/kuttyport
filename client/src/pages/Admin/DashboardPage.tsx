import { Link } from 'wouter';

// Stats Card Component
const StatCard = ({ title, value, change, changeType, iconName }: {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'warning';
  iconName: string;
}) => {
  const changeColors = {
    increase: 'text-green-500',
    decrease: 'text-red-500',
    warning: 'text-yellow-500',
  };

  const changeIcons = {
    increase: 'arrow_upward',
    decrease: 'arrow_downward',
    warning: 'warning',
  };

  return (
    <div className="flex flex-1 flex-col gap-2 rounded-xl p-6 border border-gray-200 bg-white">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-gray-900 tracking-tight text-3xl font-bold mt-1">{value}</p>
        </div>
        <div className="text-blue-600">
          <span className="material-symbols-outlined">{iconName}</span>
        </div>
      </div>
      <div className="mt-2">
        <p className={`${changeColors[changeType]} text-sm font-medium flex items-center gap-1`}>
          <span className="material-symbols-outlined text-base">{changeIcons[changeType]}</span>
          <span>{change}</span>
        </p>
      </div>
    </div>
  );
};

// Shipment Volume Chart Component
const ShipmentVolumeChart = () => (
  <div className="lg:col-span-3 flex min-w-72 flex-1 flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6">
    <p className="text-gray-900 text-base font-semibold flex items-center gap-2">
      <span>📈</span> Weekly Shipment Volume
    </p>
    <div className="flex h-[250px] w-full items-end gap-4">
      <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 545 250" xmlns="http://www.w3.org/2000/svg">
        <g className="text-gray-200" opacity="0.7">
          <line stroke="currentColor" strokeDasharray="4 4" x1="0" x2="545" y1="1" y2="1"></line>
          <line stroke="currentColor" strokeDasharray="4 4" x1="0" x2="545" y1="63" y2="63"></line>
          <line stroke="currentColor" strokeDasharray="4 4" x1="0" x2="545" y1="125" y2="125"></line>
          <line stroke="currentColor" strokeDasharray="4 4" x1="0" x2="545" y1="187" y2="187"></line>
          <line stroke="currentColor" strokeDasharray="4 4" x1="0" x2="545" y1="249" y2="249"></line>
        </g>
        <path d="M25 187C52.1667 187 65.8 40 93 40C120.2 40 133.833 98 161 98C188.167 98 201.8 152 229 152C256.167 152 269.8 82 297 82C324.167 82 337.8 210 365 210C392.167 210 405.8 25 433 25C460.167 25 473.8 135 501 135" stroke="#2b6cee" strokeLinecap="round" strokeWidth="3"></path>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_chart" x1="272.5" x2="272.5" y1="25" y2="210">
            <stop stopColor="#2b6cee" stopOpacity="0.2"></stop>
            <stop offset="1" stopColor="#2b6cee" stopOpacity="0"></stop>
          </linearGradient>
        </defs>
        <path d="M501 135C473.8 135 460.167 25 433 25C405.8 25 392.167 210 365 210C337.8 210 324.167 82 297 82C269.8 82 256.167 152 229 152C201.8 152 188.167 98 161 98C133.833 98 120.2 40 93 40C65.8 40 52.1667 187 25 187V250H501V135Z" fill="url(#paint0_linear_chart)"></path>
      </svg>
    </div>
    <div className="flex justify-between -mt-4 text-xs text-gray-500 font-medium">
      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
    </div>
  </div>
);

// Shipment Status Chart Component
const ShipmentStatusChart = () => (
  <div className="lg:col-span-2 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6">
    <p className="text-gray-900 text-base font-semibold flex items-center gap-2">
      <span>📊</span> Shipments by Status
    </p>
    <div className="flex-1 flex items-center justify-center relative">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-3xl font-bold text-gray-900">5,430</p>
        <p className="text-sm text-gray-500">Total</p>
      </div>
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <circle className="stroke-current text-gray-100" cx="18" cy="18" fill="none" r="15.9155" strokeWidth="3"></circle>
        <circle className="stroke-current text-blue-600" cx="18" cy="18" fill="none" r="15.9155" strokeDasharray="60, 40" strokeDashoffset="25" strokeWidth="3"></circle>
        <circle className="stroke-current text-green-500" cx="18" cy="18" fill="none" r="15.9155" strokeDasharray="25, 75" strokeDashoffset="-15" strokeWidth="3"></circle>
        <circle className="stroke-current text-red-500" cx="18" cy="18" fill="none" r="15.9155" strokeDasharray="10, 90" strokeDashoffset="-40" strokeWidth="3"></circle>
      </svg>
    </div>
    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
        <span className="font-medium text-gray-700">In-Transit</span>
        <span className="ml-auto text-gray-500">60%</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        <span className="font-medium text-gray-700">Delivered</span>
        <span className="ml-auto text-gray-500">25%</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
        <span className="font-medium text-gray-700">Delayed</span>
        <span className="ml-auto text-gray-500">10%</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
        <span className="font-medium text-gray-700">Processing</span>
        <span className="ml-auto text-gray-500">5%</span>
      </div>
    </div>
  </div>
);

// Priority Shipments Table Component
const PriorityShipmentsTable = () => (
  <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
    <div className="p-6">
      <h3 className="text-gray-900 text-base font-semibold flex items-center gap-2">
        <span>🚨</span> High-Priority Shipments
      </h3>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Tracking ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Origin</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Destination</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Priority</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ULMS-84623</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">New York, USA</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">London, UK</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">In-Transit</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">High</span>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ULMS-84622</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Shanghai, CN</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Los Angeles, USA</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Delayed</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">High</span>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ULMS-84621</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rotterdam, NL</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Singapore, SG</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Delivered</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">High</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

// Recent Activity Component
const RecentActivity = () => (
  <div className="rounded-xl border border-gray-200 bg-white p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-gray-900 text-base font-semibold flex items-center gap-2">
        <span>📝</span> Recent Activity
      </h3>
      <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
    </div>
    <div className="space-y-4">
      {[
        { type: 'alert', title: 'Critical Alert', description: 'Shipment #ULMS-84622 is delayed by 48 hours.', time: '2 minutes ago', icon: 'error', color: 'red', emoji: '🚨' },
        { type: 'update', title: 'System Update', description: 'New analytics reports are now available.', time: '1 hour ago', icon: 'check_circle', color: 'green', emoji: '🔄' },
        { type: 'user', title: 'New User', description: 'John Smith has been added to the system.', time: '3 hours ago', icon: 'person_add', color: 'blue', emoji: '👤' },
      ].map((activity, index) => (
        <div key={index} className="flex gap-3">
          <div className="flex-shrink-0">
            <span className={`flex items-center justify-center h-10 w-10 rounded-full bg-${activity.color}-100 text-${activity.color}-600 text-xl`}>
              {activity.emoji || <span className="material-symbols-outlined">{activity.icon}</span>}
            </span>
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-900">{activity.title}</p>
            <p className="text-sm text-gray-500">{activity.description}</p>
            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Main Dashboard Component
const DashboardPage = () => {
  return (
      <div className="flex-1 p-6 lg:p-8">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <h1 className="text-gray-900 text-3xl font-bold tracking-tight flex items-center gap-2">
            <span>🚀</span> Admin Dashboard
          </h1>
          <Link href="/admin/shipments/new" className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
            <span>Create Shipment</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <StatCard
            title="📦 Total Shipments"
            value="14,289"
            change="+5.3%"
            changeType="increase"
            iconName="assessment"
          />
          <StatCard
            title="⏱️ On-Time Delivery"
            value="98.2%"
            change="+0.1%"
            changeType="increase"
            iconName="check_circle"
          />
          <StatCard
            title="🚚 Active Vehicles"
            value="1,230"
            change="-1.2%"
            changeType="decrease"
            iconName="local_shipping"
          />
          <StatCard
            title="⚠️ System Alerts"
            value="5"
            change="2 Critical"
            changeType="warning"
            iconName="warning"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 mb-6">
          <ShipmentVolumeChart />
          <ShipmentStatusChart />
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 gap-6">
          <PriorityShipmentsTable />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            {/* Additional content can go here */}
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>
      </div>
  );
};

export default DashboardPage;
