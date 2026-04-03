import { useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/shared/StatCard";
import { ChartContainer } from "@/components/shared/ChartContainer";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Copy, Users, TrendingUp, DollarSign, BarChart3, LineChart as LineChartIcon, Map } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";
import { toast } from "sonner";

const dashboardConfig: Record<string, { title: string; kpis: any[] }> = {
  demographie: {
    title: "Tableau de bord — Démographie",
    kpis: [
      { label: "Population totale", value: "12.0M", trend: "up" as const, trendValue: "+1.4%", icon: Users },
      { label: "Taux de natalité", value: "22.4‰", trend: "down" as const, trendValue: "-0.3‰" },
      { label: "Espérance de vie", value: "64.7 ans", trend: "up" as const, trendValue: "+0.5" },
      { label: "Densité", value: "432/km²", trend: "up" as const, trendValue: "+1.2%" },
    ],
  },
  ipc: {
    title: "Tableau de bord — IPC",
    kpis: [
      { label: "IPC global", value: "324.5", trend: "up" as const, trendValue: "+1.2%" },
      { label: "Inflation annuelle", value: "24.8%", trend: "down" as const, trendValue: "-2.1 pts" },
      { label: "Alimentation", value: "+28.3%", trend: "up" as const, trendValue: "+0.5%" },
      { label: "Transport", value: "+18.7%", trend: "down" as const, trendValue: "-1.3%" },
    ],
  },
  pib: {
    title: "Tableau de bord — PIB",
    kpis: [
      { label: "PIB nominal", value: "$21.5B", trend: "up" as const, trendValue: "+3.2%", icon: DollarSign },
      { label: "PIB/habitant", value: "$1,792", trend: "up" as const, trendValue: "+1.8%" },
      { label: "Croissance réelle", value: "1.8%", trend: "up" as const, trendValue: "+0.5 pts" },
      { label: "Investissement/PIB", value: "26.4%", trend: "up" as const, trendValue: "+1.1 pts" },
    ],
  },
  travail: {
    title: "Tableau de bord — Travail",
    kpis: [
      { label: "Population active", value: "4.8M", trend: "up" as const, trendValue: "+2.1%" },
      { label: "Taux de chômage", value: "14.5%", trend: "neutral" as const, trendValue: "0.0 pts" },
      { label: "Emploi informel", value: "58.3%", trend: "down" as const, trendValue: "-0.8%" },
      { label: "Sous-emploi", value: "22.1%", trend: "down" as const, trendValue: "-1.2 pts" },
    ],
  },
  social: {
    title: "Tableau de bord — Social",
    kpis: [
      { label: "Taux de pauvreté", value: "58.5%", trend: "down" as const, trendValue: "-1.3 pts" },
      { label: "Accès eau potable", value: "62.4%", trend: "up" as const, trendValue: "+2.1%" },
      { label: "Taux alphabétisation", value: "72.3%", trend: "up" as const, trendValue: "+1.5%" },
      { label: "Scolarisation", value: "84.1%", trend: "up" as const, trendValue: "+2.8%" },
    ],
  },
};

const lineData = [
  { month: "Jan", val1: 300, val2: 280 }, { month: "Fév", val1: 305, val2: 285 },
  { month: "Mar", val1: 310, val2: 290 }, { month: "Avr", val1: 312, val2: 293 },
  { month: "Mai", val1: 315, val2: 298 }, { month: "Jun", val1: 318, val2: 300 },
  { month: "Jul", val1: 320, val2: 305 }, { month: "Aoû", val1: 322, val2: 308 },
  { month: "Sep", val1: 323, val2: 310 }, { month: "Oct", val1: 324, val2: 312 },
  { month: "Nov", val1: 324.5, val2: 315 }, { month: "Déc", val1: 325, val2: 318 },
];

const barData = [
  { dep: "Ouest", val: 4.2 }, { dep: "Nord", val: 1.2 },
  { dep: "Artibonite", val: 1.8 }, { dep: "Sud", val: 0.8 }, { dep: "Centre", val: 0.7 },
];

const tableData = [
  { indicator: "Population", value: "12,000,000", year: "2024", source: "IHSI" },
  { indicator: "Natalité", value: "22.4‰", year: "2024", source: "IHSI" },
  { indicator: "Mortalité", value: "7.8‰", year: "2024", source: "IHSI" },
  { indicator: "Espérance de vie", value: "64.7 ans", year: "2023", source: "IHSI" },
  { indicator: "Croissance naturelle", value: "1.46%", year: "2024", source: "IHSI" },
];

const regions = ["Tous", "Ouest", "Nord", "Artibonite", "Sud", "Centre", "Nord-Est", "Nord-Ouest", "Sud-Est", "Grand'Anse", "Nippes"];
const years = ["2024", "2023", "2022", "2021", "2020", "2019", "2018"];
const indicators = ["Tous les indicateurs", "Population", "Natalité", "Mortalité", "Espérance de vie"];

