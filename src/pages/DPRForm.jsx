import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { projects } from "../constants/projects";
import PhotoUpload from "../components/PhotoUpload";
import Toast from "../components/Toast";
import { getCurrentUser } from "../utils/storage";

export default function DPRForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === Number(id));

  const [selectedProject, setSelectedProject] = useState(project?.id || "");
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [description, setDescription] = useState("");
  const [workers, setWorkers] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  const selectedProjectObj = useMemo(
    () => projects.find((p) => p.id === Number(selectedProject)) || project,
    [selectedProject, project]
  );

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

  const handleImages = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length > 3) {
      setErrors((prev) => ({
        ...prev,
        images: "You can upload a maximum of 3 images.",
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, images: undefined }));
    setImages(files);
  };

  const validate = () => {
    const newErrors = {};

    if (!selectedProject) newErrors.project = "Please select a project.";
    if (!date) newErrors.date = "Please select the DPR date.";
    if (!weather) newErrors.weather = "Please select today’s weather.";
    if (!description || description.trim().length < 10) {
      newErrors.description = "Add at least 10 characters of work summary.";
    }
    if (!workers || Number(workers) <= 0) {
      newErrors.workers = "Enter the total number of workers on site.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (!validate()) return;

    const formData = {
      projectId: selectedProjectObj?.id,
      projectName: selectedProjectObj?.name,
      date,
      weather,
      description: description.trim(),
      workers: Number(workers),
      images,
    };

    console.log("DPR Data:", formData);

    setMessage("DPR submitted successfully. You can now view it in the log.");

    setTimeout(() => {
      navigate("/projects");
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button
              type="button"
              onClick={() => navigate("/projects")}
              className="text-slate-500 hover:text-slate-900"
            >
              Projects
            </button>
            <span className="text-slate-400">/</span>
            <span className="text-slate-700 font-medium">
              {selectedProjectObj?.name || "New DPR"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {currentUser && (
              <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-500">
                <div className="h-7 w-7 rounded-full bg-slate-900 text-slate-100 flex items-center justify-center text-[10px] font-semibold border border-slate-700">
                  {userInitials}
                </div>
                <div className="leading-tight">
                  <p className="font-semibold text-slate-800">
                    {currentUser.name || "Project user"}
                  </p>
                  <p className="text-slate-500 truncate max-w-[140px]">
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

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-5">
        {selectedProjectObj && (
          <section className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-semibold">
                Daily progress report
              </p>
              <h1 className="text-base font-semibold text-slate-900">
                {selectedProjectObj.name}
              </h1>
              <p className="text-[11px] text-slate-500 mt-1">
                Location:{" "}
                <span className="font-medium text-slate-700">
                  {selectedProjectObj.location}
                </span>{" "}
                • PM:{" "}
                <span className="font-medium text-slate-700">
                  {selectedProjectObj.manager}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-[11px] text-slate-500">Planned progress</p>
                <p className="text-sm font-semibold text-slate-900">
                  {selectedProjectObj.progress}%{" "}
                  <span className="text-[11px] text-slate-400">overall</span>
                </p>
              </div>
            </div>
          </section>
        )}

        <section className="rounded-2xl border border-slate-200 bg-white/95 px-4 py-5 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="font-medium text-slate-700">
                  Project <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full"
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                >
                  <option value="">Select project</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                {errors.project && (
                  <p className="text-[11px] text-red-500 mt-0.5">
                    {errors.project}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-700">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  className="w-full"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                {errors.date && (
                  <p className="text-[11px] text-red-500 mt-0.5">
                    {errors.date}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-700">
                  Weather <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full"
                  value={weather}
                  onChange={(e) => setWeather(e.target.value)}
                >
                  <option value="">Select weather</option>
                  <option value="Sunny">Sunny</option>
                  <option value="Cloudy">Cloudy</option>
                  <option value="Rainy">Rainy</option>
                  <option value="Windy">Windy</option>
                </select>
                {errors.weather && (
                  <p className="text-[11px] text-red-500 mt-0.5">
                    {errors.weather}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="font-medium text-slate-700">
                  Work summary <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400">
                  {description.length}/600 characters
                </span>
              </div>
              <textarea
                placeholder="Key activities, locations, quantities, and any issues or safety observations."
                className="w-full"
                rows="4"
                maxLength={600}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && (
                <p className="text-[11px] text-red-500 mt-0.5">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="font-medium text-slate-700">
                Total workers on site <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 42"
                className="w-full"
                value={workers}
                onChange={(e) => setWorkers(e.target.value)}
              />
              {errors.workers && (
                <p className="text-[11px] text-red-500 mt-0.5">
                  {errors.workers}
                </p>
              )}
              <p className="text-[11px] text-slate-400 mt-0.5">
                Include all categories: staff, skilled, unskilled, and
                subcontractors.
              </p>
            </div>

            <PhotoUpload
              images={images}
              onChange={handleImages}
              error={errors.images}
            />

            <div className="flex flex-col md:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="bg-emerald-500 text-white px-4 py-2.5 rounded-lg w-full md:w-auto hover:bg-emerald-600 shadow-sm hover:shadow-md transition text-xs font-medium"
              >
                Submit DPR
              </button>

              <button
                type="button"
                onClick={() => navigate("/projects")}
                className="bg-slate-100 text-slate-700 px-4 py-2.5 rounded-lg w-full md:w-auto hover:bg-slate-200 border border-slate-200 text-xs font-medium"
              >
                Cancel and go back
              </button>
            </div>
          </form>
        </section>

        <Toast
          message={message}
          type="success"
          onClose={() => setMessage("")}
        />
      </main>
    </div>
  );
}