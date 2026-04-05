import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PublicationCard } from "@/components/shared/PublicationCard";
import { FilterBar } from "@/components/shared/FilterBar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, ArrowLeft, Download, FileText, Eye } from "lucide-react";
import { useLanguage } from "@/i18n/context";

const categorySlugMap: Record<string, string> = {
  bulletins: "Bulletin",
  rapports: "Rapport",
  communiques: "Communiqué",
  methodologies: "Méthodologie",
  recensements: "Recensement",
};

const years = ["Toutes", "2025", "2024", "2023", "2022", "2021"];
const frequencyValues = ["Toutes", "Mensuel", "Trimestriel", "Annuel"];

const publications = [
  { title: "Bulletin trimestriel des statistiques — T4 2024", type: "Bulletin", date: "Mars 2025", excerpt: "Analyse des principaux indicateurs économiques et sociaux du quatrième trimestre 2024.", downloadUrl: "#", slug: "bulletin-t4-2024", fullSummary: "Ce bulletin présente une analyse détaillée des principaux indicateurs macroéconomiques et sociaux pour le quatrième trimestre 2024. Il couvre l'évolution du PIB, les tendances de l'emploi, l'inflation mesurée par l'IPC, ainsi que les indicateurs de commerce extérieur. Les données montrent une légère reprise économique avec une croissance du PIB de 1.8% en glissement annuel.", relatedDashboard: "/tableaux-de-bord/ipc", year: "2025", frequency: "Trimestriel" },
  { title: "Rapport annuel sur l'emploi en Haïti 2024", type: "Rapport", date: "Février 2025", excerpt: "État complet du marché du travail avec analyse par secteur et département.", downloadUrl: "#", slug: "rapport-emploi-2024", fullSummary: "Ce rapport offre une vue exhaustive du marché du travail haïtien en 2024. Il analyse le taux de chômage par département, la répartition sectorielle de l'emploi, le sous-emploi et l'emploi informel. Des recommandations de politique publique sont formulées pour améliorer les conditions de travail.", relatedDashboard: "/tableaux-de-bord/travail", year: "2025", frequency: "Annuel" },
  { title: "Communiqué IPC — Février 2025", type: "Communiqué", date: "Mars 2025", excerpt: "L'IPC a enregistré une hausse de 1.2% en février, portant l'inflation annuelle à 24.8%.", downloadUrl: "#", slug: "communique-ipc-fev-2025", fullSummary: "L'Indice des prix à la consommation a augmenté de 1.2% au mois de février 2025 par rapport au mois précédent. En glissement annuel, l'inflation atteint 24.8%, en baisse de 2.1 points par rapport à l'année précédente. Les hausses les plus marquées concernent les produits alimentaires (+28.3%) et le transport (+18.7%).", relatedDashboard: "/tableaux-de-bord/ipc", year: "2025", frequency: "Mensuel" },
  { title: "Note méthodologique : Calcul de l'IPC base 2020", type: "Méthodologie", date: "Janvier 2025", excerpt: "Présentation de la méthodologie de calcul de l'indice des prix à la consommation.", downloadUrl: "#", slug: "methodologie-ipc-2020", fullSummary: "Cette note détaille la méthodologie utilisée pour le calcul de l'IPC avec la base 2020. Elle couvre la sélection du panier de biens, la pondération par catégorie de dépenses, les méthodes de collecte des prix, et le traitement des données manquantes.", relatedDashboard: "/tableaux-de-bord/ipc", year: "2025", frequency: "Annuel" },
  { title: "Résultats préliminaires — Recensement 2023", type: "Recensement", date: "Décembre 2024", excerpt: "Premiers résultats du recensement général de la population et de l'habitat.", downloadUrl: "#", slug: "recensement-2023", fullSummary: "Les résultats préliminaires du recensement général de la population et de l'habitat de 2023 indiquent une population totale estimée à 12 millions d'habitants. La densité de population est de 432 habitants par km², avec une forte concentration dans le département de l'Ouest.", relatedDashboard: "/tableaux-de-bord/demographie", year: "2024", frequency: "Annuel" },
  { title: "Bulletin trimestriel des statistiques — T3 2024", type: "Bulletin", date: "Octobre 2024", excerpt: "Indicateurs clés du troisième trimestre : PIB, emploi, commerce extérieur.", downloadUrl: "#", slug: "bulletin-t3-2024", fullSummary: "Le bulletin du troisième trimestre 2024 présente les indicateurs macroéconomiques clés avec un focus sur la croissance du PIB, les conditions du marché du travail, et la balance commerciale.", relatedDashboard: "/tableaux-de-bord/pib", year: "2024", frequency: "Trimestriel" },
  { title: "Rapport sur la pauvreté multidimensionnelle", type: "Rapport", date: "Septembre 2024", excerpt: "Analyse des dimensions de la pauvreté au-delà du revenu monétaire.", downloadUrl: "#", slug: "rapport-pauvrete-2024", fullSummary: "Ce rapport analyse la pauvreté en Haïti selon une approche multidimensionnelle, prenant en compte l'accès à l'éducation, la santé, les conditions de logement, et l'emploi en plus du revenu monétaire. 58.5% de la population est considérée comme pauvre selon cet indice.", relatedDashboard: "/tableaux-de-bord/social", year: "2024", frequency: "Annuel" },
  { title: "Communiqué PIB — T2 2024", type: "Communiqué", date: "Août 2024", excerpt: "Le PIB réel a progressé de 1.5% au deuxième trimestre par rapport à l'année précédente.", downloadUrl: "#", slug: "communique-pib-t2-2024", fullSummary: "Le PIB réel d'Haïti a enregistré une croissance de 1.5% au deuxième trimestre 2024 en glissement annuel. Les secteurs ayant le plus contribué à cette croissance sont les services (+2.1%) et l'agriculture (+1.8%).", relatedDashboard: "/tableaux-de-bord/pib", year: "2024", frequency: "Trimestriel" },
  { title: "Guide utilisateur API IHSI v2", type: "Méthodologie", date: "Juillet 2024", excerpt: "Documentation technique pour l'utilisation de l'API REST de données ouvertes.", downloadUrl: "#", slug: "guide-api-v2", fullSummary: "Ce guide fournit la documentation complète de l'API REST IHSI v2, incluant les endpoints disponibles, les paramètres de requête, les formats de réponse, et des exemples de code en Python, R et JavaScript.", relatedDashboard: null, year: "2024", frequency: "Annuel" },
];

