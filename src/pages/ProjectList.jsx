import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { projects } from "../constants/projects";
import ProjectCard from "../components/ProjectCard";
import SearchFilter from "../components/SearchFilter";
import { getCurrentUser } from "../utils/storage";

export default function ProjectList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  const userInitials =
    currentUser?.name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 3)
      .toUpperCase() || "ST";

  const locations = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.location)))],
    []
  );

  const filteredProjects = useMemo(
    () =>
      projects.filter((p) => {
        const matchesSearch = p.name
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesStatus =
          statusFilter === "All" || p.status === statusFilter;
        const matchesLocation =
          locationFilter === "All" || p.location === locationFilter;
        return matchesSearch && matchesStatus && matchesLocation;
      }),
    [search, statusFilter, locationFilter]
  );

  const activeCount = projects.filter((p) => p.status === "Active").length;
  const delayedCount = projects.filter((p) => p.status === "Delayed").length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-400/40">
              <span className="text-xs font-black text-slate-900">ST</span>
            </div>
            <div>
              <h1 className="text-sm md:text-base font-semibold text-slate-900 tracking-tight">
                SiteTrack DPR – Portfolio
              </h1>
              <p className="text-[11px] text-slate-500">
                {activeCount} active projects, {delayedCount} at risk today.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {currentUser && (
              <div className="hidden md:flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-900 text-slate-100 flex items-center justify-center text-xs font-semibold border border-slate-700">
                  {userInitials}
                </div>
                <div className="text-[11px] leading-tight text-slate-600">
                  <p className="font-semibold text-slate-800">
                    {currentUser.name || "Project user"}
                  </p>
                  <p className="text-slate-500 truncate max-w-[160px]">
                    {currentUser.email}
                  </p>
                </div>
              </div>
            )}
            <button
              onClick={() => navigate("/logout")}
              className="text-xs text-slate-500 hover:text-slate-900 border border-slate-200 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <section className="mb-6 grid grid-cols-1 md:grid-cols-[2fr,3fr] gap-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-800 mb-2">
              Today&apos;s overview
            </h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/80 px-3 py-3">
                <p className="text-emerald-700 font-medium">Active sites</p>
                <p className="text-2xl font-semibold text-emerald-900 mt-1">
                  {activeCount}
                </p>
                <p className="text-[11px] text-emerald-800/80 mt-1">
                  Ensure DPR is submitted before 8 PM.
                </p>
              </div>
              <div className="rounded-xl border border-amber-100 bg-amber-50/80 px-3 py-3">
                <p className="text-amber-700 font-medium">Delayed</p>
                <p className="text-2xl font-semibold text-amber-900 mt-1">
                  {delayedCount}
                </p>
                <p className="text-[11px] text-amber-800/80 mt-1">
                  Review risks and mitigation in DPR comments.
                </p>
              </div>
            </div>
          </div>

          <SearchFilter
            search={search}
            statusFilter={statusFilter}
            locationFilter={locationFilter}
            locations={locations}
            onSearchChange={setSearch}
            onStatusChange={setStatusFilter}
            onLocationChange={setLocationFilter}
          />
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-800">
              All projects
            </h2>
            <p className="text-[11px] text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredProjects.length}
              </span>{" "}
              of {projects.length} projects
            </p>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="border border-dashed border-slate-300 rounded-xl py-10 px-4 text-center text-xs text-slate-500 bg-white/60">
              No projects match your filters. Try clearing the search or filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}