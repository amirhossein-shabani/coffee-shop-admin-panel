import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  useMenuItem,
  useUpdateMenuItemWithImage,
  useAddMenuItemWithImage,
} from "../hooks/useMenuItems";
import { useCategoies } from "../hooks/useCategories";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import FileUpload from "../components/FileUpload";
import { FormInput } from "../components/FormInput";
import { FormTextarea } from "../components/FormTextarea";

function AddEditItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const isEdit = id !== "add" && !!id;
  const itemId = isEdit ? Number(id) : null;
  const { data: item, isLoading, error } = useMenuItem(isEdit ? itemId : null);
  const { data: categories } = useCategoies();
  const { mutate: updateItem, isPending: isUpdating } =
    useUpdateMenuItemWithImage({
      onSuccess: () => {
        navigate("/menu");
      },
    });
  const { mutate: addItem, isPending: isAdding } = useAddMenuItemWithImage({
    onSuccess: () => {
      navigate("/menu");
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
    if (isEdit && item) {
      reset({
        name: item.name,
        description: item.description,
        price: item.price,
        tag: item.tag || "",
      });
      setTimeout(() => setPreview(null), 0);
    }
  }, [isEdit, item, reset]);

  const onSubmit = (formData) => {
    const imageFile = formData.imgUrl?.[0]; // فایل جدید، اگر انتخاب شده

    const normalizedData = {
      ...formData,
      tag: formData.tag || null,
    };

    if (isEdit) {
      const oldImageUrl = item?.imgUrl || null; // کل URL فعلی از دیتابیس

      const updatePayload = {
        ...normalizedData,
        imgUrl: item?.imgUrl, // اگر عکس جدید نیست، همون قبلی باشه
      };

      updateItem({
        id: itemId,
        updateData: updatePayload,
        imageFile: imageFile,
        oldImageUrl: oldImageUrl,
        tag: normalizedData.tag,
      });
    } else {
      // For add
      const addPayload = {
        ...normalizedData,
        imgUrl: null, // will be set in the function
      };

      addItem({
        ...addPayload,
        imageFile: imageFile,
      });
    }
  };

  if (isEdit && isLoading)
    return (
      <Modal isOpen={true} onClose={() => navigate("/menu")}>
        <p className="py-6 text-center">درحال بارگذاری ...</p>
      </Modal>
    );

  if (isEdit && error)
    return (
      <Modal isOpen={true} onClose={() => navigate("/menu")}>
        <p className="py-6 text-center text-red-500">خطا در بارگذاری اطلاعات</p>
      </Modal>
    );

  return (
    <Modal isOpen={true} onClose={() => navigate("/menu")}>
      <div className="relative w-full max-w-md mx-auto bg-white rounded-2xl sm:max-w-lg md:max-w-xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={preview || (isEdit ? item?.imgUrl : null)}
            alt={isEdit ? item?.name : "New Item"}
            className="object-cover border rounded-lg w-14 h-14"
          />
          <div>
            <h2 className="text-lg font-bold">
              {id ? "ویرایش آیتم" : "اضافه کردن آیتم"}
            </h2>
            <p className="text-xs text-gray-500">
              {id ? "تغییر اطلاعات محصول" : "افزودن محصول جدید"}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 px-4 max-h-[75vh] overflow-y-auto sm:px-6"
        >
          {/* Name */}
          <FormInput
            label="نام"
            name="name"
            register={register}
            errors={errors}
            required={{ value: true, message: "نام الزامی است" }}
          />

          <FormTextarea
            label="توضیحات"
            name="description"
            register={register}
            errors={errors}
          />

          {/* Price */}
          <FormInput
            label="قیمت"
            name="price"
            type="number"
            register={register}
            errors={errors}
            required={{ value: true, message: "قیمت الزامی است " }}
            min={{ value: 0, message: "قیمت نمیتواند منفی باشد" }}
          />

          {/* Tag */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">کتگوری</label>
            <select
              {...register("tag")}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-coffee-dark"
            >
              <option value="">انتخاب کتگوری</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.href}>
                  {category.href}
                </option>
              ))}
            </select>
            {errors?.tag && (
              <span className="text-xs text-red-500">{errors.tag.message}</span>
            )}
          </div>

          {/* Upload */}
          <FileUpload
            label="تصویر محصول"
            register={register}
            name="imgUrl"
            defaultImage={isEdit ? item?.imgUrl : null}
            onPreviewChange={setPreview}
          />

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/menu")}
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

export default AddEditItem;

// create the validation for the img size
// write the logic for mutation the daat
// responsive this modal for the phone
// error fixing : when the uploadfile don't have any item and try to save the edit and can't save after that if the user chose new img file don't show that to user in the edit form ui .

// the update without the img change done and know fix the img change accessebility and work on the add item and delete item section .
