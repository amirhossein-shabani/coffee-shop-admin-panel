import FormRow from "./FormRow";

function SettingContactInfo({ register }) {
  return (
    <section className="p-3 bg-white border border-gray-200 shadow-sm rounded-xl md:p-5">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-coffee-dark md:text-base">
          اطلاعات تماس
        </h2>

        <p className="mt-1 text-xs text-gray-400">
          اطلاعاتی که مشتری برای ارتباط با کافه نیاز دارد.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-6">
        <FormRow label="آدرس">
          <input
            {...register("address")}
            placeholder="آدرس کافه"
            className="w-full px-3 text-sm transition border border-gray-200 rounded-lg outline-none h-9 bg-gray-50 focus:border-coffee-dark/50 focus:bg-white"
          />
        </FormRow>

        <FormRow label="شماره موبایل">
          <input
            {...register("phoneNumber", {
              pattern: {
                value: /^[0-9]*$/,
                message: "شماره موبایل فقط باید شامل عدد باشد",
              },
              minLength: {
                value: 10,
                message: "حداقل 10 رقم",
              },
              maxLength: {
                value: 11,
                message: "حداکثر 11 رقم",
              },
            })}
            placeholder="شماره موبایل"
            className="w-full px-3 text-sm transition border border-gray-200 rounded-lg outline-none h-9 bg-gray-50 focus:border-coffee-dark/50 focus:bg-white"
          />
        </FormRow>

        <FormRow label="شماره تلفن">
          <input
            {...register("telephonNumber", {
              pattern: {
                value: /^[0-9]*$/,
                message: "فقط عدد",
              },
            })}
            placeholder="شماره تلفن"
            className="w-full px-3 text-sm transition border border-gray-200 rounded-lg outline-none h-9 bg-gray-50 focus:border-coffee-dark/50 focus:bg-white"
          />
        </FormRow>

        <FormRow label="ایمیل">
          <input
            {...register("email")}
            placeholder="example@email.com"
            className="w-full px-3 text-sm transition border border-gray-200 rounded-lg outline-none h-9 bg-gray-50 focus:border-coffee-dark/50 focus:bg-white"
          />
        </FormRow>
      </div>
    </section>
  );
}

export default SettingContactInfo;
