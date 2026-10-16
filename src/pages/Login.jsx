import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
      <section className="mx-auto max-w-md">
        <h1 className="font-display text-3xl font-semibold">Logga in</h1>
        <p className="mt-2 text-sm leading-6 text-muted">Konto-inloggning är inte ansluten till en server i den här prototypen.</p>
        <form onSubmit={(event) => event.preventDefault()} className="mt-7 space-y-5">
          <div>
            <label htmlFor="login-email" className="mb-2 block text-sm font-semibold">E-post</label>
            <input id="login-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="min-h-12 w-full rounded-xl border border-edge bg-surface px-4 text-ink" />
          </div>
          <div>
            <label htmlFor="login-password" className="mb-2 block text-sm font-semibold">Lösenord</label>
            <input id="login-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="min-h-12 w-full rounded-xl border border-edge bg-surface px-4 text-ink" />
          </div>
          <button type="submit" className="min-h-12 w-full rounded-full bg-brand px-5 py-3 text-sm font-semibold text-on-brand hover:bg-brand-strong">Logga in</button>
        </form>
        <p className="mt-5 text-sm text-muted">Nytt här? <Link to="/register" className="font-semibold text-brand underline underline-offset-4">Skapa konto</Link></p>
      </section>
    </div>
  );
}

export default Login;
