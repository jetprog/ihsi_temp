import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { navigationItems } from "@/lib/navigation";
import { StatCard } from "@/components/shared/StatCard";
import { ChartContainer } from "@/components/shared/ChartContainer";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Briefcase, Heart, MapPin, Download, FileText, Image } from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import { useLanguage } from "@/i18n/context";

interface TopicConfig {
  titleKey: string;
  descKey: string;
  icon: React.ReactNode;
  kpis: { labelKey: string; value: string; trend: "up" | "down" | "neutral"; trendValue: string; sparklineData: number[] }[];
  chartTitleKey: string;
  chartType: "area" | "bar";
  chartData: Record<string, string | number>[];
  chartDataKey: string;
  chartXKey: string;
  tableHeaderKeys: string[];
  tableRows: (string | number)[][];
  sourceKey: string;
}

const topics: Record<string, TopicConfig> = {
  demographie: {
    titleKey: "stats.demoTitle",
    descKey: "stats.demoDesc",
    icon: <Users className="h-5 w-5" />,
    kpis: [
      { labelKey: "stats.population", value: "12.0M", trend: "up", trendValue: "+1.2%", sparklineData: [9.8, 10.1, 10.4, 10.7, 11.0, 11.4, 11.7, 12.0] },
      { labelKey: "stats.birthRate", value: "22.4‰", trend: "down", trendValue: "-0.8‰", sparklineData: [28, 27, 26, 25, 24, 23.5, 23, 22.4] },
      { labelKey: "stats.lifeExpectancy", value: "64.7 ans", trend: "up", trendValue: "+0.5", sparklineData: [58, 59, 60, 61, 62, 63, 64, 64.7] },
      { labelKey: "stats.density", value: "432/km²", trend: "up", trendValue: "+5", sparklineData: [380, 390, 400, 408, 415, 420, 427, 432] },
    ],
    chartTitleKey: "stats.populationEvolution",
    chartType: "area",
    chartData: [
      { year: "2016", value: 10.4 }, { year: "2017", value: 10.6 }, { year: "2018", value: 10.8 },
      { year: "2019", value: 11.0 }, { year: "2020", value: 11.2 }, { year: "2021", value: 11.4 },
      { year: "2022", value: 11.6 }, { year: "2023", value: 11.8 }, { year: "2024", value: 12.0 },
    ],
    chartDataKey: "value",
    chartXKey: "year",
    tableHeaderKeys: ["common.indicator", "common.value", "common.year", "common.source"],
    tableRows: [
      ["stats.totalPopulation", "12 000 000", "2024", "IHSI"],
      ["stats.birthRate", "22.4‰", "2023", "IHSI/MSPP"],
      ["stats.mortalityRate", "8.2‰", "2023", "IHSI/MSPP"],
      ["stats.lifeExpectancy", "64.7 ans", "2023", "IHSI"],
      ["stats.annualGrowth", "1.2%", "2024", "IHSI"],
      ["stats.sexRatio", "0.98", "2024", "IHSI"],
    ],
    sourceKey: "stats.demoSource",
  },
  economie: {
    titleKey: "stats.econTitle",
    descKey: "stats.econDesc",
    icon: <TrendingUp className="h-5 w-5" />,
    kpis: [
      { labelKey: "stats.gdp", value: "$21.5B", trend: "up", trendValue: "+1.4%", sparklineData: [18, 19, 19.5, 20, 20.2, 20.5, 21, 21.5] },
      { labelKey: "stats.inflation", value: "24.8%", trend: "down", trendValue: "-2.1%", sparklineData: [30, 29, 28, 27, 26.5, 26, 25, 24.8] },
      { labelKey: "stats.extTrade", value: "$5.2B", trend: "up", trendValue: "+3.2%", sparklineData: [4.0, 4.2, 4.5, 4.6, 4.8, 5.0, 5.1, 5.2] },
      { labelKey: "stats.investment", value: "$1.8B", trend: "up", trendValue: "+5.0%", sparklineData: [1.2, 1.3, 1.4, 1.5, 1.5, 1.6, 1.7, 1.8] },
    ],
    chartTitleKey: "stats.gdpEvolution",
    chartType: "bar",
    chartData: [
      { year: "2016", value: 18.0 }, { year: "2017", value: 18.5 }, { year: "2018", value: 19.0 },
      { year: "2019", value: 19.5 }, { year: "2020", value: 19.2 }, { year: "2021", value: 20.0 },
      { year: "2022", value: 20.5 }, { year: "2023", value: 21.0 }, { year: "2024", value: 21.5 },
    ],
    chartDataKey: "value",
    chartXKey: "year",
    tableHeaderKeys: ["common.indicator", "common.value", "common.year", "common.source"],
    tableRows: [
      ["stats.nominalGdp", "$21.5 milliards", "2024", "BRH/IHSI"],
      ["stats.gdpPerCapita", "$1,792", "2024", "IHSI"],
      ["stats.inflationRate", "24.8%", "2024", "BRH"],
      ["stats.tradeBalance", "-$3.4B", "2023", "BRH"],
      ["stats.diasporaTransfers", "$4.0B", "2023", "BRH"],
      ["stats.exchangeRate", "132.5 HTG/USD", "2024", "BRH"],
    ],
    sourceKey: "stats.econSource",
  },
  travail: {
    titleKey: "stats.emploiTitle",
    descKey: "stats.emploiDesc",
    icon: <Briefcase className="h-5 w-5" />,
    kpis: [
      { labelKey: "stats.unemploymentRate", value: "14.5%", trend: "down", trendValue: "-0.8%", sparklineData: [17, 16.5, 16, 15.8, 15.5, 15.2, 15, 14.5] },
      { labelKey: "stats.activePop", value: "4.8M", trend: "up", trendValue: "+2.1%", sparklineData: [4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.8] },
      { labelKey: "stats.minWage", value: "685 HTG", trend: "up", trendValue: "+10%", sparklineData: [350, 400, 420, 500, 550, 600, 650, 685] },
      { labelKey: "stats.informalEmployment", value: "58%", trend: "neutral", trendValue: "stable", sparklineData: [60, 59, 59, 58, 58, 58, 58, 58] },
    ],
    chartTitleKey: "stats.unemploymentEvolution",
    chartType: "area",
    chartData: [
      { year: "2016", value: 17.0 }, { year: "2017", value: 16.5 }, { year: "2018", value: 16.2 },
      { year: "2019", value: 15.8 }, { year: "2020", value: 16.5 }, { year: "2021", value: 15.5 },
      { year: "2022", value: 15.2 }, { year: "2023", value: 15.0 }, { year: "2024", value: 14.5 },
    ],
    chartDataKey: "value",
    chartXKey: "year",
    tableHeaderKeys: ["common.indicator", "common.value", "common.year", "common.source"],
    tableRows: [
      ["stats.unemploymentRate", "14.5%", "2024", "IHSI/ECVMAS"],
      ["stats.activePop", "4.8 millions", "2024", "IHSI"],
      ["stats.formalEmployment", "42%", "2023", "IHSI"],
      ["stats.informalEmployment", "58%", "2023", "IHSI"],
      ["stats.dailyMinWage", "685 HTG", "2024", "MAST"],
      ["stats.underEmployment", "22%", "2023", "IHSI"],
    ],
    sourceKey: "stats.emploiSource",
  },
  social: {
    titleKey: "stats.socialTitle",
    descKey: "stats.socialDesc",
    icon: <Heart className="h-5 w-5" />,
    kpis: [
      { labelKey: "stats.literacy", value: "61.7%", trend: "up", trendValue: "+1.5%", sparklineData: [52, 54, 56, 57, 58, 59, 60, 61.7] },
      { labelKey: "stats.waterAccess", value: "52%", trend: "up", trendValue: "+2.3%", sparklineData: [40, 42, 44, 45, 47, 49, 50, 52] },
      { labelKey: "stats.poverty", value: "58.5%", trend: "down", trendValue: "-1.2%", sparklineData: [65, 64, 63, 62, 61, 60, 59, 58.5] },
      { labelKey: "stats.schooling", value: "78%", trend: "up", trendValue: "+2.0%", sparklineData: [65, 67, 69, 71, 73, 75, 76, 78] },
    ],
    chartTitleKey: "stats.schoolingEvolution",
    chartType: "area",
    chartData: [
      { year: "2016", value: 65 }, { year: "2017", value: 67 }, { year: "2018", value: 69 },
      { year: "2019", value: 71 }, { year: "2020", value: 70 }, { year: "2021", value: 73 },
      { year: "2022", value: 75 }, { year: "2023", value: 76 }, { year: "2024", value: 78 },
    ],
    chartDataKey: "value",
    chartXKey: "year",
    tableHeaderKeys: ["common.indicator", "common.value", "common.year", "common.source"],
    tableRows: [
      ["stats.literacyRate", "61.7%", "2023", "IHSI/MENFP"],
      ["stats.primarySchooling", "78%", "2024", "MENFP"],
      ["stats.waterAccess", "52%", "2023", "DINEPA"],
      ["stats.povertyRate", "58.5%", "2023", "IHSI"],
      ["stats.electricityAccess", "45%", "2023", "EDH"],
      ["stats.infantMortality", "49‰", "2023", "MSPP"],
    ],
    sourceKey: "stats.socialSource",
  },
  geographique: {
    titleKey: "stats.geoTitle",
    descKey: "stats.geoDesc",
    icon: <MapPin className="h-5 w-5" />,
    kpis: [
      { labelKey: "stats.departments", value: "10", trend: "neutral", trendValue: "—", sparklineData: [10, 10, 10, 10, 10, 10, 10, 10] },
      { labelKey: "stats.westPop", value: "39%", trend: "up", trendValue: "+0.5%", sparklineData: [36, 36.5, 37, 37.5, 38, 38.2, 38.5, 39] },
      { labelKey: "stats.maxDensity", value: "1 825/km²", trend: "up", trendValue: "+15", sparklineData: [1700, 1720, 1740, 1760, 1780, 1790, 1810, 1825] },
      { labelKey: "stats.ruralPop", value: "47%", trend: "down", trendValue: "-1.0%", sparklineData: [53, 52, 51, 50, 49.5, 49, 48, 47] },
    ],
    chartTitleKey: "stats.popByDepartment",
    chartType: "bar",
    chartData: [
      { year: "Ouest", value: 4.7 }, { year: "Artibonite", value: 1.8 }, { year: "Nord", value: 1.2 },
      { year: "Sud", value: 0.8 }, { year: "Nord-Est", value: 0.4 }, { year: "Nord-Ouest", value: 0.7 },
      { year: "Centre", value: 0.8 }, { year: "Sud-Est", value: 0.6 }, { year: "Grande-Anse", value: 0.5 },
      { year: "Nippes", value: 0.4 },
    ],
    chartDataKey: "value",
    chartXKey: "year",
    tableHeaderKeys: ["stats.department", "stats.populationCol", "stats.area", "stats.densityCol"],
    tableRows: [
      ["Ouest", "4 700 000", "2,577", "1,825"],
      ["Artibonite", "1 800 000", "4,887", "368"],
      ["Nord", "1 200 000", "2,115", "567"],
      ["Sud", "800 000", "2,654", "301"],
      ["Centre", "800 000", "3,487", "229"],
      ["Nord-Ouest", "700 000", "2,103", "333"],
      ["Sud-Est", "600 000", "2,034", "295"],
      ["Grande-Anse", "500 000", "1,912", "261"],
      ["Nippes", "400 000", "1,268", "315"],
      ["Nord-Est", "400 000", "1,623", "246"],
    ],
    sourceKey: "stats.geoSource",
  },
};

