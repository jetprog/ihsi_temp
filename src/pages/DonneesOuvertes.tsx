import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { DatasetCard } from "@/components/shared/DatasetCard";
import { FilterBar } from "@/components/shared/FilterBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, Key, ExternalLink } from "lucide-react";

const categories = ["Tous", "Démographie", "Économie", "Emploi", "Social", "Géographie"];
const formats = ["CSV", "JSON", "XLSX", "API", "GeoJSON"];
const frequencies = ["Toutes", "Mensuel", "Trimestriel", "Annuel"];

const datasets = [
  { title: "Population par département, 2015-2024", description: "Estimations annuelles de la population par département et commune.", formats: ["CSV", "JSON", "API"], date: "Mars 2025", category: "Démographie", frequency: "Annuel" },
  { title: "Indice des prix à la consommation mensuel", description: "IPC mensuel par catégorie de produits depuis 2010.", formats: ["CSV", "JSON"], date: "Mars 2025", category: "Économie", frequency: "Mensuel" },
  { title: "Enquête emploi 2024 — Résultats", description: "Microdata de l'enquête nationale sur l'emploi et le marché du travail.", formats: ["CSV", "XLSX"], date: "Février 2025", category: "Travail", frequency: "Annuel" },
  { title: "PIB trimestriel par secteur d'activité", description: "Ventilation du PIB par secteur économique, séries trimestrielles.", formats: ["CSV", "JSON", "API"], date: "Janvier 2025", category: "Économie", frequency: "Trimestriel" },
  { title: "Indicateurs de santé par département", description: "Taux de mortalité, accès aux soins, couverture vaccinale.", formats: ["CSV"], date: "Décembre 2024", category: "Social", frequency: "Annuel" },
  { title: "Données géospatiales des communes", description: "Fichiers shapefile et GeoJSON des limites administratives.", formats: ["GeoJSON"], date: "Novembre 2024", category: "Géographie", frequency: "Annuel" },
  { title: "Taux de scolarisation par niveau", description: "Indicateurs d'éducation : taux brut et net de scolarisation.", formats: ["CSV", "JSON"], date: "Octobre 2024", category: "Social", frequency: "Annuel" },
  { title: "Commerce extérieur — Importations/Exportations", description: "Statistiques du commerce extérieur par produit et partenaire.", formats: ["CSV", "XLSX", "API"], date: "Mars 2025", category: "Économie", frequency: "Trimestriel" },
];

export default function DonneesOuvertes() {
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedFrequency, setSelectedFrequency] = useState("Toutes");

  const toggleFormat = (f: string) => {
    setSelectedFormats((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const filtered = datasets.filter((d) => {
    const matchCat = activeFilter === "Tous" || d.category === activeFilter;
    const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase()) || d.description?.toLowerCase().includes(search.toLowerCase());
    const matchFormat = selectedFormats.length === 0 || d.formats.some((f) => selectedFormats.includes(f));
    const matchFreq = selectedFrequency === "Toutes" || d.frequency === selectedFrequency;
    return matchCat && matchSearch && matchFormat && matchFreq;
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
          className="mb-4"
        />

        {/* Format + Frequency filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-xs font-medium text-muted-foreground">Format :</span>
          {formats.map((f) => (
            <Badge
              key={f}
              variant={selectedFormats.includes(f) ? "default" : "outline"}
              className="cursor-pointer text-xs"
              onClick={() => toggleFormat(f)}
            >
              {f}
            </Badge>
          ))}
          <span className="text-xs font-medium text-muted-foreground ml-2">Fréquence :</span>
          {frequencies.map((f) => (
            <Badge
              key={f}
              variant={selectedFrequency === f ? "default" : "outline"}
              className="cursor-pointer text-xs"
              onClick={() => setSelectedFrequency(f)}
            >
              {f}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {filtered.map((ds) => (
            <DatasetCard key={ds.title} {...ds} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              Aucun jeu de données trouvé.
            </div>
          )}
        </div>

        {/* API Section */}
        <div className="border-t pt-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Code className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">API REST</h2>
              <p className="text-sm text-muted-foreground">Intégrez les données IHSI dans vos applications</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="rounded-lg border bg-card p-5">
              <h3 className="font-semibold text-sm mb-2">Documentation</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Consultez la documentation complète de l'API : endpoints, paramètres, pagination et formats de réponse.
              </p>
              <Button variant="outline" size="sm" className="gap-1.5">
                <ExternalLink className="h-3.5 w-3.5" /> Voir la documentation
              </Button>
            </div>
            <div className="rounded-lg border bg-card p-5">
              <h3 className="font-semibold text-sm mb-2">Clé API</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Obtenez votre clé API gratuite pour accéder aux données programmatiquement. Limite : 1000 requêtes/jour.
              </p>
              <Button variant="secondary" size="sm" className="gap-1.5">
                <Key className="h-3.5 w-3.5" /> Obtenir une clé API
              </Button>
            </div>
          </div>

          {/* Example Request */}
          <div className="rounded-lg border bg-card">
            <div className="px-4 py-3 border-b">
              <h3 className="font-semibold text-sm">Exemple de requête</h3>
            </div>
            <pre className="p-4 text-xs leading-relaxed overflow-x-auto text-foreground/80">
              <code>{`# Obtenir les données de population par département
curl -X GET "https://api.ihsi.ht/v2/data/population" \\
  -H "Authorization: Bearer VOTRE_CLE_API" \\
  -H "Accept: application/json" \\
  -d "year=2024&department=Ouest"

# Réponse
{
  "data": [
    {
      "department": "Ouest",
      "population": 4200000,
      "year": 2024,
      "source": "IHSI"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "per_page": 25
  }
}`}</code>
            </pre>
          </div>
        </div>
      </section>
    </Layout>
  );
}
