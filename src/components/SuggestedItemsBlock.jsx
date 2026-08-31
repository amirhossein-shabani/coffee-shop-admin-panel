import { useState } from "react";
import { useMenuItems } from "../hooks/useMenuItems";
import SuggestedItem from "./SuggestedItem";
import Modal from "./Modal";

export default function SuggestedItemsBlock() {
  const { data } = useMenuItems();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const suggested = data?.filter((i) => i.suggested) ?? [];

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium transition rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800"
      >
        <span>مدیریت آیتم‌های پیشنهادی</span>
        <span className="text-xs text-gray-600">ویرایش</span>
      </button>

      <div className="p-3 mt-3 bg-white rounded-lg">
        <h3 className="mb-2 text-sm font-semibold text-gray-700">
          آیتم‌های پیشنهادی
        </h3>
        {suggested.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {suggested.map((it) => (
              <span
                key={it.id}
                className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded"
              >
                {it.name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">هیچ آیتم پیشنهادی موجود نیست.</p>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col gap-4">
          <SuggestedItem data={data} onSuccess={() => setIsModalOpen(false)} />
        </div>
      </Modal>
    </div>
  );
}