function TopicPage({ topic }: { topic: TopicConfig }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const title = t(topic.titleKey);
  const description = t(topic.descKey);
  const chartTitle = t(topic.chartTitleKey);
  const source = t(topic.sourceKey);

  const exportChartPNG = () => {
    if (!chartRef.current) return;
    const svg = chartRef.current.querySelector("svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const svgRect = svg.getBoundingClientRect();
    canvas.width = svgRect.width * 2;
    canvas.height = svgRect.height * 2;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(2, 2);
    const img = new window.Image();
    img.onload = () => {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      const a = document.createElement("a");
      a.download = `${title.toLowerCase()}-graphique-ihsi.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  const exportCSV = () => {
    const headers = topic.tableHeaderKeys.map(k => t(k)).join(",");
    const rows = topic.tableRows.map((r) => r.map((c, i) => {
      const val = i === 0 ? t(String(c)) : String(c);
      return `"${val}"`;
    }).join(",")).join("\n");
    const csv = `${headers}\n${rows}\n${t("common.source")}: ${source}`;
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase()}-ihsi.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    const tableHtml = `<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:13px;">
      <thead><tr style="background:#f0f0f0;">${topic.tableHeaderKeys.map((k) => `<th style="text-align:left;">${t(k)}</th>`).join("")}</tr></thead>
      <tbody>${topic.tableRows.map((r) => `<tr>${r.map((c, i) => `<td>${i === 0 ? t(String(c)) : c}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>`;
    printWindow.document.write(`<!DOCTYPE html><html><head><title>${title} — IHSI</title>
      <style>body{font-family:Arial,sans-serif;padding:40px;color:#222;}h1{font-size:22px;}p{color:#666;font-size:12px;}</style></head>
      <body><h1>${title}</h1><p>${description}</p><br/>${tableHtml}<br/><p>${t("common.source")} : ${source}</p></body></html>`);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-6">
        <div className="container">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground">{t("stats.breadcrumbHome")}</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/statistiques" className="text-primary-foreground/70 hover:text-primary-foreground">{t("stats.breadcrumbStats")}</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary-foreground">{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center gap-3 mt-3">
            <div className="rounded-lg bg-primary-foreground/15 p-2.5">{topic.icon}</div>
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-sm text-primary-foreground/70 mt-0.5">{description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topic.kpis.map((kpi) => (
            <StatCard key={kpi.labelKey} label={t(kpi.labelKey)} value={kpi.value} trend={kpi.trend} trendValue={kpi.trendValue} sparklineData={kpi.sparklineData} />
          ))}
        </div>

        <div>
          <div className="flex items-center justify-end mb-2">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={exportChartPNG}>
              <Image className="h-3.5 w-3.5" /> PNG
            </Button>
          </div>
          <div ref={chartRef}>
            <ChartContainer title={chartTitle} source={source}>
              <ResponsiveContainer width="100%" height="100%">
                {topic.chartType === "area" ? (
                  <AreaChart data={topic.chartData}>
                    <defs>
                      <linearGradient id="topicGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey={topic.chartXKey} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Area type="monotone" dataKey={topic.chartDataKey} stroke="hsl(var(--secondary))" fill="url(#topicGrad)" strokeWidth={2} />
                  </AreaChart>
                ) : (
                  <BarChart data={topic.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey={topic.chartXKey} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Bar dataKey={topic.chartDataKey} fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">{t("common.detailedIndicators")}</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={exportCSV}>
                <Download className="h-3.5 w-3.5" /> CSV
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={exportPDF}>
                <FileText className="h-3.5 w-3.5" /> PDF
              </Button>
            </div>
          </div>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  {topic.tableHeaderKeys.map((k) => (
                    <TableHead key={k} className="font-semibold text-xs uppercase tracking-wider">{t(k)}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {topic.tableRows.map((row, i) => (
                  <TableRow key={i}>
                    {row.map((cell, j) => (
                      <TableCell key={j} className={j === 0 ? "font-medium" : ""}>
                        {j === 0 ? t(String(cell)) : cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-[11px] text-muted-foreground mt-3">{t("common.source")} : {source}</p>
        </div>
      </section>
    </Layout>
  );
}

export default function Statistiques() {
  const { slug } = useParams<{ slug?: string }>();
  const { t } = useLanguage();

  if (slug && topics[slug]) {
    return <TopicPage topic={topics[slug]} />;
  }

  const statsNav = navigationItems.find((n) => n.title === "Statistiques");
  const children = statsNav?.children || [];

  return (
    <Layout>
      <section className="container py-12">
        <h1 className="text-3xl font-bold text-foreground mb-2">{t("stats.title")}</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          {t("stats.subtitle")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {children.map((item) => {
            const Icon = item.icon;
            const itemTitle = item.titleKey ? t(item.titleKey) : item.title;
            const itemDesc = item.descKey ? t(item.descKey) : item.description;
            return (
              <Link
                key={item.href}
                to={item.href}
                className="group rounded-lg border bg-card p-6 hover:shadow-md hover:border-secondary/30 transition-all"
              >
                <div className="rounded-lg bg-secondary/10 p-3 w-fit mb-4 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{itemTitle}</h3>
                {itemDesc && (
                  <p className="text-sm text-muted-foreground">{itemDesc}</p>
                )}
              </Link>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
