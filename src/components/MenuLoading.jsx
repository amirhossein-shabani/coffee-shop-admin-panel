function MenuLoading() {
  return (
    <div className="p-8 space-y-4">
      <div className="pb-5">
        <div className="w-40 h-6 bg-gray-200 rounded-md animate-pulse" />
      </div>

      <div className="flex flex-col gap-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="flex items-center w-[90%] mr-4 px-4 py-3 bg-white rounded-lg shadow-sm"
          >
            {/* Image skeleton */}
            <div className="w-16 h-16 bg-gray-200 rounded-xl animate-pulse" />

            {/* Text skeleton */}
            <div className="flex flex-col flex-1 gap-3 mr-4">
              <div className="w-1/3 h-4 bg-gray-200 rounded-md animate-pulse" />
              <div className="w-1/4 h-4 bg-gray-200 rounded-md animate-pulse" />
              <div className="w-3/4 h-3 bg-gray-200 rounded-md animate-pulse" />
            </div>

            {/* Action buttons skeleton */}
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-gray-200 rounded-md animate-pulse" />
              <div className="w-6 h-6 bg-gray-200 rounded-md animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuLoading;
