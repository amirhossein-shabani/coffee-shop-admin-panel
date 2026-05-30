function FormRow({ label, children }) {
  return (
    <div className="flex items-center w-full gap-3">
      <label className="w-1/6 text-sm text-gray-600">{label}</label>

      <div className="w-5/6">{children}</div>
    </div>
  );
}

export default FormRow;
