// FormInput.jsx
export function FormInput({
  label,
  register,
  name,
  type = "text",
  errors,
  className = "",
  ...rest
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        {...register(name, rest)}
        className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-coffee-dark ${className}`}
      />
      {errors?.[name] && (
        <span className="text-xs text-red-500">{errors[name].message}</span>
      )}
    </div>
  );
}
