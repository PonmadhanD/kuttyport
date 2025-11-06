import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { useAuth } from "@/hooks/useAuth";

// Public pages
import Landing from "@/pages/Landing";
import About from "@/pages/About";
import Platform from "@/pages/Platform";
import Technology from "@/pages/Technology";
import Contact from "@/pages/Contact";

// Dashboard pages
import CustomerDashboard from "@/pages/CustomerDashboard";

function Router() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Switch>
      {/* Public Routes */}
      {!isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/about" component={About} />
          <Route path="/platform" component={Platform} />
          <Route path="/technology" component={Technology} />
          <Route path="/contact" component={Contact} />
        </>
      ) : (
        <>
          {/* Dashboard Routes */}
          <Route path="/" component={() => <CustomerDashboard user={user!} />} />
          <Route path="/dashboard" component={() => <CustomerDashboard user={user!} />} />
          <Route path="/dashboard/book" component={() => <CustomerDashboard user={user!} />} />
          <Route path="/dashboard/tracking" component={() => <CustomerDashboard user={user!} />} />
          <Route path="/dashboard/assistant" component={() => <CustomerDashboard user={user!} />} />
          <Route path="/dashboard/insurance" component={() => <CustomerDashboard user={user!} />} />
          <Route path="/dashboard/support" component={() => <CustomerDashboard user={user!} />} />
          <Route path="/dashboard/profile" component={() => <CustomerDashboard user={user!} />} />
          
          {/* Public pages accessible when logged in */}
          <Route path="/about" component={About} />
          <Route path="/platform" component={Platform} />
          <Route path="/technology" component={Technology} />
          <Route path="/contact" component={Contact} />
        </>
      )}
      
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
