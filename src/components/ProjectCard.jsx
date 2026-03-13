import { useNavigate } from "react-router-dom";

export default function ProjectCard({ project }) {
  const navigate = useNavigate();

  const statusColor = {
    Active: "bg-emerald-500/90",
    Completed: "bg-blue-500/90",
    Delayed: "bg-amber-500/90",
  };

  const borderColor = {
    Active: "border-emerald-100",
    Completed: "border-blue-100",
    Delayed: "border-amber-100",
  };

  const progress = project.progress ?? 0;

  const initials = project.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <div
      className={`group border rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-1 transition bg-white/80 backdrop-blur-sm ${borderColor[project.status]}`}
      onClick={() => navigate(`/dpr/${project.id}`)}
    >
      <div className="relative h-24 w-full overflow-hidden bg-slate-900">
        {project.heroImage ? (
          <img
            src={project.heroImage}
            alt={project.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900">
            <span className="text-slate-200 text-xs font-semibold">
              {initials}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/20 to-transparent" />
        <div className="absolute bottom-2 left-3 flex items-center gap-2 text-[10px] text-slate-100">
          <span className="inline-flex items-center rounded-full bg-black/40 px-2 py-0.5 backdrop-blur">
            {project.location}
          </span>
          {project.client && (
            <span className="inline-flex items-center rounded-full bg-emerald-500/80 px-2 py-0.5 font-semibold max-w-[140px] truncate">
              {project.client}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-start justify-between gap-3 mb-3 mt-3">
        <div>
          <h3 className="font-semibold text-slate-900 text-lg leading-snug">
            {project.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1">{project.client}</p>
        </div>

        <span
          className={`text-white text-[10px] px-2 py-1 rounded-full uppercase tracking-wide shadow-sm
          ${statusColor[project.status]}`}
        >
          {project.status}
        </span>
      </div>

      <div className="flex items-center text-xs text-slate-500 gap-4 mb-3">
        <p className="flex-1">
          <span className="font-medium text-slate-700">Location:</span>{" "}
          {project.location}
        </p>
        <p className="whitespace-nowrap">
          <span className="font-medium text-slate-700">Start:</span>{" "}
          {project.startDate}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
        <span>Progress</span>
        <span className="font-medium text-slate-700">{progress}%</span>
      </div>

      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-sky-500 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs text-slate-500 flex justify-between">
        <span>
          PM:{" "}
          <span className="font-medium text-slate-700">
            {project.manager}
          </span>
        </span>
        {project.budgetCr && (
          <span className="font-medium text-slate-700">
            ₹ {project.budgetCr} Cr
          </span>
        )}
      </p>
    </div>
  );
}