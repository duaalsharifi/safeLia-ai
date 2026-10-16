import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ThemeProvider from "./context/ThemeProvider";

import Home from "./pages/Home";
import Companies from "./pages/Companies";
import CompanyDetail from "./pages/CompanyDetail";
import CompanyAnalysis from "./pages/CompanyAnalysis";
import CVPage from "./pages/CVPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-3xl font-bold">
        Sidan finns inte
      </h1>

      <p className="mt-3 text-muted">
        Sidan du söker kunde inte hittas.
      </p>

      <Link
        to="/"
        className="mt-6 inline-flex rounded-full bg-brand px-5 py-3 font-semibold text-on-brand hover:bg-brand-strong"
      >
        Till startsidan
      </Link>
    </section>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col bg-page text-ink">

          {/* Accessibility */}
          <a
            href="#main-content"
            className="sr-only z-50 rounded-lg bg-surface px-4 py-2 font-semibold text-ink focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
          >
            Hoppa till innehållet
          </a>

          {/* Navigation */}
          <Navbar />

          {/* Main Content */}
          <main
            id="main-content"
            tabIndex={-1}
            className="flex-1 scroll-mt-4 focus:outline-none"
          >
            <Routes>

              {/* Startsida */}
              <Route
                path="/"
                element={<Home />}
              />

              {/* Företagskatalog */}
              <Route
                path="/companies"
                element={<Companies />}
              />

              {/* Företagsdetaljer */}
              <Route
                path="/companies/:companyId"
                element={<CompanyDetail />}
              />

              {/* AI-analys */}
              <Route
                path="/analysis"
                element={<CompanyAnalysis />}
              />

              {/* CV */}
              <Route
                path="/cv"
                element={<CVPage />}
              />

              {/* Dashboard */}
              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              {/* Auth */}
              <Route
                path="/login"
                element={<Login />}
              />

              <Route
                path="/register"
                element={<Register />}
              />

              {/* 404 */}
              <Route
                path="*"
                element={<NotFound />}
              />

            </Routes>
          </main>

          {/* Footer */}
          <Footer />

        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;