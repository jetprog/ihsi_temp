import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Statistiques from "./pages/Statistiques";
import TableauxDeBord from "./pages/TableauxDeBord";
import Dashboard from "./pages/Dashboard";
import DonneesOuvertes from "./pages/DonneesOuvertes";
import Publications from "./pages/Publications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/statistiques" element={<Statistiques />} />
          <Route path="/statistiques/:slug" element={<Statistiques />} />
          <Route path="/tableaux-de-bord" element={<TableauxDeBord />} />
          <Route path="/tableaux-de-bord/:slug" element={<Dashboard />} />
          <Route path="/donnees-ouvertes" element={<DonneesOuvertes />} />
          <Route path="/donnees-ouvertes/:slug" element={<DonneesOuvertes />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/publications/:slug" element={<Publications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
