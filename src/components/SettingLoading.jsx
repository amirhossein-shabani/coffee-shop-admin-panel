function SettingsLoading() {
  return (
    <div className="p-8 space-y-4 animate-pulse">
      {/* عنوان */}
      <div className="w-32 h-6 bg-gray-100 rounded-md" />

      <div className="flex flex-col w-full gap-3">
        {/* Inputs */}
        {[...Array(9)].map((_, index) => (
          <div key={index} className="w-full h-8 bg-gray-100 rounded-lg" />
        ))}

        {/* Textarea */}
        <div className="w-full h-24 bg-gray-100 rounded-lg" />

        {/* Button */}
        <div className="w-32 h-8 ml-auto bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}

export default SettingsLoading;
