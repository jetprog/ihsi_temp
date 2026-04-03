import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { DatasetCard } from "@/components/shared/DatasetCard";
import { FilterBar } from "@/components/shared/FilterBar";

const categories = ["Tous", "Démographie", "Économie", "Travail", "Social", "Géographie"];

const datasets = [
  { title: "Population par département, 2015-2024", description: "Estimations annuelles de la population par département et commune.", formats: ["CSV", "JSON", "API"], date: "Mars 2025", category: "Démographie" },
  { title: "Indice des prix à la consommation mensuel", description: "IPC mensuel par catégorie de produits depuis 2010.", formats: ["CSV", "JSON"], date: "Mars 2025", category: "Économie" },
  { title: "Enquête emploi 2024 — Résultats", description: "Microdata de l'enquête nationale sur l'emploi et le marché du travail.", formats: ["CSV", "XLSX"], date: "Février 2025", category: "Travail" },
  { title: "PIB trimestriel par secteur d'activité", description: "Ventilation du PIB par secteur économique, séries trimestrielles.", formats: ["CSV", "JSON", "API"], date: "Janvier 2025", category: "Économie" },
  { title: "Indicateurs de santé par département", description: "Taux de mortalité, accès aux soins, couverture vaccinale.", formats: ["CSV"], date: "Décembre 2024", category: "Social" },
  { title: "Données géospatiales des communes", description: "Fichiers shapefile et GeoJSON des limites administratives.", formats: ["GeoJSON", "SHP"], date: "Novembre 2024", category: "Géographie" },
  { title: "Taux de scolarisation par niveau", description: "Indicateurs d'éducation : taux brut et net de scolarisation.", formats: ["CSV", "JSON"], date: "Octobre 2024", category: "Social" },
  { title: "Commerce extérieur — Importations/Exportations", description: "Statistiques du commerce extérieur par produit et partenaire.", formats: ["CSV", "XLSX", "API"], date: "Mars 2025", category: "Économie" },
];

export default function DonneesOuvertes() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [search, setSearch] = useState("");

  const filtered = datasets.filter((d) => {
    const matchCat = activeFilter === "Tous" || d.category === activeFilter;
    const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase()) || d.description?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <Layout>
      <section className="container py-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Données ouvertes</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Explorez et téléchargez les jeux de données ouverts de l'IHSI. Disponibles en formats CSV, JSON et via API REST.
        </p>

        <FilterBar
          filters={categories}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Rechercher un jeu de données..."
          className="mb-6"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((ds) => (
            <DatasetCard key={ds.title} {...ds} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              Aucun jeu de données trouvé.
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
