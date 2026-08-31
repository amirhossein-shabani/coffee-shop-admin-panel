import { useState, useMemo } from "react";
import { useUpdateAvailability } from "../hooks/useMenuItems";
import { toastSuccess, toastError } from "../utils/swal";
import { useAuth } from "../hooks/useAuth";

export default function AvailabilityEditor({ data, onSuccess }) {
  const [draftUnavailable, setDraftUnavailable] = useState(null);
  const updateMutation = useUpdateAvailability();
  const initialUnavailable = useMemo(() => {
    if (!data) return [];
    return data.filter((i) => i.is_available === false).map((i) => i.id);
  }, [data]);

  const selected = draftUnavailable ?? initialUnavailable;
  const { isViewer } = useAuth();

  const hasChanges =
    draftUnavailable !== null &&
    JSON.stringify(selected) !== JSON.stringify(initialUnavailable);

  const otherItems = useMemo(() => {
    if (!data) return [];
    return data.filter((item) => !selected.includes(item.id));
  }, [data, selected]);

  const handleCheckbox = (id, checked) => {
    setDraftUnavailable((prev) => {
      const prevSel = prev ?? initialUnavailable;
      if (checked) return [...prevSel, id];
      return prevSel.filter((x) => x !== id);
    });
  };

  const handleSave = async () => {
    if (!hasChanges) return;
    try {
      await updateMutation.mutateAsync(selected);
      setDraftUnavailable(null);
      toastSuccess("وضعیت موجودی به‌روزرسانی شد.");
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toastError(err?.message || "خطا در به‌روز‌رسانی موجودی");
    }
  };

  return (
    <div className="w-full px-2 py-1 bg-white rounded-lg max-h-[70vh] md:max-h-full overflow-auto">
      <div className="mb-3">
        <h3 className="mb-2 text-sm font-semibold text-gray-700">
          آیتم‌های ناموجود ({selected.length})
        </h3>
      </div>

      {selected.length > 0 && (
        <div className="pb-3 mb-3 border-b border-gray-200">
          <p className="mb-2 text-xs text-gray-500">ناموجود</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {selected.map((id) => {
              const item = data?.find((d) => d.id === id);
              return (
                <label
                  key={id}
                  className={`flex items-center gap-2 p-2 transition rounded bg-red-50 ${
                    isViewer
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer hover:bg-red-100"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked
                    disabled={isViewer}
                    onChange={(e) => handleCheckbox(id, e.target.checked)}
                    className="w-4 h-4 accent-red-500"
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

      {otherItems.length > 0 && (
        <div className="mb-4">
          <p className="mb-2 text-xs text-gray-500">سایر آیتم‌ها</p>
          <div className="grid grid-cols-1 gap-2 overflow-y-auto sm:grid-cols-2 max-h-56">
            {otherItems.map((item) => (
              <label
                key={item.id}
                className={`flex items-center gap-2 p-2 transition rounded bg-gray-50 ${
                  isViewer
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:bg-gray-100"
                }`}
              >
                <input
                  type="checkbox"
                  checked={false}
                  disabled={isViewer}
                  onChange={(e) => handleCheckbox(item.id, e.target.checked)}
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

      <div className="flex gap-2">
        {isViewer ? (
          <div className="flex-1 px-3 py-2 text-sm text-center text-red-600 bg-gray-100 rounded">
            شما اجازه تغییر ایتم‌های موجودی را ندارید.
          </div>
        ) : (
          <>
            <button
              onClick={handleSave}
              disabled={!hasChanges || updateMutation.isPending}
              className="flex-1 px-3 py-2 text-sm text-white transition bg-green-500 rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {updateMutation.isPending ? "درحال ذخیره..." : "ذخیره تغییرات"}
            </button>
            {hasChanges && (
              <span className="flex items-center text-xs text-orange-500">
                • تغییرات ذخیره نشده
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
