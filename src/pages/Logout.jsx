import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearSession, getCurrentUser } from "../utils/storage";

export default function Logout() {
  const [isProcessing, setIsProcessing] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const current = getCurrentUser();
    if (current?.email) setUserEmail(current.email);
    clearSession();
    const timer = setTimeout(() => {
      setIsProcessing(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-7 flex flex-col items-center text-center space-y-3">
        {isProcessing ? (
          <>
            <div className="w-10 h-10 rounded-full border-2 border-slate-200 border-t-emerald-500 animate-spin mb-1" />
            <h1 className="text-lg font-semibold text-slate-900">
              Signing you out…
            </h1>
            <p className="text-xs text-slate-500">
              Cleaning up your session and redirecting you safely.
            </p>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-semibold mb-1">
              ✓
            </div>
            <h1 className="text-lg font-semibold text-slate-900">
              You&apos;re logged out
            </h1>
            <p className="text-xs text-slate-500">
              {userEmail
                ? `Session for ${userEmail} has been closed.`
                : "Your session has been closed."}{" "}
              You can sign back in anytime.
            </p>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-2 bg-slate-900 text-white px-4 py-2.5 rounded-lg text-xs font-medium shadow-md hover:shadow-lg hover:bg-slate-800 transition w-full"
            >
              Back to login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

