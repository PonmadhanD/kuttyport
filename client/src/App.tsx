import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Import page components
import Landing from "@/pages/Landing";
import About from "@/pages/About";
import Platform from "@/pages/Platform";
import Technology from "@/pages/Technology";
import Contact from "@/pages/Contact";
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
