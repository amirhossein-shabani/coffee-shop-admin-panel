import FormRow from "./FormRow";

function SettingLanding({ register }) {
  return (
    <section className="p-3 bg-white border border-gray-200 shadow-sm rounded-xl md:p-5">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-coffee-dark md:text-base">
          صفحه اصلی
        </h2>

        <p className="mt-1 text-xs text-gray-400">
          متن و توضیحات نمایش داده شده در صفحه اصلی را مدیریت کنید.
        </p>
      </div>

      <div className="space-y-3">
        <FormRow label="متن لندینگ پیج">
          <input
            {...register("landingHyperText")}
            placeholder="متن اصلی صفحه"
            className="w-full px-3 text-sm transition border border-gray-200 rounded-lg outline-none h-9 bg-gray-50 focus:border-coffee-dark/50 focus:bg-white"
          />
        </FormRow>

        <FormRow label="توضیحات">
          <textarea
            rows={5}
            {...register("description")}
            placeholder="توضیحات درباره کافه..."
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none resize-none min-h-[120px] transition focus:border-coffee-dark/50 focus:bg-white"
          />
        </FormRow>
      </div>
    </section>
  );
}

export default SettingLanding;
