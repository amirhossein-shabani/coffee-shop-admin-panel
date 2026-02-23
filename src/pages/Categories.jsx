import { useCategoies } from "../hooks/useCategories";

function Categories() {
  const { data, isLoading, error } = useCategoies();
  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا در بارگذاری دسته‌بندی‌ها: {error.message}</div>;

  console.log(data);

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">صفحه دسته‌بندی‌ها</h1>
      <p className="text-gray-600">
        مدیریت دسته‌بندی‌های منو در اینجا (افزودن / ویرایش / حذف).
      </p>
    </div>
  );
}

export default Categories;
