import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/context";

export function ChatbotFAB() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        size="icon"
        className={cn(
          "fixed z-50 h-14 w-14 rounded-full shadow-lg",
          "bg-secondary hover:bg-secondary/90 text-secondary-foreground",
          "bottom-20 right-4 lg:bottom-6 lg:right-6",
          "transition-all duration-300 hover:scale-105 hover:shadow-xl",
          "group"
        )}
        title={t("chatbot.askQuestion")}
      >
        <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
        <span className="animate-ping absolute h-full w-full rounded-full bg-secondary opacity-20 pointer-events-none" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:w-96 p-0 flex flex-col">
          <SheetHeader className="p-4 border-b bg-secondary text-secondary-foreground">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-secondary-foreground flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                {t("chatbot.title")}
              </SheetTitle>
            </div>
          </SheetHeader>

          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="rounded-full bg-secondary/10 p-4 mb-4">
              <MessageCircle className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">
              {t("chatbot.askQuestion")}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[250px]">
              {t("chatbot.helpText")}
            </p>
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={t("chatbot.placeholder")}
                className="flex-1 h-10 px-3 rounded-lg border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <Button size="icon" className="h-10 w-10 bg-secondary hover:bg-secondary/90">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
