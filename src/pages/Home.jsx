import { Link } from "react-router-dom";
import {
  Search,
  Building2,
  GraduationCap,
  FileSearch,
  Brain,
  ShieldCheck,
  ClipboardList,
  Rocket,
} from "lucide-react";

function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">

      {/* HERO */}
      <section className="py-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          <div>
            <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              För studenter • Med hjälp av AI
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight text-slate-900 lg:text-6xl">
              Hitta tryggare LIA-platser med hjälp av AI
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-600">
              SafeLIA AI hjälper studenter att hitta företag,
              jämföra praktikmöjligheter och fatta bättre beslut
              inför sin LIA.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/companies"
                className="rounded-xl bg-green-700 px-6 py-4 font-semibold text-white transition hover:bg-green-800"
              >
                Utforska företag →
              </Link>

              <Link
                to="/analysis"
                className="rounded-xl border border-green-700 px-6 py-4 font-semibold text-green-700 transition hover:bg-green-50"
              >
                Kontrollera företag →
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-green-700" />
                <span>Verifierad information</span>
              </div>

              <div className="flex items-center gap-2">
                <FileSearch size={18} className="text-green-700" />
                <span>Samlade källor</span>
              </div>

              <div className="flex items-center gap-2">
                <GraduationCap size={18} className="text-green-700" />
                <span>Byggt för studenter</span>
              </div>
            </div>
          </div>

          <div>
            <img
              src="/images/hero-student.jpg"
              alt="SafeLIA AI"
              className="w-full rounded-3xl object-cover shadow-xl"
            />
          </div>

        </div>
      </section>

      {/* FUNKTIONER */}
      <section className="py-10">
        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border p-8">
            <Search size={42} className="mb-4 text-green-700" />

            <h3 className="mb-3 text-xl font-bold">
              Hitta företag
            </h3>

            <p className="text-slate-600">
              Sök efter företag inom IT och andra branscher som kan passa din utbildning.
            </p>
          </div>

          <div className="rounded-3xl border p-8">
            <Building2 size={42} className="mb-4 text-green-700" />

            <h3 className="mb-3 text-xl font-bold">
              Jämför alternativ
            </h3>

            <p className="text-slate-600">
              Se kontaktvägar, praktikmöjligheter och information från flera källor.
            </p>
          </div>

          <div className="rounded-3xl border p-8">
            <Brain size={42} className="mb-4 text-green-700" />

            <h3 className="mb-3 text-xl font-bold">
              AI-stöd för ansökan
            </h3>

            <p className="text-slate-600">
              Hitta rätt företag och förbered din ansökan med hjälp av AI.
            </p>
          </div>

        </div>
      </section>

      {/* HUR FUNGERAR DET */}
      <section className="py-16">

        <h2 className="mb-12 text-center text-3xl font-bold">
          Så fungerar SafeLIA AI
        </h2>

        <div className="grid gap-8 md:grid-cols-4">

          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <Search size={52} className="text-green-700" />
            </div>

            <h3 className="font-bold">
              1. Sök företag
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Hitta företag inom din bransch.
            </p>
          </div>

          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <ClipboardList size={52} className="text-green-700" />
            </div>

            <h3 className="font-bold">
              2. Jämför
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Jämför kontaktvägar och information.
            </p>
          </div>

          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <Brain size={52} className="text-green-700" />
            </div>

            <h3 className="font-bold">
              3. AI-analys
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Få stöd innan du skickar ansökan.
            </p>
          </div>

          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <Rocket size={52} className="text-green-700" />
            </div>

            <h3 className="font-bold">
              4. Ansök
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Ta nästa steg mot din LIA.
            </p>
          </div>

        </div>

      </section>

      {/* POPULÄRA FÖRETAG */}
      <section className="py-10">

        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            Populära företag
          </h2>

          <Link
            to="/companies"
            className="font-semibold text-green-700"
          >
            Visa alla →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-4">

          <div className="rounded-2xl border p-6">
            <Building2 size={22} className="mb-3 text-green-700" />
            <h3 className="font-bold">IKEA</h3>
            <p className="text-sm text-slate-500">Älmhult</p>
          </div>

          <div className="rounded-2xl border p-6">
            <Building2 size={22} className="mb-3 text-green-700" />
            <h3 className="font-bold">Ericsson</h3>
            <p className="text-sm text-slate-500">Stockholm</p>
          </div>

          <div className="rounded-2xl border p-6">
            <Building2 size={22} className="mb-3 text-green-700" />
            <h3 className="font-bold">Atea</h3>
            <p className="text-sm text-slate-500">Sverige</p>
          </div>

          <div className="rounded-2xl border p-6">
            <Building2 size={22} className="mb-3 text-green-700" />
            <h3 className="font-bold">Volvo Cars</h3>
            <p className="text-sm text-slate-500">Sverige</p>
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="mt-20 rounded-3xl bg-green-700 p-12 text-center text-white">

        <h2 className="text-4xl font-bold">
          Redo att hitta din nästa LIA-plats?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-green-100">
          Utforska företag, analysera möjligheter och ta bättre beslut inför din praktikperiod.
        </p>

        <Link
          to="/companies"
          className="mt-8 inline-flex rounded-xl bg-white px-8 py-4 font-semibold text-green-700"
        >
          Utforska företag
        </Link>

      </section>

    </div>
  );
}

export default Home;