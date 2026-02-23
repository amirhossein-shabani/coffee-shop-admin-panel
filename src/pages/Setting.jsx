import { useForm } from "react-hook-form";
import { useSetting } from "../hooks/useSetting";
import { useEffect } from "react";
import FormButton from "../components/FormButton";

function Setting() {
  const { data, isLoading, error } = useSetting();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm();

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا در بارگذاری دسته‌بندی‌ها: {error.message}</div>;

  function onSubmit(formData) {
    console.log(formData);
  }

  return (
    <>
      <h1 className="pb-5 pr-1 text-xl font-bold text-coffee-dark/80">
        تنظیمات{" "}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start w-full gap-2 text-gray-500 "
      >
        <input
          {...register("address")}
          placeholder="آدرس"
          className="w-full p-1 px-2 text-sm font-normal rounded-lg"
        />
        <input
          {...register("phoneNumber", {
            required: "شماره موبایل لازم است ",
            pattern: {
              value: /^[0-9]+$/,
              message: "شماره موبایل فقط باید شامل عدد باشد ",
            },
            minLength: {
              value: 10,
              message: "شماره موبایل باید حداقل 10 رقم باشد ",
            },
            maxLength: {
              value: 11,
              message: "شماره موبایل  باید حداکثر 11 رقم باشد ",
            },
          })}
          placeholder="شماره موبایل "
          className="w-full p-1 px-2 text-sm font-normal rounded-lg"
        />
        <input
          {...register("telephonNumber", {
            pattern: {
              value: /^[0-9]+$/,
              message: "شماره تلفن فقط باید شامل عدد باشد ",
            },
          })}
          placeholder="شماره تلفن "
          className="w-full p-1 px-2 text-sm font-normal rounded-lg"
        />
        <input
          {...register("email")}
          placeholder="ایمیل"
          className="w-full p-1 px-2 text-sm font-normal rounded-lg"
        />
        <input
          {...register("openTime")}
          placeholder="ساعت باز شدن "
          className="w-full p-1 px-2 text-sm font-normal rounded-lg"
        />
        <input
          {...register("closeTime")}
          placeholder="ساعت بسته شدن "
          className="w-full p-1 px-2 text-sm font-normal rounded-lg"
        />
        <input
          {...register("instageramID")}
          placeholder="ایدی ایسنتاگرام"
          className="w-full p-1 px-2 text-sm font-normal rounded-lg"
        />
        <input
          {...register("telegramID")}
          placeholder="ایدی تلگرام"
          className="w-full p-1 px-2 text-sm font-normal rounded-lg"
        />
        <input
          {...register("landingHyperText")}
          placeholder=" هایپر تکست لندینگ پیج"
          className="w-full p-1 px-2 text-sm font-normal rounded-lg"
        />
        <textarea
          rows={5}
          {...register("description")}
          placeholder="توضیحات"
          className="w-full p-1 px-2 text-xs font-normal rounded-lg resize-none"
        />
        <FormButton type="submit" extraClass="self-end" disabled={!isDirty}>
          دخیره اطلاعات
        </FormButton>
      </form>
    </>
  );
}

export default Setting;
