function AddItemButton({ navigate }) {
  return (
    <div className="relative group w-[11%] md:w-[8%] mr-1">
      <button
        onClick={navigate}
        className="w-full flex items-center justify-center rounded-xl border border-gray-300 bg-white text-3xl text-gray-700 scale-95 transition hover:scale-100 pt-0.5"
      >
        +
      </button>

      {/* Tooltip */}
      <div className="absolute px-2 py-1 mb-2 text-xs text-white transition-opacity duration-200 -translate-x-1/2 bg-black rounded opacity-0 pointer-events-none bottom-full left-1/2 whitespace-nowrap group-hover:opacity-100">
        اضافه کردن آیتم
        <div className="absolute w-2 h-2 rotate-45 -translate-x-1/2 bg-black -bottom-1 left-1/2"></div>
      </div>
    </div>
  );
}

export default AddItemButton;
