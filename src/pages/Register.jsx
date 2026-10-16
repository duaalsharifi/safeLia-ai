import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const handleChange = (event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  const handleRegister = (event) => {
    event.preventDefault();
    window.alert("Kontoskapande är inte anslutet till en server ännu.");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
      <section className="mx-auto max-w-md">
        <h1 className="font-display text-3xl font-semibold">Skapa konto</h1>
        <p className="mt-2 text-sm leading-6 text-muted">Kontoskapande är inte anslutet till en server i den här prototypen.</p>
        <form onSubmit={handleRegister} className="mt-7 space-y-4">
          <div>
            <label htmlFor="register-first-name" className="mb-2 block text-sm font-semibold">Förnamn</label>
            <input id="register-first-name" className="min-h-12 w-full rounded-xl border border-edge bg-surface px-4 text-ink" type="text" name="firstName" autoComplete="given-name" required value={formData.firstName} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="register-last-name" className="mb-2 block text-sm font-semibold">Efternamn</label>
            <input id="register-last-name" className="min-h-12 w-full rounded-xl border border-edge bg-surface px-4 text-ink" type="text" name="lastName" autoComplete="family-name" required value={formData.lastName} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="register-email" className="mb-2 block text-sm font-semibold">E-post</label>
            <input id="register-email" className="min-h-12 w-full rounded-xl border border-edge bg-surface px-4 text-ink" type="email" name="email" autoComplete="email" required value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="register-password" className="mb-2 block text-sm font-semibold">Lösenord</label>
            <input id="register-password" className="min-h-12 w-full rounded-xl border border-edge bg-surface px-4 text-ink" type="password" name="password" autoComplete="new-password" required value={formData.password} onChange={handleChange} />
          </div>
          <button type="submit" className="min-h-12 w-full rounded-full bg-brand px-5 py-3 text-sm font-semibold text-on-brand hover:bg-brand-strong">Skapa konto</button>
        </form>
        <p className="mt-5 text-sm text-muted">Har du redan ett konto? <Link to="/login" className="font-semibold text-brand underline underline-offset-4">Logga in</Link></p>
      </section>
    </div>
  );
}

export default Register;