export default function Dashboard() {
  const { slug } = useParams<{ slug: string }>();
  const config = dashboardConfig[slug || "demographie"] || dashboardConfig.demographie;
  const [region, setRegion] = useState("Tous");
  const [yearFrom, setYearFrom] = useState("2018");
  const [yearTo, setYearTo] = useState("2024");
  const [indicator, setIndicator] = useState("Tous les indicateurs");
  const [chartView, setChartView] = useState("line");

  const handleEmbed = () => {
    const url = `${window.location.origin}/embed/tableaux-de-bord/${slug || "demographie"}`;
    navigator.clipboard.writeText(`<iframe src="${url}" width="100%" height="600" frameborder="0"></iframe>`);
    toast.success("Code d'intégration copié !");
  };

  const tooltipStyle = {
    backgroundColor: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: 8,
    fontSize: 12,
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Title + Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-foreground">{config.title}</h1>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 h-9">
              <Download className="h-3.5 w-3.5" /> CSV
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 h-9">
              <Download className="h-3.5 w-3.5" /> PNG
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 h-9" onClick={handleEmbed}>
              <Copy className="h-3.5 w-3.5" /> Embed
            </Button>
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {config.kpis.map((kpi: any) => (
            <StatCard
              key={kpi.label}
              label={kpi.label}
              value={kpi.value}
              trend={kpi.trend}
              trendValue={kpi.trendValue}
              icon={kpi.icon ? <kpi.icon className="h-4 w-4" /> : undefined}
            />
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6 p-4 rounded-lg bg-muted/50 border">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">Période</span>
            <Select value={yearFrom} onValueChange={setYearFrom}>
              <SelectTrigger className="w-24 h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>{years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
            </Select>
            <span className="text-xs text-muted-foreground">—</span>
            <Select value={yearTo} onValueChange={setYearTo}>
              <SelectTrigger className="w-24 h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>{years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-36 h-8 text-xs"><SelectValue placeholder="Région" /></SelectTrigger>
            <SelectContent>{regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={indicator} onValueChange={setIndicator}>
            <SelectTrigger className="w-44 h-8 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>{indicators.map(ind => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}</SelectContent>
          </Select>
        </div>

        {/* Main Chart with View Toggle */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground">Visualisation principale</h2>
            <Tabs value={chartView} onValueChange={setChartView}>
              <TabsList className="h-8">
                <TabsTrigger value="line" className="gap-1 text-xs px-3 h-7">
                  <LineChartIcon className="h-3.5 w-3.5" /> Ligne
                </TabsTrigger>
                <TabsTrigger value="bar" className="gap-1 text-xs px-3 h-7">
                  <BarChart3 className="h-3.5 w-3.5" /> Barres
                </TabsTrigger>
                <TabsTrigger value="map" className="gap-1 text-xs px-3 h-7">
                  <Map className="h-3.5 w-3.5" /> Carte
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <ChartContainer
            title={chartView === "bar" ? "Par département" : "Tendance mensuelle"}
            subtitle={chartView === "bar" ? "En millions, 2024" : "Indice, 2024"}
            source="IHSI"
          >
            <ResponsiveContainer width="100%" height="100%">
              {chartView === "line" ? (
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend />
                  <Line type="monotone" dataKey="val1" name="Série 1" stroke="hsl(var(--secondary))" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="val2" name="Série 2" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
                </LineChart>
              ) : chartView === "bar" ? (
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="dep" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="val" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} name="Population (M)" />
                </BarChart>
              ) : (
                <AreaChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <defs>
                    <linearGradient id="mapGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="val1" stroke="hsl(var(--secondary))" fill="url(#mapGrad)" strokeWidth={2} name="Indice" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Data table */}
        <div className="rounded-lg border bg-card mb-6">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold text-sm">Données détaillées</h3>
            <Button variant="outline" size="sm" className="gap-1 h-8 text-xs">
              <Download className="h-3 w-3" /> Exporter
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Indicateur</TableHead>
                <TableHead>Valeur</TableHead>
                <TableHead>Année</TableHead>
                <TableHead>Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.indicator}>
                  <TableCell className="font-medium">{row.indicator}</TableCell>
                  <TableCell>{row.value}</TableCell>
                  <TableCell>{row.year}</TableCell>
                  <TableCell className="text-muted-foreground">{row.source}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Source & Methodology */}
        <div className="rounded-lg border bg-muted/30 p-5">
          <h3 className="font-semibold text-sm text-foreground mb-2">Source & Méthodologie</h3>
          <p className="text-xs text-muted-foreground leading-relaxed mb-2">
            <strong>Source :</strong> Institut Haïtien de Statistique et d'Informatique (IHSI), données collectées dans le cadre des enquêtes nationales et du recensement général.
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
            <strong>Dernière mise à jour :</strong> Mars 2025 &nbsp;·&nbsp; <strong>Fréquence :</strong> Trimestrielle
          </p>
          <Button variant="link" size="sm" className="h-auto p-0 text-xs text-secondary" asChild>
            <a href="/publications">Consulter la note méthodologique →</a>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
