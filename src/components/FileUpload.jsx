import { useEffect, useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

function FileUpload({ label, register, name, defaultImage, onPreviewChange }) {
  const [preview, setPreview] = useState(defaultImage || null);
  const { onChange, ...restRegister } = register(name);

  useEffect(() => {
    return () => {
      if (preview && !defaultImage) URL.revokeObjectURL(preview);
    };
  }, [preview, defaultImage]);

  const handlePreviewChange = (newPreview) => {
    setPreview(newPreview);
    onPreviewChange?.(newPreview);
  };

  return (
    <div className="space-y-2 ">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <input
        type="file"
        accept="image/*"
        id={name}
        {...restRegister}
        className="hidden"
        onChange={(e) => {
          onChange(e);

          const file = e.target.files?.[0];
          if (file) {
            handlePreviewChange(URL.createObjectURL(file));
          }
        }}
      />

      {/* Upload Box */}
      <label
        htmlFor={name}
        className={`relative flex items-center justify-center w-full h-40 rounded-xl border-2 border-dashed cursor-pointer transition
        ${preview ? "border-transparent" : "border-gray-300 hover:bg-gray-50"}`}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="preview"
              className="object-cover w-full h-full rounded-xl"
            />

            {/* Overlay */}
            <div className="absolute inset-0 flex items-center justify-center text-sm text-white transition opacity-0 bg-black/40 rounded-xl hover:opacity-100">
              تعویض تصویر
            </div>

            {/* Remove */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handlePreviewChange(null);
              }}
              className="absolute flex items-center justify-center text-white bg-red-500 rounded-full w-7 h-7 top-2 right-2 hover:bg-red-600"
            >
              <IoClose size={16} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <HiOutlineUpload className="text-3xl" />
            <span className="text-sm">انتخاب تصویر</span>
          </div>
        )}
      </label>

      <p className="text-xs text-gray-400">فقط فایل تصویری (PNG, JPG)</p>
    </div>
  );
}

export default FileUpload;
