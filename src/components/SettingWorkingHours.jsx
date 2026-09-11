import FormRow from "./FormRow";

function SettingWorkingHours({ register }) {
  return (
    <section className="p-3 bg-white border border-gray-200 shadow-sm rounded-xl md:p-5">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-coffee-dark md:text-base">
          ساعات کاری
        </h2>

        <p className="mt-1 text-xs text-gray-400">
          زمان باز و بسته بودن کافه را مشخص کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-6">
        <FormRow label="ساعت باز شدن">
          <input
            {...register("openTime")}
            placeholder="مثلاً 08:00"
            className="w-full px-3 text-sm transition border border-gray-200 rounded-lg outline-none h-9 bg-gray-50 focus:border-coffee-dark/50 focus:bg-white"
          />
        </FormRow>

        <FormRow label="ساعت بسته شدن">
          <input
            {...register("closeTime")}
            placeholder="مثلاً 23:00"
            className="w-full px-3 text-sm transition border border-gray-200 rounded-lg outline-none h-9 bg-gray-50 focus:border-coffee-dark/50 focus:bg-white"
          />
        </FormRow>
      </div>
    </section>
  );
}

export default SettingWorkingHours;
