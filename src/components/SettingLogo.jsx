import FileUpload from "./FileUpload";
import FormRow from "./FormRow";

function SettingLogo({ register, data }) {
  return (
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
  );
}

export default SettingLogo;
