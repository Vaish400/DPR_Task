import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../utils/storage";
import { validateEmail, validatePassword, validateName } from "../utils/validation";
import { sendWelcomeEmail } from "../utils/email";
import Toast from "../components/Toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmError =
      confirmPassword !== password ? "Passwords do not match." : "";

    const newErrors = {};
    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    if (confirmError) newErrors.confirmPassword = confirmError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      registerUser({ name: name.trim(), email: email.trim(), password });
      await sendWelcomeEmail(email.trim());
      setToastMessage("Registration successful. Welcome email sent.");
      setTimeout(() => {
        navigate("/projects");
      }, 1500);
    } catch (err) {
      setErrors({ form: err.message || "Could not register. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="text-slate-100 space-y-4">
          <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-sky-300/80 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/30">
            Create account
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            Set up your{" "}
            <span className="text-emerald-300">SiteTrack DPR</span> workspace.
          </h1>
          <p className="text-sm text-slate-300 max-w-md">
            One login for project managers and site engineers to keep daily
            progress aligned across all jobs.
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-1">
            Register a new account
          </h2>
          <p className="text-xs text-slate-500 mb-4">
            Use your work email to receive DPR notifications.
          </p>

          {errors.form && (
            <p className="text-red-500 text-xs bg-red-50 border border-red-100 rounded-md px-3 py-2 mb-3">
              {errors.form}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Name</label>
              <input
                type="text"
                placeholder="Site Manager"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
              />
              {errors.name && (
                <p className="text-[11px] text-red-500 mt-0.5">{errors.name}</p>
              )}
            </div>

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
              {errors.email && (
                <p className="text-[11px] text-red-500 mt-0.5">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
              {errors.password && (
                <p className="text-[11px] text-red-500 mt-0.5">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">
                Confirm password
              </label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full"
              />
              {errors.confirmPassword && (
                <p className="text-[11px] text-red-500 mt-0.5">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-sky-500 via-emerald-500 to-blue-500 text-white py-2.5 rounded-lg text-sm font-medium shadow-md hover:shadow-lg hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="text-[11px] text-slate-500 mt-4 text-center">
            Already registered?{" "}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-sky-600 hover:text-sky-700 font-medium"
            >
              Back to login
            </button>
          </p>
        </div>
      </div>

      <Toast
        message={toastMessage}
        type="success"
        onClose={() => setToastMessage("")}
      />
    </div>
  );
}

