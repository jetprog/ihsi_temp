import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PublicationCard } from "@/components/shared/PublicationCard";
import { FilterBar } from "@/components/shared/FilterBar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const types = ["Tous", "Bulletin", "Rapport", "Communiqué", "Méthodologie", "Recensement"];

const publications = [
  { title: "Bulletin trimestriel des statistiques — T4 2024", type: "Bulletin", date: "Mars 2025", excerpt: "Analyse des principaux indicateurs économiques et sociaux du quatrième trimestre 2024.", downloadUrl: "#" },
  { title: "Rapport annuel sur l'emploi en Haïti 2024", type: "Rapport", date: "Février 2025", excerpt: "État complet du marché du travail avec analyse par secteur et département.", downloadUrl: "#" },
  { title: "Communiqué IPC — Février 2025", type: "Communiqué", date: "Mars 2025", excerpt: "L'IPC a enregistré une hausse de 1.2% en février, portant l'inflation annuelle à 24.8%.", downloadUrl: "#" },
  { title: "Note méthodologique : Calcul de l'IPC base 2020", type: "Méthodologie", date: "Janvier 2025", excerpt: "Présentation de la méthodologie de calcul de l'indice des prix à la consommation.", downloadUrl: "#" },
  { title: "Résultats préliminaires — Recensement 2023", type: "Recensement", date: "Décembre 2024", excerpt: "Premiers résultats du recensement général de la population et de l'habitat.", downloadUrl: "#" },
  { title: "Bulletin trimestriel des statistiques — T3 2024", type: "Bulletin", date: "Octobre 2024", excerpt: "Indicateurs clés du troisième trimestre : PIB, emploi, commerce extérieur.", downloadUrl: "#" },
  { title: "Rapport sur la pauvreté multidimensionnelle", type: "Rapport", date: "Septembre 2024", excerpt: "Analyse des dimensions de la pauvreté au-delà du revenu monétaire.", downloadUrl: "#" },
  { title: "Communiqué PIB — T2 2024", type: "Communiqué", date: "Août 2024", excerpt: "Le PIB réel a progressé de 1.5% au deuxième trimestre par rapport à l'année précédente.", downloadUrl: "#" },
  { title: "Guide utilisateur API IHSI v2", type: "Méthodologie", date: "Juillet 2024", excerpt: "Documentation technique pour l'utilisation de l'API REST de données ouvertes.", downloadUrl: "#" },
];

const ITEMS_PER_PAGE = 6;

export default function Publications() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = publications.filter((p) => {
    const matchType = activeFilter === "Tous" || p.type === activeFilter;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <Layout>
      <section className="container py-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Publications</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Bulletins, rapports, communiqués et notes méthodologiques publiés par l'IHSI.
        </p>

        <FilterBar
          filters={types}
          activeFilter={activeFilter}
          onFilterChange={(f) => { setActiveFilter(f); setPage(1); }}
          searchValue={search}
          onSearchChange={(v) => { setSearch(v); setPage(1); }}
          searchPlaceholder="Rechercher une publication..."
          className="mb-6"
        />

        <div className="space-y-4">
          {paginated.map((pub) => (
            <PublicationCard key={pub.title} {...pub} />
          ))}
          {paginated.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Aucune publication trouvée.
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={page === i + 1 ? "default" : "outline"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </section>
    </Layout>
  );
}
