import { Switch, Route } from "wouter";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AdminRoutes from "@/routes/AdminRoutes";

// Import page components
import Landing from "@/pages/Landing";
import About from "@/pages/About";
import Platform from "@/pages/Platform";
import Technology from "@/pages/Technology";
import Contact from "@/pages/Contact";
import LiveRoute from "@/pages/Delivery/LiveRoute";
import Dashboard from "@/pages/Delivery/Dashboard";
import NotFound from "@/pages/not-found";

// Create a client
const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Landing} />
      <Route path="/about" component={About} />
      <Route path="/platform" component={Platform} />
      <Route path="/technology" component={Technology} />
      <Route path="/contact" component={Contact} />
      
      {/* Delivery Partner Routes */}
      <Route path="/delivery/route" component={LiveRoute} />
      <Route path="/delivery/dashboard" component={Dashboard} />
      <Route path="/delivery/tasks" component={Dashboard} />
      <Route path="/delivery/earnings" component={Dashboard} />
      <Route path="/delivery/profile" component={Dashboard} />
      
      {/* Admin Routes */}
      <Route path="/admin">
        <AdminLayout>
          <AdminRoutes />
        </AdminLayout>
      </Route>
      <Route path="/admin/*">
        <AdminLayout>
          <AdminRoutes />
        </AdminLayout>
      </Route>
      
      {/* 404 Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
