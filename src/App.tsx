import { useEffect } from "react";
import { PageMotion } from "./components/PageMotion";
import { LabPages } from "./components/LabPages";
import { LabHome } from "./components/LabHome";
import { HorizonProduct } from "./components/HorizonProduct";
import { SiteHeader, SiteFooter } from "./components/ReferenceChrome";
import { DesignedContentPage, AboutLabPage } from "./components/PageFamilies";
import { sitePages, pageIndexes } from "./data/sitePages";
import { TrustPages, CookieConsent, trustPageRoutes } from "./components/TrustPages";
import { FormPages, AdminPage } from "./components/FormPages";
import {PromptHandoff} from './components/PromptHandoff';
import "./App.css";
import "./motion.css";
import "./editorial.css";
import "./reference-match.css";
import "./dark.css";
import "./reference-rebuild.css";
import "./lab-reference-rebuild.css";
import "./rebuild-support.css";
export function App() {
  const rawPage = window.location.pathname.replace(/^\/+|\/+$/g, "");
  const aliases:Record<string,string> = {'product/overview':'horizon','products/horizon':'horizon','company/about':'about','company/contact':'contact','research/training':'research/model-training','legal/privacy':'privacy','legal/cookies':'cookies','legal/terms':'terms','downloads':'download','use-cases/call-preparation':'use-cases/call-prep','use-cases/earnings-comparison':'use-cases/earnings-comps','use-cases/role-review':'use-cases/jd-check','use-cases/research-brief':'use-cases/legal-research','use-cases/quarterly-deck':'use-cases/qbr-deck','use-cases/month-end-review':'use-cases/month-end-close','use-cases/survey-summary':'use-cases/survey-readout','use-cases/meeting-preparation':'use-cases/deposition-prep','use-cases/crm-review':'use-cases/crm-hygiene','use-cases/budget-planning':'use-cases/h2-reforecast','use-cases/compensation-review':'use-cases/merit-analysis','use-cases/document-review':'use-cases/contract-redline'};
  const page = aliases[rawPage] ?? rawPage;
  const product = page === "horizon" || page === 'product' || page.startsWith('product/') || page.startsWith('download') || page === 'use-cases' || page.startsWith('use-cases/');
  useEffect(() => {
    if (page === "") {
      document.title = "Horizons Lab — Intelligence is a beginning";
      if (["#horizon", "#download"].includes(window.location.hash))
        window.location.replace(
          "/horizon" +
            (window.location.hash === "#download" ? "#download" : ""),
        );
    }
  }, [page]);
  return (
    <div className={`editorial-shell ${product ? "horizon-page" : "lab-page"}`}>
      <PageMotion />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader product={product} />
      <main id="main" tabIndex={-1}>
        {page === "" ? (
          <LabHome />
        ) : page === 'horizon' ? (
          <HorizonProduct />
        ) : page === 'waitlist' || page === 'contact' ? (
          <FormPages kind={page === 'contact' ? 'contact' : 'waitlist'}/>
        ) : page === 'admin' ? (
          <AdminPage/>
        ) : trustPageRoutes.includes(page) ? (
          <>{page.startsWith('download')&&<PromptHandoff/>}<TrustPages page={page}/></>
        ) : page === 'about' ? (
          <AboutLabPage/>
        ) : sitePages[page] || pageIndexes[page] || page === 'sitemap' ? (
          <DesignedContentPage page={page}/>
        ) : (
          <LabPages page={page} />
        )}
      </main>
      <SiteFooter product={product} />
      <CookieConsent />
    </div>
  );
}
export default App;
