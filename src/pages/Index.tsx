import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/shared/StatCard";
import { DashboardCard } from "@/components/shared/DashboardCard";
import { PublicationCard } from "@/components/shared/PublicationCard";
import { ChartContainer } from "@/components/shared/ChartContainer";
import { Button } from "@/components/ui/button";
import {
  Users, Activity, DollarSign, Briefcase, PieChart,
  ArrowRight, Search, TrendingUp, Database, BookOpen, LayoutDashboard,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

const populationData = [
  { year: "2018", value: 11.1 }, { year: "2019", value: 11.3 },
  { year: "2020", value: 11.4 }, { year: "2021", value: 11.6 },
  { year: "2022", value: 11.7 }, { year: "2023", value: 11.9 },
  { year: "2024", value: 12.0 },
];

const employmentData = [
  { sector: "Agriculture", value: 38 }, { sector: "Services", value: 42 },
  { sector: "Industrie", value: 11 }, { sector: "Commerce", value: 9 },
];

const heroSlides = [
  {
    title: "Données statistiques officielles d'Haïti",
    subtitle: "Accédez aux indicateurs clés, tableaux de bord et publications de l'IHSI",
    cta: "Explorer les données",
    href: "/donnees-ouvertes",
  },
  {
    title: "Nouveau : Bulletin trimestriel T4 2024",
    subtitle: "Analyse des indicateurs macroéconomiques et tendances du marché du travail",
    cta: "Lire le bulletin",
    href: "/publications/bulletins",
  },
  {
    title: "API ouverte pour développeurs",
    subtitle: "Intégrez les données IHSI dans vos applications avec notre API REST",
    cta: "Voir la documentation",
    href: "/donnees-ouvertes/api",
  },
];

const dashboardLinks = [
  { title: "Démographie", href: "/tableaux-de-bord/demographie", icon: Users, description: "Population, migration, natalité", previewValue: "12.0M habitants" },
  { title: "IPC", href: "/tableaux-de-bord/ipc", icon: Activity, description: "Indice des prix à la consommation", previewValue: "24.8% inflation" },
  { title: "PIB", href: "/tableaux-de-bord/pib", icon: DollarSign, description: "Croissance économique nationale", previewValue: "1.8% croissance" },
  { title: "Travail", href: "/tableaux-de-bord/travail", icon: Briefcase, description: "Emploi, chômage, marché du travail", previewValue: "14.5% chômage" },
  { title: "Social", href: "/tableaux-de-bord/social", icon: PieChart, description: "Éducation, santé, pauvreté", previewValue: "72.3% alphabétisation" },
];

const quickActions = [
  { title: "Explorer les données", description: "Parcourir le catalogue de jeux de données", href: "/donnees-ouvertes", icon: Database },
  { title: "Voir les tableaux de bord", description: "Visualiser les indicateurs clés en temps réel", href: "/tableaux-de-bord", icon: LayoutDashboard },
  { title: "Dernières publications", description: "Bulletins, rapports et communiqués récents", href: "/publications", icon: BookOpen },
];

const latestPublications = [
  {
    title: "Bulletin trimestriel des statistiques - T4 2024",
    type: "Bulletin", date: "Mars 2025",
    excerpt: "Analyse des principaux indicateurs économiques et sociaux du dernier trimestre.",
    downloadUrl: "#",
  },
  {
    title: "Rapport annuel sur l'emploi en Haïti 2024",
    type: "Rapport", date: "Février 2025",
    excerpt: "État du marché du travail, taux de chômage par département et secteur d'activité.",
    downloadUrl: "#",
  },
  {
    title: "Communiqué : Indice des prix à la consommation - Février 2025",
    type: "Communiqué", date: "Mars 2025",
    excerpt: "L'IPC a enregistré une hausse de 1.2% en février, portant l'inflation annuelle à 24.8%.",
    downloadUrl: "#",
  },
];

export default function Index() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [heroSearch, setHeroSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((s) => (s + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[activeSlide];

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/donnees-ouvertes?q=${encodeURIComponent(heroSearch.trim())}`);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-transparent" />
        </div>
        <div className="container relative py-16 md:py-24">
          <div className="max-w-2xl animate-fade-in" key={activeSlide}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4 leading-tight tracking-tight">
              {slide.title}
            </h1>
            <p className="text-base md:text-lg text-primary-foreground/70 mb-8">
              {slide.subtitle}
            </p>
          </div>

          {/* Hero Search Bar — large and prominent */}
          <form onSubmit={handleHeroSearch} className="max-w-2xl mb-6">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Rechercher population, IPC, emploi, publications..."
                className="w-full h-14 pl-14 pr-5 rounded-xl bg-background/95 backdrop-blur text-foreground placeholder:text-muted-foreground border-0 ring-1 ring-border/20 focus:ring-2 focus:ring-secondary outline-none text-sm shadow-lg"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-secondary hover:bg-secondary/90 text-secondary-foreground h-10 px-4 rounded-lg"
              >
                Rechercher
              </Button>
            </div>
          </form>

          {/* Quick action pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.href}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground/90 text-xs font-medium hover:bg-primary-foreground/20 transition-colors"
              >
                <action.icon className="h-3.5 w-3.5" />
                {action.title}
              </Link>
            ))}
          </div>

          {/* Slide indicators */}
          <div className="flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeSlide ? "w-8 bg-secondary" : "w-4 bg-primary-foreground/30"
                }`}
                onClick={() => setActiveSlide(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* KPI Ribbon */}
      <section className="container -mt-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Population" value="12.0M" trend="up" trendValue="+1.4%" sparklineData={[10.8, 11.0, 11.1, 11.3, 11.4, 11.6, 11.7, 11.9, 12.0]} icon={<Users className="h-4 w-4" />} />
          <StatCard label="Inflation (IPC)" value="24.8%" trend="down" trendValue="-2.1 pts" sparklineData={[28, 27, 26.5, 26, 25.5, 25, 24.8]} icon={<Activity className="h-4 w-4" />} />
          <StatCard label="Taux de chômage" value="14.5%" trend="neutral" trendValue="0.0 pts" sparklineData={[15, 14.8, 14.6, 14.5, 14.5, 14.6, 14.5]} icon={<Briefcase className="h-4 w-4" />} />
          <StatCard label="Croissance PIB" value="1.8%" trend="up" trendValue="+0.5 pts" sparklineData={[0.5, 0.8, 1.0, 1.2, 1.3, 1.5, 1.8]} icon={<TrendingUp className="h-4 w-4" />} />
        </div>
      </section>

      {/* Dashboard Quick Links — 3 col grid, bigger cards */}
      <section className="container py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground tracking-tight">Tableaux de bord</h2>
            <p className="text-sm text-muted-foreground mt-1">Explorez les indicateurs clés en temps réel</p>
          </div>
          <Button variant="ghost" size="sm" asChild className="gap-1 text-secondary">
            <Link to="/tableaux-de-bord">Voir tout <ArrowRight className="h-3 w-3" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboardLinks.map((item) => (
            <DashboardCard
              key={item.title}
              title={item.title}
              description={item.description}
              href={item.href}
              icon={<item.icon className="h-6 w-6" />}
              previewValue={item.previewValue}
            />
          ))}
        </div>
      </section>

      {/* Latest Publications — BEFORE Tendances */}
      <section className="bg-muted/30">
        <div className="container py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground tracking-tight">Dernières publications</h2>
              <p className="text-sm text-muted-foreground mt-1">Bulletins, rapports et communiqués récents</p>
            </div>
            <Button variant="ghost" size="sm" asChild className="gap-1 text-secondary">
              <Link to="/publications">Toutes les publications <ArrowRight className="h-3 w-3" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {latestPublications.map((pub) => (
              <PublicationCard key={pub.title} {...pub} />
            ))}
          </div>
        </div>
      </section>

      {/* Key Trends — AFTER Publications */}
      <section>
        <div className="container py-12">
          <h2 className="text-xl font-bold text-foreground mb-6 tracking-tight">Tendances clés</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartContainer title="Évolution de la population" subtitle="En millions d'habitants, 2018–2024" source="IHSI, Estimations de population">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={populationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis domain={[10.5, 12.5]} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <defs>
                    <linearGradient id="popGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--secondary))" fill="url(#popGrad)" strokeWidth={2} name="Population (M)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>

            <ChartContainer title="Emploi par secteur" subtitle="Répartition en pourcentage, 2024" source="IHSI, Enquête emploi 2024">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={employmentData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="sector" type="category" width={80} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="value" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} name="%" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </section>
    </Layout>
  );
}
