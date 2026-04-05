import { createRoot } from "react-dom/client";
import { LanguageProvider } from "./i18n/context";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
