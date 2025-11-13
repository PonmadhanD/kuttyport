import { Route, Switch } from 'wouter';
import AdminDashboard from '@/pages/Admin/DashboardPage';
import UsersPage from '@/pages/Admin/UsersPage';
import HubsPage from '@/pages/Admin/HubsPage';
import OperationsPage from '@/pages/Admin/OperationsPage';
import FinancePage from '@/pages/Admin/FinancePage';
import ReportsPage from '@/pages/Admin/ReportsPage';
import AnalyticsPage from '@/pages/Admin/AnalyticsPage';
import IssuesPage from '@/pages/Admin/IssuesPage';
import AIInsightsPage from '@/pages/Admin/AIInsightsPage';
import SettingsPage from '@/pages/Admin/SettingsPage';

const AdminRoutes = () => {
  return (
    <Switch>
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/users" component={UsersPage} />
      <Route path="/admin/hubs" component={HubsPage} />
      <Route path="/admin/operations" component={OperationsPage} />
      <Route path="/admin/finance" component={FinancePage} />
      <Route path="/admin/reports" component={ReportsPage} />
      <Route path="/admin/analytics" component={AnalyticsPage} />
      <Route path="/admin/issues" component={IssuesPage} />
      <Route path="/admin/ai-insights" component={AIInsightsPage} />
      <Route path="/admin/settings" component={SettingsPage} />
    </Switch>
  );
};

export default AdminRoutes;
