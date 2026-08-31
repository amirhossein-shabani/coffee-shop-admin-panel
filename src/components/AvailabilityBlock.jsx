import { useState } from "react";
import { useMenuItems } from "../hooks/useMenuItems";
import Modal from "./Modal";
import AvailabilityEditor from "./AvailabilityEditor";

export default function AvailabilityBlock() {
  const { data } = useMenuItems();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const unavailable = data?.filter((i) => i.is_available === false) ?? [];

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-red-800 transition bg-red-200 rounded-lg hover:bg-red-300"
      >
        <span>مدیریت موجودی آیتم‌ها</span>
        <span className="text-xs text-gray-600">ویرایش</span>
      </button>

      <div className="p-3 mt-3 bg-white rounded-lg">
        <h3 className="mb-2 text-sm font-semibold text-gray-700">
          آیتم‌های ناموجود
        </h3>
        {unavailable.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {unavailable.map((it) => (
              <span
                key={it.id}
                className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded"
              >
                {it.name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">فعلاً آیتم ناموجودی ثبت نشده.</p>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="relative flex flex-col gap-4">
          <button
            onClick={() => setIsModalOpen(false)}
            aria-label="بستن"
            className="absolute flex items-center justify-center text-white bg-gray-800 rounded-full shadow-md top-3 left-3 w-9 h-9 hover:bg-gray-700"
          >
            ×
          </button>
          <AvailabilityEditor
            data={data}
            onSuccess={() => setIsModalOpen(false)}
          />
        </div>
      </Modal>
    </div>
  );
}
