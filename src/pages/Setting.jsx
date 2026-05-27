import { useForm } from "react-hook-form";
import { useSetting, useUpdateSetting } from "../hooks/useSetting";
import { useEffect } from "react";
import FormButton from "../components/FormButton";
import SettingsLoading from "../components/SettingLoading";
import SocialInput, {
  extractUsername,
  makeInstaUrl,
  makeTelegramUrl,
} from "../components/SocialInput";

function Setting() {
  const { data, isLoading, error } = useSetting();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm();

  const updateSetting = useUpdateSetting({
    onSuccess: (updatedData) => {
      if (updatedData) {
        const mapped = {
          ...updatedData,
          instageramID: extractUsername(updatedData?.instageramID),
          telegramID: extractUsername(updatedData?.telegramID),
        };

        reset(mapped);
      }
    },
  });

  useEffect(() => {
    if (data) {
      const mapped = {
        ...data,
        instageramID: extractUsername(data?.instageramID),
        telegramID: extractUsername(data?.telegramID),
      };

      reset(mapped);
    }
  }, [data, reset]);

  // ✅ safe normalize (حل کامل مشکل trim)
  function normalize(value) {
    if (value === null || value === undefined) return null;

    if (typeof value === "string") {
      const v = value.trim();
      return v === "" ? null : v;
    }

    return value;
  }

  function onSubmit(formData) {
    const payload = {
      address: normalize(formData.address),
      phoneNumber: normalize(formData.phoneNumber),
      telephonNumber: normalize(formData.telephonNumber),
      email: normalize(formData.email),
      openTime: normalize(formData.openTime),
      closeTime: normalize(formData.closeTime),
      landingHyperText: normalize(formData.landingHyperText),
      description: normalize(formData.description),

      instageramID: formData.instageramID?.trim()
        ? makeInstaUrl(formData.instageramID)
        : null,

      telegramID: formData.telegramID?.trim()
        ? makeTelegramUrl(formData.telegramID)
        : null,
    };

    console.log(payload);

    updateSetting.mutate(payload);
  }

  if (isLoading) return <SettingsLoading />;
  if (error) return <div>خطا در بارگذاری تنظیمات: {error.message}</div>;

  return (
    <>
      <h1 className="pb-5 pr-1 text-xl font-bold text-coffee-dark/80">
        تنظیمات
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start w-full gap-2 text-gray-500"
      >
        <input
          {...register("address")}
          placeholder="آدرس"
          className="w-full p-1 px-2 text-sm font-normal rounded-lg"
        />

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
          className="w-full p-1 px-2 text-sm font-normal rounded-lg"
        />

        <input
          {...register("telephonNumber", {
            pattern: {
              value: /^[0-9]*$/,
              message: "فقط عدد",
            },
          })}
          placeholder="شماره تلفن"
          className="w-full p-1 px-2 text-sm font-normal rounded-lg"
        />

        <input
          {...register("email")}
          placeholder="ایمیل"
          className="w-full p-1 px-2 text-sm font-normal rounded-lg"
        />

        <input
          {...register("openTime")}
          placeholder="ساعت باز شدن"
          className="w-full p-1 px-2 text-sm font-normal rounded-lg"
        />

        <input
          {...register("closeTime")}
          placeholder="ساعت بسته شدن"
          className="w-full p-1 px-2 text-sm font-normal rounded-lg"
        />

        <SocialInput
          register={register}
          name="instageramID"
          placeholder="آیدی اینستاگرام"
        />

        <SocialInput
          register={register}
          name="telegramID"
          placeholder="آیدی تلگرام"
        />

        <input
          {...register("landingHyperText")}
          placeholder="هایپر تکست لندینگ پیج"
          className="w-full p-1 px-2 text-sm font-normal rounded-lg"
        />

        <textarea
          rows={5}
          {...register("description")}
          placeholder="توضیحات"
          className="w-full p-1 px-2 text-xs font-normal rounded-lg resize-none"
        />

        <FormButton
          type="submit"
          extraClass="self-end"
          disabled={!isDirty || updateSetting.isPending}
        >
          {updateSetting.isPending ? "درحال ذخیره..." : "ذخیره اطلاعات"}
        </FormButton>

        {updateSetting.error && (
          <p className="pt-2 text-sm text-red-500">
            خطا در به‌روزرسانی اطلاعات: {updateSetting.error.message}
          </p>
        )}
      </form>
    </>
  );
}

export default Setting;
