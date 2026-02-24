import { Outlet, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useMenuItems } from "../hooks/useMenuItems";
import SearchBar from "../components/SearchBar";
import MenuLoading from "../components/MenuLoading";

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

  if (isLoading) return <MenuLoading />;
  if (error) return <div>خطا در بارگذاری آیتم‌های منو: {error.message}</div>;

  return (
    <div className="p-8 space-y-4">
      <h1 className="pb-5 pr-1 text-xl font-bold text-coffee-dark/80">
        صفحه منو
      </h1>

      <SearchBar
        value={searchTerm}
        onSearch={setSearchTerm}
        placeholder="جستجو آیتم..."
      />

      <div className="flex flex-col gap-2 pb-10 pl-2 scroll-container">
        {filteredData?.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="w-[90%] mr-4 flex items-center shadow-sm px-2 py-1 bg-white rounded-lg transition hover:scale-[1.02] hover:shadow-lg text-gray-700 hover:text-gray-900"
            >
              <div className="flex items-center flex-1">
                <div className="flex flex-row w-1/2 p-2 gap-x-3">
                  <div className="">
                    <img
                      src={item.imgUrl}
                      // alt={item.name}
                      className="w-16 aspect-square rounded-xl "
                    />
                  </div>

                  <div className="flex flex-col justify-between w-full pt-1">
                    <p className="text-sm">{item.name}</p>
                    <p className="w-fit">{item.price} تومان</p>
                  </div>
                </div>

                <div>
                  <p className="w-full text-xs text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex text-xl gap-x-2">
                <button
                  onClick={() => navigate(`/menu/${item.id}`)}
                  className="transition hover:text-green-500"
                >
                  <FiEdit />
                </button>

                <button className="transition hover:text-red-500">
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
