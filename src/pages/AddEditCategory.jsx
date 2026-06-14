import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  useAddCategory,
  useCategory,
  useUpdateCategory,
} from "../hooks/useCategories";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import FileUpload from "../components/FileUpload";
import { FormInput } from "../components/FormInput";

function AddEditCategory() {
  const { href } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [landingPreview, setLandingPreview] = useState(null);
  const isEdit = href !== "add" && !!href;
  const {
    data: category,
    isLoading,
    error,
  } = useCategory(isEdit ? href : null);

  const { mutate: addCategory, isPending: isAdding } = useAddCategory({
    onSuccess: () => {
      navigate("/categories");
    },
  });

  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory({
    onSuccess: () => {
      navigate("/categories");
    },
  });

  const isPending = isUpdating || isAdding;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isEdit && category) {
      reset({
        categoryTitle: category.categoryTitle,
        href: category.href,
      });
      setTimeout(() => setPreview(null), 0);
    }
  }, [category, reset, isEdit]);

  const onSubmit = (formData) => {
    const imageFile = formData.imgUrl?.[0];
    const landingImageFile = formData.landingImageUrl?.[0];
    if (isEdit) {
      // ویرایش دسته‌بندی
      const oldImgageUrl = category?.imgUrl || null;
      const oldLandingImgageUrl = category?.landingImageUrl || null;
      const payload = {
        ...formData,
        imgUrl: category?.imgUrl,
        landingImageUrl: category?.landingImageUrl,
      };
      updateCategory({
        id: category.id,
        updateCategoryData: payload,
        imageFile: imageFile,
        oldImgageUrl: oldImgageUrl,
        landingImageFile: landingImageFile,
        oldLandingImgageUrl: oldLandingImgageUrl,
      });
    } else {
      // افزودن دسته‌بندی جدید
      const payload = {
        categoryTitle: formData.categoryTitle,
        href: formData.href,
      };
      addCategory({
        categoryData: payload,
        imageFile: imageFile,
        landingImageFile: landingImageFile,
      });
    }
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
            src={preview || category?.imgUrl || null}
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
            name="imgUrl"
            defaultImage={category?.imgUrl || null}
            onPreviewChange={setPreview}
          />

          {/* Landing Image */}
          <FileUpload
            label="تصویر لندینگ"
            register={register}
            name="landingImageUrl"
            defaultImage={category?.landingImageUrl || null}
            onPreviewChange={setLandingPreview}
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
              {isPending ? "درحال ذخیره ..." : isEdit ? "ذخیره" : "اضافه کردن"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default AddEditCategory;
