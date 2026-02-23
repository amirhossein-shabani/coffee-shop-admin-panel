import { useCategoies } from "../hooks/useCategories";

function Categories() {
  const { data, isLoading, error } = useCategoies();

  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا در بارگذاری دسته‌بندی‌ها: {error.message}</div>;

  console.log(data);

  return (
    <div className="p-8 space-y-4">
      <h1 className="pb-5 pr-1 text-xl font-bold text-coffee-dark/80">
        صفحه دسته‌بندی‌ها
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {data?.map((category) => (
          <div
            key={category.id}
            className="relative flex items-center justify-between p-4 transition bg-white shadow rounded-xl hover:scale-[1.02] hover:shadow-md hover:text-gray-900"
          >
            {/* this is ui writ now and you have to write the logic later  */}
            <button className="absolute p-1 text-xs transition top-1 left-1 hover:scale-[1.02]">
              ❌
            </button>

            {/* متن دسته‌بندی */}
            <div>
              <h2 className="text-sm font-semibold text-gray-700 ">
                {category.categoryTitle}
              </h2>
            </div>

            {/* تصویر دسته‌بندی */}
            <img
              src={category.imgUrl} // درست شد
              alt={category.categoryTitle}
              className="object-contain w-16 h-16 ml-2 rounded-lg"
            />
          </div>
        ))}
        {/* this is ui writ now and you have to write the logic later  */}

        <button className="col-span-2 py-2 text-center text-gray-800 border border-gray-400 border-dotted rounded-lg bg-white/50 hover:bg-white hover:text-black hover:scale-[1.02] transition duration-300">
          اضاف کردن کتگوری <span className="text-xl"> + </span>
        </button>
      </div>
    </div>
  );
}

export default Categories;

// you have to create modal which you can use on the categories and menuItems and create this modal reusable to can use in both route to show and edit the data .

// write the logic for delete and create the category.
