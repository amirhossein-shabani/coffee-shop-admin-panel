import FormRow from "./FormRow";
import SocialInput from "./SocialInput";

function SettingSocialMedia({ register }) {
  return (
    <section className="p-3 bg-white border border-gray-200 shadow-sm rounded-xl md:p-5">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-coffee-dark md:text-base">
          شبکه‌های اجتماعی
        </h2>

        <p className="mt-1 text-xs text-gray-400">
          آیدی شبکه‌های اجتماعی کافه را وارد کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-6">
        <FormRow label="آیدی اینستاگرام">
          <SocialInput
            register={register}
            name="instageramID"
            placeholder="آیدی اینستاگرام"
            style="w-full rounded-lg border border-gray-200"
          />
        </FormRow>

        <FormRow label="آیدی تلگرام">
          <SocialInput
            register={register}
            name="telegramID"
            placeholder="آیدی تلگرام"
            style="w-full rounded-lg border border-gray-200"
          />
        </FormRow>
      </div>
    </section>
  );
}

export default SettingSocialMedia;
