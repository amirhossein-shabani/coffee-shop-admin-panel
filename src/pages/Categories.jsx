import { MdDelete } from "react-icons/md";
import { useNavigate, Outlet } from "react-router-dom";
import { useCategoies } from "../hooks/useCategories";
import CategoriesLoading from "../components/CategoriesLoading";

function Categories() {
  const { data, isLoading, error } = useCategoies();
  const navigate = useNavigate();

  if (isLoading) return <CategoriesLoading />;
  if (error) return <div>خطا در بارگذاری دسته‌بندی‌ها: {error.message}</div>;

  return (
    <div className="space-y-4">
      <h1 className="pb-5 pr-1 text-xl font-bold text-coffee-dark/80 ">
        صفحه دسته‌بندی‌ها
      </h1>
      <div className="grid grid-cols-2 gap-4 scroll-container !max-h-[80vh] px-2">
        <button
          onClick={() => navigate("/categories/add")}
          className="col-span-2 py-2 text-center text-gray-800 border border-gray-400 border-dotted rounded-lg bg-white/50 hover:bg-white hover:text-black hover:scale-[1.02] transition duration-300"
        >
          اضاف کردن کتگوری <span className="text-xl"> + </span>
        </button>
        {data?.map((category) => (
          <div
            onClick={() => navigate(`/categories/${category.href}`)}
            key={category.id}
            className="relative group flex items-center justify-between p-4 transition bg-white shadow rounded-xl hover:scale-[1.02] hover:shadow-md"
          >
            {/* دکمه حذف */}
            <button
              onClick={(e) => e.stopPropagation()}
              className="absolute z-20 p-1 text-xs text-gray-500 transition top-1 left-1 hover:text-red-500"
            >
              <MdDelete size={18} />
            </button>

            {/* متن */}
            <div>
              <h2 className="text-sm font-semibold text-gray-700">
                {category.categoryTitle}
              </h2>
            </div>

            {/* تصویر */}
            <img
              src={category.imgUrl || null}
              alt={category.categoryTitle}
              className="object-contain w-24 h-24 ml-4 scale-150 rounded-lg"
            />

            {/* Glass Hover Overlay */}
            <div className="absolute inset-0 flex items-center justify-center transition duration-300 opacity-0 bg-white/10 backdrop-blur-sm rounded-xl group-hover:opacity-100 ">
              <span className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-black/60">
                ویرایش
              </span>
            </div>
          </div>
        ))}
        {/* this is ui writ now and you have to write the logic later  */}
      </div>
      <Outlet />
    </div>
  );
}

export default Categories;

// you have to create modal which you can use on the categories and menuItems and create this modal reusable to can use in both route to show and edit the data .

// write the logic for delete and create the category.
