import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import { useSetting } from "../hooks/useSetting";
import { useMenuItems } from "../hooks/useMenuItems";
import SuggestedItem from "../components/SuggestedItem";
import Modal from "../components/Modal";

function Dashboard() {
  const { data, isLoading, error } = useSetting();
  const { user, loading: authLoading } = useAuth();
  const {
    data: userProfile,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useProfile(user?.id);

  if (isLoading || isLoadingProfile || authLoading)
    return (
      <div className="p-4 text-3xl font-bold text-gray-700">
        لطفا صبر کنید ...
      </div>
    );
  if (error || profileError)
    return (
      <div className="p-4 text-2xl font-bold text-gray-700">
        مشکلی دربارگذاری دیتا پیش امده است ...
      </div>
    );

  return (
    <div className="container">
      {window.innerWidth >= 768 && (
        <h1 className="pb-5 pr-1 text-2xl font-bold text-coffee-dark/80">
          داشبورد
        </h1>
      )}
      <h2 className="text-xl font-bold text-gray-700 ">
        خوش آمدی {userProfile?.userName ?? "کاربر"} 😊
      </h2>
      {userProfile?.description && (
        <p className="mt-2 text-sm text-gray-500">{userProfile.description}</p>
      )}
      {/* Suggested items preview + edit button */}
      <SuggestedItemsBlock />
    </div>
  );
}

function SuggestedItemsBlock() {
  const { data } = useMenuItems();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const suggested = data?.filter((i) => i.suggested) ?? [];

  return (
    <div className="mt-6">
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

export default Dashboard;
