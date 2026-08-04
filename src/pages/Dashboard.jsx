import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import { useSetting } from "../hooks/useSetting";

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
    </div>
  );
}

export default Dashboard;
