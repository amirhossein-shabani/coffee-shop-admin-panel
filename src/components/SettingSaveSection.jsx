import FormButton from "./FormButton";

function SettingSaveSection({ isViewer, isDirty, isPending }) {
  return (
    <div className="flex flex-col items-stretch gap-3 p-3 bg-white border border-gray-200 shadow-sm rounded-xl md:flex-row md:items-center md:justify-between md:p-4">
      <div>
        <p className="text-sm font-medium text-gray-700">
          {isViewer
            ? "شما اجازه تغییر تنظیمات را ندارید."
            : isDirty
              ? "تغییرات ذخیره نشده است."
              : "تمام تغییرات ذخیره شده است."}
        </p>

        {!isViewer && (
          <p className="mt-1 text-xs text-gray-400">
            پس از اعمال تغییرات، روی دکمه ذخیره کلیک کنید.
          </p>
        )}
      </div>

      <FormButton
        type="submit"
        extraClass="w-full md:w-auto min-w-[150px] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={!isDirty || isPending || isViewer}
      >
        {isViewer
          ? "دسترسی محدود"
          : isPending
            ? "درحال ذخیره..."
            : "ذخیره اطلاعات"}
      </FormButton>
    </div>
  );
}

export default SettingSaveSection;
