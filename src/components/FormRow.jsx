function FormRow({ label, children }) {
  return (
    <div className="flex flex-col items-center w-full gap-1.5 mt-1 md:gap-3 md:mt-0 md:flex-row">
      <label className="w-full text-sm text-gray-600 md:w-1/6">{label} :</label>

      <div className="w-full md:w-5/6">{children}</div>
    </div>
  );
}

export default FormRow;
