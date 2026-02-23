import { useMenuItems } from "../hooks/useMenuItems";

function Menu() {
  const { data, isLoading, error } = useMenuItems();
  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا در بارگذاری آیتم‌های منو: {error.message}</div>;

  console.log(data);

  return <div>صفحه منو</div>;
}

export default Menu;

// create the ui and logic for the menuItems data in this rouote ..

// create the pages of the data in this route and use navgation and pagination for shoowing data like the wild oasis project .

// figure out the way to upload the images with theh lower quality for performance .
