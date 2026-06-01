import { useEffect, useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

function FileUpload({
  label,
  register,
  name,
  defaultImage,
  onPreviewChange,
  maxSize = 5 * 1024 * 1024,
}) {
  const [preview, setPreview] = useState(defaultImage || null);

  const { onChange, ...restRegister } = register(name);

  // sync فقط وقتی defaultImage واقعی تغییر کنه
  useEffect(() => {
    setPreview(defaultImage || null);
  }, [defaultImage]);

  const handleFileChange = (e) => {
    onChange(e);

    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSize) {
      alert(`حداکثر ${maxSize / (1024 * 1024)}MB`);
      e.target.value = "";
      return;
    }

    const url = URL.createObjectURL(file);

    setPreview(url);
    onPreviewChange?.(url);
  };

  const removeImage = (e) => {
    e.preventDefault();
    setPreview(null);
    onPreviewChange?.(null);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <input
        type="file"
        accept="image/*"
        id={name}
        {...restRegister}
        className="hidden"
        onChange={handleFileChange}
      />

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
              loading="lazy"
              decoding="async"
              onLoad={(e) => {
                console.log(e.target.naturalWidth, e.target.naturalHeight);
              }}
            />

            <div className="absolute inset-0 flex items-center justify-center text-sm text-white opacity-0 bg-black/40 hover:opacity-100 rounded-xl">
              تعویض تصویر
            </div>

            <button
              type="button"
              onClick={removeImage}
              className="absolute flex items-center justify-center text-white bg-red-500 rounded-full w-7 h-7 top-2 right-2"
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
    </div>
  );
}

export default FileUpload;
