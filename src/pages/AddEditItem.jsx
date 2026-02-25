import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMenuItem } from "../hooks/useMenuItems";
import Modal from "../components/Modal";
import { useState } from "react";
import FileUpload from "../components/FileUpload";
import { FormInput } from "../components/FormInput";
import { FormTextarea } from "../components/FormTextarea";

function AddEditItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: item, isLoading, error } = useMenuItem(Number(id));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: item
      ? {
          name: item.name,
          description: item.description,
          price: item.price,
        }
      : {},
  });

  const [preview, setPreview] = useState(null);

  const onSubmit = (data) => {
    console.log("فرم ارسال شد:", data);
  };

  if (isLoading)
    return (
      <Modal isOpen={true} onClose={() => navigate("/menu")}>
        <p className="py-6 text-center">درحال بارگذاری ...</p>
      </Modal>
    );

  if (error)
    return (
      <Modal isOpen={true} onClose={() => navigate("/menu")}>
        <p className="py-6 text-center text-red-500">خطا در بارگذاری اطلاعات</p>
      </Modal>
    );

  return (
    <Modal isOpen={true} onClose={() => navigate("/menu")}>
      <div className="relative w-full max-w-md py-4 mx-auto bg-white rounded-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={preview || item?.imgUrl}
            alt={item?.name}
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
          className="space-y-4 px-4 max-h-[75vh] overflow-y-auto"
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

          {/* Upload */}
          <FileUpload
            label="تصویر محصول"
            register={register}
            name="image"
            defaultImage={item?.imgUrl}
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
              ذخیره
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
