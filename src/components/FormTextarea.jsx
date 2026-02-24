// FormTextarea.jsx
export function FormTextarea({
  label,
  register,
  name,
  errors,
  rows = 3,
  className = "",
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <textarea
        rows={rows}
        {...register(name)}
        className={`px-3 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-coffee-dark ${className}`}
      />
      {errors?.[name] && (
        <span className="text-xs text-red-500">{errors[name].message}</span>
      )}
    </div>
  );
}
