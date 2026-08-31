import { useState, useMemo } from "react";
import { useUpdateSuggestedItems } from "../hooks/useMenuItems";
import { toastSuccess, toastError } from "../utils/swal";
import { useAuth } from "../hooks/useAuth";

const MAX_SUGGESTED = 6;

const areSameIds = (firstIds, secondIds) => {
  firstIds.length === secondIds.length &&
    // this line of logic check the equality of the ids and their order and if the ids and the order of the selected items are the same return true
    firstIds.every((id, index) => id === secondIds[index]);
};

function SuggestedItem({ data, onSuccess }) {
  const [draftSelectedIds, setDraftSelectedIds] = useState(null);
  const updateMutation = useUpdateSuggestedItems();

  const initialSelectedIds = useMemo(() => {
    if (!data) return [];
    return data.filter((item) => item.suggested).map((item) => item.id);
  }, [data]);

  const selectedIds = draftSelectedIds ?? initialSelectedIds;

  const { isViewer } = useAuth();

  const hasChanges =
    draftSelectedIds !== null &&
    !areSameIds(draftSelectedIds, initialSelectedIds);

  const otherItems = useMemo(() => {
    if (!data) return [];

    return data.filter((item) => !selectedIds.includes(item.id));
  }, [data, selectedIds]);

  const handleCheckboxChange = (itemId, isChecked) => {
    setDraftSelectedIds((prevDraft) => {
      const prevSelected = prevDraft ?? initialSelectedIds;
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

      return newSelected;
    });
  };

  const handleSave = async () => {
    if (!hasChanges) return;

    try {
      await updateMutation.mutateAsync(selectedIds);
      setDraftSelectedIds(null);
      toastSuccess("آیتم‌های پیشنهادی با موفقیت ذخیره شد.");
      onSuccess?.();
    } catch (error) {
      console.error("خطا در ذخیره تغییرات:", error);
      toastError(error?.message || "خطا در ذخیره تغییرات");
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
                    disabled={isViewer}
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
            {otherItems.map((item) => {
              const isDisabled = selectedIds.length >= MAX_SUGGESTED;

              return (
                <label
                  key={item.id}
                  className={`flex items-center gap-2 p-2 transition rounded bg-gray-50 ${
                    isDisabled
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={false}
                    onChange={(e) =>
                      handleCheckboxChange(item.id, e.target.checked)
                    }
                    disabled={isDisabled || isViewer}
                    className="w-4 h-4 accent-blue-500"
                  />
                  <span className="text-sm text-gray-700 truncate">
                    {item.name}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* دکمه ذخیره */}
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          disabled={!hasChanges || isLoading || isViewer}
          className="flex-1 px-3 py-2 text-sm text-white transition bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          {isViewer ? (
            <span className="text-sm text-red-600">
              شما اجازه تغییر ایتم های پیشنهادی را ندارید .
            </span>
          ) : isLoading ? (
            "درحال ذخیره..."
          ) : (
            "ذخیره تغییرات"
          )}
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
