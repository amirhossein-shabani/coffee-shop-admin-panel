import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useSetting, useUpdateSetting } from "../hooks/useSetting";
import SettingsLoading from "../components/SettingLoading";
import {
  extractUsername,
  makeInstaUrl,
  makeTelegramUrl,
} from "../components/SocialInput";
import SettingContactInfo from "../components/SettingContactInfo";
import SettingWorkingHours from "../components/SettingWorkingHours";
import SettingSocialMedia from "../components/SettingSocialMedia";
import SettingLanding from "../components/SettingLanding";
import SettingLogo from "../components/SettingLogo";
import SettingSaveSection from "../components/SettingSaveSection";
import { toastSuccess, toastError } from "../utils/swal";

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
        <SettingContactInfo register={register} />
        <SettingWorkingHours register={register} />
        <SettingSocialMedia register={register} />
        <SettingLanding register={register} />
        <SettingLogo register={register} data={data} />
        <SettingSaveSection
          isViewer={isViewer}
          isDirty={isDirty}
          isPending={updateSetting.isPending}
        />

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
