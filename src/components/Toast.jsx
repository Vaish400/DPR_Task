export default function Toast({ message, type = "success", onClose }) {
  if (!message) return null;

  const baseClasses =
    "fixed inset-x-0 bottom-4 flex justify-center px-4 z-50 pointer-events-none";

  const cardClasses =
    "pointer-events-auto max-w-md w-full rounded-xl shadow-lg border px-4 py-3 text-xs flex items-start gap-3 backdrop-blur-md transition transform animate-slide-up";

  const variants = {
    success:
      "bg-emerald-50/95 border-emerald-200 text-emerald-800",
    error: "bg-red-50/95 border-red-200 text-red-800",
    info: "bg-slate-50/95 border-slate-200 text-slate-800",
  };

  return (
    <div className={baseClasses}>
      <div className={`${cardClasses} ${variants[type]}`}>
        <div className="mt-0.5">
          {type === "success" && (
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-[10px] mr-1">
              ✓
            </span>
          )}
          {type === "error" && (
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-700 text-[10px] mr-1">
              !
            </span>
          )}
        </div>
        <div className="flex-1">
          <p>{message}</p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-2 text-[11px] text-slate-400 hover:text-slate-700"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}

