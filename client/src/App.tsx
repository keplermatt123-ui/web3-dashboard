import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Members from "@/pages/Members";

// Events page can reuse home or members layout concepts, but for this MVP 
// we'll just redirect /events to Home section or create a placeholder if needed.
// Given constraints, I will add a simple placeholder for Events if navigated to directly
// to ensure no 404s for linked routes.

function EventsPage() {
    return (
        <div className="min-h-screen bg-background text-white flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Events</h1>
                <p className="text-muted-foreground">Coming soon...</p>
                <a href="/" className="mt-4 inline-block text-primary hover:underline">Go Home</a>
            </div>
        </div>
    )
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/members" component={Members} />
      <Route path="/events" component={EventsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