const ITEMS_PER_PAGE = 6;

export default function Publications() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const categoryType = slug ? categorySlugMap[slug] : undefined;
  const [activeFilter, setActiveFilter] = useState(categoryType || "Tous");
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState("Toutes");
  const [selectedFrequency, setSelectedFrequency] = useState("Toutes");
  const [page, setPage] = useState(1);
  const [previewPub, setPreviewPub] = useState<typeof publications[0] | null>(null);

  const types = [
    t("publications.all"),
    t("publications.bulletin"),
    t("publications.report"),
    t("publications.pressRelease"),
    t("publications.methodology"),
    t("publications.census"),
  ];

  const typeMap: Record<string, string> = {
    [t("publications.bulletin")]: "Bulletin",
    [t("publications.report")]: "Rapport",
    [t("publications.pressRelease")]: "Communiqué",
    [t("publications.methodology")]: "Méthodologie",
    [t("publications.census")]: "Recensement",
  };

  // Detail view
  if (slug && !categoryType) {
    const pub = publications.find((p) => p.slug === slug);
    if (!pub) {
      return (
        <Layout>
          <div className="container py-16 text-center">
            <p className="text-muted-foreground">{t("publications.notFound")}</p>
            <Button variant="outline" className="mt-4" onClick={() => navigate("/publications")}>
              {t("publications.backToPublications")}
            </Button>
          </div>
        </Layout>
      );
    }

    return (
      <Layout>
        <div className="container py-8 max-w-3xl">
          <Button variant="ghost" size="sm" className="gap-1.5 mb-6 -ml-2" onClick={() => navigate("/publications")}>
            <ArrowLeft className="h-4 w-4" /> {t("publications.backToPublications")}
          </Button>

          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center rounded-md bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary">
              {pub.type}
            </span>
            <span className="text-xs text-muted-foreground">{pub.date}</span>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-4">{pub.title}</h1>

          <div className="prose prose-sm max-w-none text-muted-foreground mb-8">
            <p>{pub.fullSummary}</p>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <Button className="gap-2" asChild>
              <a href={pub.downloadUrl}>
                <Download className="h-4 w-4" /> {t("publications.downloadPdf")}
              </a>
            </Button>
            {pub.relatedDashboard && (
              <Button variant="outline" className="gap-2" asChild>
                <Link to={pub.relatedDashboard}>
                  <FileText className="h-4 w-4" /> {t("publications.viewDashboard")}
                </Link>
              </Button>
            )}
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-xs text-muted-foreground">
              <strong>{t("publications.sourceLabel")}</strong> {t("publications.sourceValue")}
              &nbsp;·&nbsp; <strong>{t("publications.dateLabel")}</strong> {pub.date}
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  // List view
  const filtered = publications.filter((p) => {
    const matchType = activeFilter === types[0] || p.type === (typeMap[activeFilter] || activeFilter);
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    const matchYear = selectedYear === "Toutes" || p.year === selectedYear;
    const matchFreq = selectedFrequency === "Toutes" || p.frequency === selectedFrequency;
    return matchType && matchSearch && matchYear && matchFreq;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <Layout>
      <section className="container py-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">{t("publications.title")}</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          {t("publications.subtitle")}
        </p>

        <div className="flex flex-wrap items-end gap-4 mb-6">
          <div className="flex-1 min-w-0">
            <FilterBar
              filters={types}
              activeFilter={activeFilter}
              onFilterChange={(f) => { setActiveFilter(f); setPage(1); }}
              searchValue={search}
              onSearchChange={(v) => { setSearch(v); setPage(1); }}
              searchPlaceholder={t("publications.searchPlaceholder")}
            />
          </div>
          <Select value={selectedFrequency} onValueChange={(v) => { setSelectedFrequency(v); setPage(1); }}>
            <SelectTrigger className="w-32 h-9">
              <SelectValue placeholder={t("publications.periodicity")} />
            </SelectTrigger>
            <SelectContent>
              {frequencyValues.map((f) => (
                <SelectItem key={f} value={f}>{f === "Toutes" ? t("common.allPeriods") : f}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedYear} onValueChange={(v) => { setSelectedYear(v); setPage(1); }}>
            <SelectTrigger className="w-28 h-9">
              <SelectValue placeholder={t("common.year")} />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y}>{y === "Toutes" ? t("common.allYears") : y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {paginated.map((pub) => (
            <div key={pub.slug} className="relative group">
              <div className="cursor-pointer" onClick={() => navigate(`/publications/${pub.slug}`)}>
                <PublicationCard {...pub} />
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs bg-card shadow-sm"
                  onClick={(e) => { e.stopPropagation(); setPreviewPub(pub); }}
                >
                  <Eye className="h-3.5 w-3.5" /> {t("common.preview")}
                </Button>
              </div>
            </div>
          ))}
          {paginated.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              {t("publications.noResults")}
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button key={i + 1} variant={page === i + 1 ? "default" : "outline"} size="sm" className="h-8 w-8 p-0" onClick={() => setPage(i + 1)}>
                {i + 1}
              </Button>
            ))}
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </section>

      {/* Preview Modal */}
      <Dialog open={!!previewPub} onOpenChange={(open) => !open && setPreviewPub(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg leading-snug">{previewPub?.title}</DialogTitle>
          </DialogHeader>
          {previewPub && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary">
                  {previewPub.type}
                </span>
                <span className="text-xs text-muted-foreground">{previewPub.date}</span>
                <span className="text-xs text-muted-foreground">· {previewPub.frequency}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{previewPub.fullSummary}</p>
              <div className="flex gap-2 pt-2">
                <Button className="gap-2" size="sm" asChild>
                  <a href={previewPub.downloadUrl}>
                    <Download className="h-4 w-4" /> {t("common.download")}
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => { setPreviewPub(null); navigate(`/publications/${previewPub.slug}`); }}>
                  <FileText className="h-4 w-4" /> {t("common.readMore")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
