import { useState, useEffect, useMemo } from "react";
import { useUpdateSuggestedItems } from "../hooks/useMenuItems";

const MAX_SUGGESTED = 6;

function SuggestedItem({ data, onSuccess }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const updateMutation = useUpdateSuggestedItems();

  // جدا کن items پیشنهادی و غیر پیشنهادی
  const { suggestedItems, otherItems } = useMemo(() => {
    if (!data) return { suggestedItems: [], otherItems: [] };

    const suggested = data.filter((item) => item.suggested);
    const other = data.filter((item) => !item.suggested);

    return {
      suggestedItems: suggested,
      otherItems: other,
    };
  }, [data]);

  // هنگام بارگذاری، suggested items را انتخاب کن
  useEffect(() => {
    const initialSelectedIds = suggestedItems.map((item) => item.id);
    setSelectedIds(initialSelectedIds);
  }, [suggestedItems]);

  const handleCheckboxChange = (itemId, isChecked) => {
    setSelectedIds((prevSelected) => {
      let newSelected;

      if (isChecked) {
        // اگر قبلاً 6 تا انتخاب شده باشند، قدیمی‌ترین را حذف کن
        if (prevSelected.length >= MAX_SUGGESTED) {
          newSelected = [...prevSelected.slice(1), itemId];
        } else {
          newSelected = [...prevSelected, itemId];
        }
      } else {
        newSelected = prevSelected.filter((id) => id !== itemId);
      }

      setHasChanges(true);
      return newSelected;
    });
  };

  const handleSave = async () => {
    if (!hasChanges) return;

    try {
      await updateMutation.mutateAsync(selectedIds);
      setHasChanges(false);
      onSuccess?.();
    } catch (error) {
      console.error("خطا در ذخیره تغییرات:", error);
    }
  };

  const isLoading = updateMutation.isPending;

  return (
    <div className="w-full px-2 py-1 bg-white rounded-lg">
      <div className="mb-3">
        <h3 className="mb-2 text-sm font-semibold text-gray-700">
          آیتم‌های پیشنهادی ({selectedIds.length}/{MAX_SUGGESTED})
        </h3>
      </div>

      {/* آیتم‌های انتخاب شده ابتدا */}
      {selectedIds.length > 0 && (
        <div className="pb-3 mb-3 border-b border-gray-200">
          <p className="mb-2 text-xs text-gray-500">انتخاب‌شده</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {selectedIds.map((id) => {
              const item = data?.find((d) => d.id === id);
              return (
                <label
                  key={id}
                  className="flex items-center gap-2 p-2 transition rounded cursor-pointer bg-green-50 hover:bg-green-100"
                >
                  <input
                    type="checkbox"
                    checked={true}
                    onChange={(e) => handleCheckboxChange(id, e.target.checked)}
                    className="w-4 h-4 accent-green-500"
                  />
                  <span className="text-sm text-gray-700 truncate">
                    {item?.name}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* باقی آیتم‌ها */}
      {otherItems.length > 0 && (
        <div className="mb-4">
          <p className="mb-2 text-xs text-gray-500">سایر آیتم‌ها</p>
          <div className="grid grid-cols-1 gap-2 overflow-y-auto sm:grid-cols-2 max-h-56">
            {otherItems.map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-2 p-2 transition rounded cursor-pointer bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={(e) =>
                    handleCheckboxChange(item.id, e.target.checked)
                  }
                  disabled={
                    selectedIds.length >= MAX_SUGGESTED &&
                    !selectedIds.includes(item.id)
                  }
                  className="w-4 h-4 accent-blue-500"
                />
                <span className="text-sm text-gray-700 truncate">
                  {item.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* دکمه ذخیره */}
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          disabled={!hasChanges || isLoading}
          className="flex-1 px-3 py-2 text-sm text-white transition bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isLoading ? "درحال ذخیره..." : "ذخیره تغییرات"}
        </button>
        {hasChanges && (
          <span className="flex items-center text-xs text-orange-500">
            • تغییرات ذخیره نشده
          </span>
        )}
      </div>
    </div>
  );
}

export default SuggestedItem;
