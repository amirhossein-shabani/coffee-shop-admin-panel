import { useForm } from "react-hook-form";
import { useSetting, useUpdateSetting } from "../hooks/useSetting";
import { toastSuccess, toastError } from "../utils/swal";
import { useEffect } from "react";
import FormButton from "../components/FormButton";
import SettingsLoading from "../components/SettingLoading";
import SocialInput, {
  extractUsername,
  makeInstaUrl,
  makeTelegramUrl,
} from "../components/SocialInput";
import FileUpload from "../components/FileUpload";
import FormRow from "../components/FormRow";
import { useAuth } from "../hooks/useAuth";

function Setting() {
  const { data, isLoading, error } = useSetting();
  const { isViewer } = useAuth();

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
        toastSuccess("تنظیمات با موفقیت ذخیره شد.");
      }
    },
    onError: (err) => toastError(err?.message || "خطا در ذخیره تنظیمات."),
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

      logoUrl: formData.logoUrl?.[0],
    };

    updateSetting.mutate(payload);
  }

  if (isLoading) return <SettingsLoading />;

  if (error) {
    return (
      <div className="flex items-center justify-center w-full min-h-[200px] text-sm text-red-500">
        خطا در بارگذاری تنظیمات: {error.message}
      </div>
    );
  }

  return (
    <div className="w-full h-full text-gray-700" dir="rtl">
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl font-bold text-coffee-dark/90 md:text-2xl">
          تنظیمات
        </h1>

        <p className="mt-1 text-xs text-gray-500 md:text-sm">
          اطلاعات و مشخصات کافه را از این بخش مدیریت کنید.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full pb-24 space-y-4 overflow-y-auto scroll-container md:pb-6 md:space-y-5 max-h-[calc(100vh-150px)]"
      >
        {/* Contact Information */}
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

        {/* Working Hours */}
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

        {/* Social Media */}
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

        {/* Landing Page */}
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

        {/* Logo */}
        <section className="p-3 bg-white border border-gray-200 shadow-sm rounded-xl md:p-5">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-coffee-dark md:text-base">
              لوگو
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              لوگوی کافه را انتخاب یا تغییر دهید.
            </p>
          </div>

          <FormRow label="تصویر لوگو">
            <FileUpload
              register={register}
              name="logoUrl"
              defaultImage={data?.logoUrl || null}
            />
          </FormRow>
        </section>

        {/* Save Section */}
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
            disabled={!isDirty || updateSetting.isPending || isViewer}
          >
            {isViewer
              ? "دسترسی محدود"
              : updateSetting.isPending
                ? "درحال ذخیره..."
                : "ذخیره اطلاعات"}
          </FormButton>
        </div>

        {updateSetting.error && (
          <p className="p-3 text-sm text-red-500 border border-red-100 rounded-lg bg-red-50">
            خطا در به‌روزرسانی اطلاعات: {updateSetting.error.message}
          </p>
        )}
      </form>
    </div>
  );
}

export default Setting;
