export default function PhotoUpload({ images, onChange, error }) {
  return (
    <div className="space-y-1">
      <label className="font-medium text-slate-700">Photos (optional)</label>
      <p className="text-[11px] text-slate-400 mb-1.5">
        Upload up to 3 photos highlighting key work fronts or issues.
      </p>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={onChange}
        className="block w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
      />
      {error && (
        <p className="text-[11px] text-red-500 mt-0.5">
          {error}
        </p>
      )}

      {images.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-2">
          {images.map((img, index) => (
            <img
              key={index}
              src={URL.createObjectURL(img)}
              alt="preview"
              className="w-20 h-20 object-cover rounded-md border border-slate-200 shadow-sm"
            />
          ))}
        </div>
      )}
    </div>
  );
}

