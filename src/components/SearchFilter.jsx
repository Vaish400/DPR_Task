export default function SearchFilter({
  search,
  statusFilter,
  locationFilter,
  locations,
  onSearchChange,
  onStatusChange,
  onLocationChange,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white/90 backdrop-blur-sm px-3.5 py-3.5">
      <h2 className="text-sm font-semibold text-slate-800 mb-3">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-slate-600">
            Search by project name
          </label>
          <input
            type="text"
            placeholder="e.g. Metro, Highway..."
            className="w-full"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-slate-600">
            Status
          </label>
          <select
            className="w-full"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Delayed">Delayed</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-slate-600">
            Location
          </label>
          <select
            className="w-full"
            value={locationFilter}
            onChange={(e) => onLocationChange(e.target.value)}
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

