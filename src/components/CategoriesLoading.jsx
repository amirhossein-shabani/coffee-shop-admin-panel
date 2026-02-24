function CategoriesLoading() {
  return (
    <div className="p-8 space-y-4">
      {/* عنوان صفحه */}
      <div className="w-48 h-6 bg-gray-200 rounded-md animate-pulse" />

      <div className="grid grid-cols-2 gap-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="relative flex items-center justify-between p-4 bg-white shadow rounded-xl"
          >
            {/* دکمه حذف */}
            <div className="absolute w-5 h-5 bg-gray-200 rounded-md top-2 left-2 animate-pulse" />

            {/* متن */}
            <div className="w-1/3 h-4 bg-gray-200 rounded-md animate-pulse" />

            {/* تصویر */}
            <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        ))}

        {/* دکمه اضافه کردن کتگوری */}
        <div className="h-10 col-span-2 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}

export default CategoriesLoading;
