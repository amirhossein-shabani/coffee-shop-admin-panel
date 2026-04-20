import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCategory } from "../hooks/useCategories";
import Modal from "../components/Modal";
import { useState } from "react";
import FileUpload from "../components/FileUpload";
import { FormInput } from "../components/FormInput";

function AddEditCategory() {
  const { href } = useParams();
  const navigate = useNavigate();
  const { data: category, isLoading, error } = useCategory(href);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: category
      ? {
          categoryTitle: category.categoryTitle,
          href: category.href,
          imgUrl: category.imgUrl,
        }
      : {},
  });

  const [preview, setPreview] = useState(null);

  const onSubmit = (data) => {
    console.log("فرم ارسال شد:", data);
  };

  if (isLoading)
    return (
      <Modal isOpen={true} onClose={() => navigate("/categories")}>
        <p className="py-6 text-center">درحال بارگذاری ...</p>
      </Modal>
    );

  if (error)
    return (
      <Modal isOpen={true} onClose={() => navigate("/categories")}>
        <p className="py-6 text-center text-red-500">خطا در بارگذاری اطلاعات</p>
      </Modal>
    );

  return (
    <Modal isOpen={true} onClose={() => navigate("/categories")}>
      <div className="relative w-full max-w-md py-4 mx-auto bg-white rounded-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={preview || category?.imgUrl}
            alt={category?.categoryTitle}
            className="object-cover border rounded-lg w-14 h-14"
          />
          <div>
            <h2 className="text-lg font-bold">
              {href ? "ویرایش دسته‌بندی" : "اضافه کردن دسته‌بندی"}
            </h2>
            <p className="text-xs text-gray-500">
              {href ? "تغییر اطلاعات دسته‌بندی" : "افزودن دسته‌بندی جدید"}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 px-4 max-h-[75vh] overflow-y-auto"
        >
          {/* Category Title */}
          <FormInput
            label="عنوان دسته‌بندی"
            name="categoryTitle"
            register={register}
            errors={errors}
            required={{ value: true, message: "عنوان الزامی است" }}
          />

          {/* Href */}
          <FormInput
            label="href"
            name="href"
            register={register}
            errors={errors}
            required={{ value: true, message: "href الزامی است" }}
          />

          {/* Upload */}
          <FileUpload
            label="تصویر دسته‌بندی"
            register={register}
            name="image"
            defaultImage={category?.imgUrl}
          />

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/categories")}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              انصراف
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-white rounded-lg bg-coffee-dark hover:opacity-90"
            >
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default AddEditCategory;
