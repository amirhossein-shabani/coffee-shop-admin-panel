import { useNavigate } from "react-router-dom";

export default function WelcomeCard({ isViewer }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col p-4 mt-4 text-center bg-white rounded-lg shadow-sm md:flex-row gap-x-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 ">
          <span className="mr-1 text-sm text-gray-700">نقش:</span>
          <span
            className={`text-sm font-medium px-2 py-1 rounded-full ${
              isViewer
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {isViewer ? "بیننده" : "ادمین"}
          </span>
        </div>
      </div>

      <div className="flex items-center w-full gap-2 mt-3 overflow-x-auto md:justify-center md:gap-x-4 md:mt-0">
        <button
          onClick={() => navigate("/menu")}
          className="flex-1 px-2 py-1 text-sm text-white bg-blue-500 rounded text-nowrap hover:bg-blue-600"
        >
          منو
        </button>
        <button
          onClick={() => navigate("/categories")}
          className="flex-1 px-2 py-1 text-sm rounded text-nowrap bg-amber-100 text-amber-800 hover:bg-amber-200"
        >
          دسته‌بندی‌ها
        </button>
        <button
          onClick={() => navigate("/setting")}
          className="flex-1 px-2 py-1 text-sm text-gray-800 bg-gray-100 rounded text-nowrap hover:bg-gray-200"
        >
          تنظیمات
        </button>
      </div>
    </div>
  );
}
