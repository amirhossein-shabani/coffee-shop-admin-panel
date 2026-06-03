import { useSetting } from "../hooks/useSetting";

function Dashboard() {
  const { data, isLoading, error } = useSetting();
  if (isLoading)
    return (
      <div className="p-4 text-3xl font-bold text-gray-700">
        لطفا صبر کنید ...
      </div>
    );
  if (error)
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
        خوش امدی {data.AdminName} 😊
      </h2>
    </div>
  );
}

export default Dashboard;
