import { Outlet, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDeleteMenuItem, useMenuItems } from "../hooks/useMenuItems";
import {
  confirm as swalConfirm,
  toastSuccess,
  toastError,
} from "../utils/swal";
import SearchBar from "../components/SearchBar";
import MenuLoading from "../components/MenuLoading";
import AddItemButton from "../components/AddItemButton";
import MobileItemContainer from "../components/MobileItemContainer";
import WindowsItemContainer from "../components/WindowsItemContainer";
// SuggestedItem moved to Dashboard
import { useAuth } from "../hooks/useAuth";

function Menu() {
  const { data, isLoading, error } = useMenuItems();
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const { isViewer } = useAuth();

  // فیلتر بهینه شده با useMemo
  const filteredData = useMemo(() => {
    return data?.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [data, searchTerm]);

  const deleteMenuItemMutation = useDeleteMenuItem();

  async function handleDelete(id, imageUrl) {
    const ok = await swalConfirm({
      title: "حذف آیتم",
      text: "آیا از حذف این آیتم مطمئن هستید؟",
    });
    if (!ok) return;

    deleteMenuItemMutation.mutate(
      { id, imageUrl },
      {
        onSuccess: () => toastSuccess("آیتم با موفقیت حذف شد."),
        onError: (err) => toastError(err?.message || "خطا در حذف آیتم."),
      },
    );
  }

  if (isLoading) return <MenuLoading />;
  if (error) return <div>خطا در بارگذاری آیتم‌های منو: {error.message}</div>;

  return (
    <div className="flex flex-col w-full gap-4">
      {window.innerWidth >= 768 && (
        <h1 className="pb-5 pr-0 text-xl font-bold text-coffee-dark/80">
          صفحه منو
        </h1>
      )}

      <div className="flex flex-row w-full gap-1 px-0 pt-4 md:pt-0">
        <SearchBar
          value={searchTerm}
          onSearch={setSearchTerm}
          placeholder="جستجو آیتم..."
        />
        {/* Suggested items management moved to Dashboard */}
        <AddItemButton navigate={() => navigate("/menu/add")} />
      </div>

      <div className="flex flex-col gap-2 p-2 px-1 pb-10 md:px-4 scroll-container">
        {filteredData?.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="flex items-center w-full px-1 py-1 overflow-visible text-gray-700 transition bg-white rounded-lg shadow-sm md:px-2 md:pr-1 hover:shadow-lg hover:text-gray-900 hover:scale-[1.02]"
            >
              {window.innerWidth > 768 ? (
                <WindowsItemContainer item={item} />
              ) : (
                <MobileItemContainer item={item} />
              )}
              <div className="flex text-xl gap-x-2">
                <button
                  onClick={() => navigate(`/menu/${item.id}`)}
                  className="transition hover:text-green-500"
                >
                  <FiEdit />
                </button>

                <button
                  onClick={() => handleDelete(item.id, item.imgUrl)}
                  disabled={isViewer}
                  className="transition hover:text-red-500 disabled:opacity-50 disabled:hover:text-gray-700 disabled:cursor-not-allowed"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-10 text-center text-gray-500">
            هیچ آیتمی یافت نشد
          </div>
        )}
      </div>
      <Outlet />

      {/* Suggested items have been moved to the Dashboard */}
    </div>
  );
}

export default Menu;
