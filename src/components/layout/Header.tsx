import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, Globe, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navigationItems } from "@/lib/navigation";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";

const languages = ["FR", "EN", "HT"];

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [lang, setLang] = useState("FR");
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Utility bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container flex h-8 items-center justify-between text-xs">
          <span className="font-medium tracking-wide">Institut Haïtien de Statistique et d'Informatique</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={cn(
                    "px-1.5 py-0.5 rounded text-xs transition-colors",
                    lang === l ? "bg-primary-foreground/20 font-semibold" : "hover:bg-primary-foreground/10"
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-card border-b shadow-sm">
        <div className="container flex h-14 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">IH</span>
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:block">IHSI</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => (
              <MegaMenu key={item.title} item={item} currentPath={location.pathname} />
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {searchOpen ? (
              <div className="flex items-center gap-2 animate-fade-in">
                <Input
                  placeholder="Rechercher..."
                  className="w-48 lg:w-64 h-9"
                  autoFocus
                />
                <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)} className="h-9 w-9">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} className="h-9 w-9">
                <Search className="h-4 w-4" />
              </Button>
            )}

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <MobileNav currentPath={location.pathname} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
