import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { findUserByEmail, setCurrentUser } from "../utils/storage";
import { validateEmail, validatePassword } from "../utils/validation";
import { sendLoginEmail } from "../utils/email";
import Toast from "../components/Toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (emailError || passwordError) {
      setError(emailError || passwordError);
      return;
    }

    setIsSubmitting(true);

    try {
      // check demo account first
      if (email === "test@test.com" && password === "123456") {
        setCurrentUser({ email, name: "Demo User" });
        await sendLoginEmail(email);
        setToastMessage("Login successful. Email notification sent.");
        navigate("/projects");
        return;
      }

      const existing = findUserByEmail(email.trim());
      if (!existing || existing.password !== password) {
        setError("Invalid email or password. Try again or use the demo account.");
        return;
      }

      setCurrentUser({ email: existing.email, name: existing.name });
      await sendLoginEmail(existing.email);
      setToastMessage("Login successful. Email notification sent.");
      navigate("/projects");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Top navigation bar */}
      <header className="w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-100">
            <div className="h-8 w-8 rounded-xl bg-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/40">
              <span className="text-slate-900 text-xs font-black">ST</span>
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-slate-300">
                SiteTrack DPR
              </p>
              <p className="text-[11px] text-slate-400">
                Daily progress reporting for construction teams
              </p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-[11px] text-slate-300">
            <button className="hover:text-white transition">Product</button>
            <button className="hover:text-white transition">Pricing</button>
            <button className="hover:text-white transition">Resources</button>
            <button className="text-slate-300 border border-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition">
              Talk to sales
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-[1.4fr,1fr] gap-10 items-center">
          {/* Hero / marketing side */}
          <div className="text-slate-100 space-y-6">
            <div className="inline-flex items-center gap-2 text-[11px] font-medium text-emerald-200 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/40">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Trusted DPR layer for project businesses
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                Turn fragmented site updates into{" "}
                <span className="text-emerald-300">one live DPR view</span>.
              </h1>
              <p className="text-sm md:text-[13px] text-slate-300 max-w-xl mt-3">
                SiteTrack connects site engineers and project managers so every
                metro, highway, and commercial build shares the same, photo‑rich
                daily progress – without chasing messages.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-[11px]">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-3">
                <p className="text-slate-300">Projects onboarded</p>
                <p className="text-xl font-semibold text-white mt-1">45+</p>
                <p className="text-slate-500 mt-1">
                  From metros, expressways, and tech parks.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-3">
                <p className="text-slate-300">DPR compliance</p>
                <p className="text-xl font-semibold text-white mt-1">98%</p>
                <p className="text-slate-500 mt-1">
                  Sites submitting before the 8 PM cut‑off.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-3">
                <p className="text-slate-300">Faster reporting</p>
                <p className="text-xl font-semibold text-white mt-1">3×</p>
                <p className="text-slate-500 mt-1">
                  Average time saved per site per day.
                </p>
              </div>
            </div>

            <div className="hidden md:block text-[10px] text-slate-500">
              <p className="uppercase tracking-[0.18em] text-slate-500 mb-1">
                Built for project companies
              </p>
              <div className="flex flex-wrap gap-4 opacity-80">
                <span>Urban Transport Corp</span>
                <span>National Highways Authority</span>
                <span>Skyline Developers</span>
                <span>Global IT Solutions</span>
              </div>
            </div>
          </div>

          {/* Auth card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/40 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-1">
              Sign in to your workspace
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Use the demo account or sign up for your own workspace.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Work email
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>

              {error && (
                <p className="text-red-500 text-xs bg-red-50 border border-red-100 rounded-md px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-500 via-sky-500 to-blue-500 text-white py-2.5 rounded-lg text-sm font-medium shadow-md hover:shadow-lg hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
              >
                {isSubmitting && (
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                )}
                <span>{isSubmitting ? "Signing in..." : "Sign in"}</span>
              </button>
            </form>

            <div className="mt-5 rounded-lg bg-slate-50 border border-slate-200 px-3 py-2.5 text-xs text-slate-600">
              <p className="font-semibold mb-1 text-slate-700">
                Demo credentials
              </p>
              <p>
                Email:{" "}
                <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">
                  test@test.com
                </span>
              </p>
              <p>
                Password:{" "}
                <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">
                  123456
                </span>
              </p>
            </div>

            <p className="text-[11px] text-slate-500 mt-4 text-center">
              New here?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-emerald-600 hover:text-emerald-400 font-medium"
              >
                Create an account
              </button>
            </p>
          </div>
        </div>
      </main>

      <Toast
        message={toastMessage}
        type="success"
        onClose={() => setToastMessage("")}
      />
    </div>
  );
}