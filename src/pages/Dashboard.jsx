import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import { useSetting } from "../hooks/useSetting";
import SuggestedItemsBlock from "../components/SuggestedItemsBlock";
import AvailabilityBlock from "../components/AvailabilityBlock";
import WelcomeCard from "../components/WelcomeCard";

function Dashboard() {
  const { data: _settingsData, isLoading, error } = useSetting();
  const { user, loading: authLoading, isViewer } = useAuth();
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
      <WelcomeCard userProfile={userProfile} isViewer={isViewer} />
      {/* Suggested items preview + edit button */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
        <SuggestedItemsBlock />
        <AvailabilityBlock />
      </div>
    </div>
  );
}

export default Dashboard;
