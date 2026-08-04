import { MdDelete } from "react-icons/md";
import { useNavigate, Outlet } from "react-router-dom";
import { useCategoies, useDeleteCategory } from "../hooks/useCategories";
import {
  confirm as swalConfirm,
  toastSuccess,
  toastError,
} from "../utils/swal";
import CategoriesLoading from "../components/CategoriesLoading";
import { FiEdit } from "react-icons/fi";

function Categories() {
  const { data, isLoading, error } = useCategoies();
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();
  const navigate = useNavigate();

  if (isLoading || isDeleting) return <CategoriesLoading />;
  if (error) return <div>خطا در بارگذاری دسته‌بندی‌ها: {error.message}</div>;

  return (
    <div className="space-y-4">
      {window.innerWidth >= 768 && (
        <h1 className="pb-5 pr-1 text-xl font-bold text-coffee-dark/80 ">
          صفحه دسته‌بندی‌ها
        </h1>
      )}
      <div className=" flex flex-col md:grid md:grid-cols-2 gap-4 scroll-container !max-h-[80vh] px-2">
        <button
          onClick={() => navigate("/categories/add")}
          className="col-span-2 py-2 text-center text-gray-800 border border-gray-400 border-dotted rounded-lg bg-white/50 hover:bg-white hover:text-black hover:scale-[1.02] transition duration-300"
        >
          اضاف کردن کتگوری <span className="text-xl"> + </span>
        </button>
        {data?.map((category) => (
          <div
            onClick={() => {
              if (window.innerWidth >= 768)
                navigate(`/categories/${category.href}`);
            }}
            key={category.id}
            className="relative group flex items-center justify-between p-4 transition bg-white shadow rounded-xl hover:scale-[1.02] hover:shadow-md"
          >
            <div className="absolute z-20 flex p-1 text-xs left-1 top-1 gap-x-2">
              <button
                onClick={() => navigate(`/categories/${category.href}`)}
                className="text-base text-gray-500 transition hover:text-green-500 md:hidden"
              >
                <FiEdit />
              </button>
              {/* دکمه حذف */}
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  const ok = await swalConfirm({
                    title: "حذف دسته‌بندی",
                    text: "آیا مطمئن هستید که می‌خواهید این دسته‌بندی را حذف کنید؟",
                  });

                  if (!ok) return;

                  deleteCategory(category.href, {
                    onSuccess: () => toastSuccess("دسته‌بندی حذف شد."),
                    onError: (err) =>
                      toastError(err?.message || "خطا در حذف دسته‌بندی."),
                  });
                }}
                className="text-gray-500 transition hover:text-red-500"
              >
                <MdDelete size={18} />
              </button>
            </div>

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
            {window.innerWidth >= 768 && (
              <div className="absolute inset-0 flex items-center justify-center transition duration-300 opacity-0 bg-white/10 backdrop-blur-sm rounded-xl group-hover:opacity-100 ">
                <span className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-black/60">
                  ویرایش
                </span>
              </div>
            )}
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
