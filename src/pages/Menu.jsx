import { useMenuItems } from "../hooks/useMenuItems";

function Menu() {
  const { data, isLoading, error } = useMenuItems();
  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا در بارگذاری آیتم‌های منو: {error.message}</div>;

  console.log(data);

  return <div>صفحه منو</div>;
}

export default Menu;
