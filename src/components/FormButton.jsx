function FormButton({ type, disabled, children, extraClass }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`px-2 py-1 mt-6 text-base text-white transition bg-green-600 shadow-md rounded-xl hover:bg-green-500 ${extraClass} `}
    >
      {children}
    </button>
  );
}

export default FormButton;
