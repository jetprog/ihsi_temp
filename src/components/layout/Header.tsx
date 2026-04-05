import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, Globe } from "lucide-react";
import ihsiLogo from "@/assets/ihsi-75th-logo.jpeg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navigationItems } from "@/lib/navigation";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";

const languages = [
  { code: "FR", label: "Français" },
  { code: "HT", label: "Kreyòl" },
  { code: "EN", label: "English" },
];

export function Header() {
  const [lang, setLang] = useState("FR");
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md"
      >
        Aller au contenu principal
      </a>

      {/* Utility bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container flex h-9 items-center justify-between text-xs">
          <span className="font-medium tracking-wide hidden sm:block">
            Institut Haïtien de Statistique et d'Informatique
          </span>
          <span className="font-medium tracking-wide sm:hidden">IHSI</span>
          <div className="flex items-center gap-1">
            <Globe className="h-3.5 w-3.5 mr-1 opacity-70" />
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                title={l.label}
                className={cn(
                  "px-2 py-1 rounded text-xs font-medium transition-all duration-200 min-w-[32px]",
                  lang === l.code
                    ? "bg-primary-foreground/25 font-bold"
                    : "hover:bg-primary-foreground/10 opacity-70 hover:opacity-100"
                )}
              >
                {l.code}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-card border-b shadow-sm">
        <div className="container flex h-14 items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 mr-2">
            <img src={ihsiLogo} alt="IHSI - Institut Haïtien de Statistique et d'Informatique" className="h-14 w-14 rounded-full object-cover" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg text-foreground">IHSI</span>
              <span className="text-[10px] text-muted-foreground font-medium">Statistique & Informatique</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {navigationItems.map((item) => (
              <MegaMenu key={item.title} item={item} currentPath={location.pathname} />
            ))}
          </nav>

          {/* Always-visible search */}
          <div className="flex-1 max-w-xs hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                className="pl-9 h-9 text-sm bg-muted/50 border-transparent focus:border-border focus:bg-card transition-colors"
              />
            </div>
          </div>

          {/* Mobile search + menu */}
          <div className="flex items-center gap-1 ml-auto lg:ml-0">
            <Button variant="ghost" size="icon" className="md:hidden h-9 w-9">
              <Search className="h-4 w-4" />
            </Button>

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
