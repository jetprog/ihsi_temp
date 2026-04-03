import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  className?: string;
}

export function FilterBar({
  filters,
  activeFilter,
  onFilterChange,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Rechercher...",
  className,
}: FilterBarProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row gap-3 items-start sm:items-center", className)}>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Badge
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-colors px-3 py-1",
              activeFilter === filter
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </Badge>
        ))}
      </div>
      {onSearchChange && (
        <div className="relative w-full sm:w-64 sm:ml-auto">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-9"
          />
          {searchValue && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
              onClick={() => onSearchChange("")}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
