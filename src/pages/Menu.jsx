import { Outlet, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDeleteMenuItem, useMenuItems } from "../hooks/useMenuItems";
import SearchBar from "../components/SearchBar";
import MenuLoading from "../components/MenuLoading";
import AddItemButton from "../components/AddItemButton";

function Menu() {
  const { data, isLoading, error } = useMenuItems();
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // فیلتر بهینه شده با useMemo
  const filteredData = useMemo(() => {
    return data?.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [data, searchTerm]);

  const deleteMenuItemMutation = useDeleteMenuItem();

  function handleDelete(id, imageUrl) {
    if (window.confirm("آیا از حذف این آیتم مطمئن هستید؟")) {
      deleteMenuItemMutation.mutate({ id, imageUrl });
    }
  }

  if (isLoading) return <MenuLoading />;
  if (error) return <div>خطا در بارگذاری آیتم‌های منو: {error.message}</div>;

  return (
    <div className="space-y-4 ">
      {window.innerWidth >= 768 && (
        <h1 className="pb-5 pr-1 text-xl font-bold text-coffee-dark/80">
          صفحه منو
        </h1>
      )}

      <div className="flex flex-row ">
        <SearchBar
          value={searchTerm}
          onSearch={setSearchTerm}
          placeholder="جستجو آیتم..."
        />
        <AddItemButton navigate={() => navigate("/menu/add")} />
      </div>

      <div className="flex flex-col gap-2 pb-10 pl-2 scroll-container">
        {filteredData?.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="w-[96%] md:w-[90%]  mr-4 flex items-center shadow-sm px-1 md:px-2 md:pr-1 py-1 bg-white  rounded-lg transition hover:scale-[1.02] hover:shadow-lg text-gray-700 hover:text-gray-900"
            >
              {window.innerWidth > 768 ? (
                <div className="flex items-center flex-1 ">
                  <div className="flex flex-row w-1/2 px-0 gap-x-3">
                    <div className="flex self-center h-20 w-28">
                      <img
                        src={item.imgUrl}
                        // alt={item.name}
                        className="w-full rounded-md aspect-auto"
                      />
                    </div>

                    <div className="flex flex-col justify-between w-full pt-0.5 gap-1 py-1">
                      <p className="text-sm md:text-sm">{item.name}</p>
                      <p className="text-sm text-red-900 md:text-sm w-fit">
                        {item.price} تومان
                      </p>
                    </div>
                  </div>

                  <div className="flex w-[90%] self-start justify-start h-full py-1.5 px-2 pr-4">
                    <p className="flex text-xs text-gray-500 ">
                      {item.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center flex-1 ">
                  <div className="flex flex-row w-full gap-x-3">
                    <div className="w-16">
                      <img
                        src={item.imgUrl}
                        // alt={item.name}
                        className="w-full rounded-md aspect-auto "
                      />
                    </div>

                    <div className="flex flex-col justify-between  p-1 w-[80%]">
                      <div className="pt-0.5 ">
                        <p className="pb-1 text-xs font-bold border-b w-[90%] md:text-sm border-coffee-dark/40 ">
                          {item.name}
                        </p>
                      </div>

                      <p className="w-full py-3 text-xs text-gray-500 ">
                        {item.description}
                      </p>

                      <p className="text-xs text-red-900 md:text-sm w-fit">
                        {item.price} تومان
                      </p>
                    </div>
                  </div>
                </div>
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
                  className="transition hover:text-red-500"
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
    </div>
  );
}

export default Menu;
